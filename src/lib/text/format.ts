/**
 * Deterministic text transforms — every one of them a toggle, every one of them
 * reporting what it changed.
 *
 * Two rules shape this file.
 *
 * **Nothing here guesses.** There is no grammar engine and no model. Real
 * grammar correction — agreement, tense, article choice — is not available
 * offline in a browser: the only implementations are a server (which this site
 * does not have and will not get) or WebAssembly (which the site's CSP forbids,
 * since `script-src` carries no `'wasm-unsafe-eval'`). So the operations here
 * are the mechanical ones, where "correct" is a matter of typography rather
 * than judgement, and each is reversible by reasoning rather than by hoping.
 *
 * **Every operation reports a count.** A tool that silently rewrites a document
 * is one the visitor has to re-read to trust. Returning "removed 12 duplicate
 * lines, fixed 3 repeated words" turns the output from something to check into
 * something to accept, and makes a rule that fired when it should not have
 * visible instead of buried.
 *
 * A note on language. The whitespace and line operations are script-agnostic.
 * Everything that touches letters or punctuation is not, and takes a locale:
 * sorting collates in it, case maps in it (so German `ß` uppercases correctly),
 * and the punctuation rules follow that language's convention rather than
 * English's — French gains its space before `;!?` instead of losing it, German
 * quotes open low, and the spacing rules are reported as unsupported for CJK
 * rather than inserting spaces no typesetter there wants. `typography.ts` owns
 * that table and explains each choice.
 */

import {
  frenchSpaceFor,
  supportedRules,
  typographyFor,
  type QuoteStyle,
  type SpacingStyle,
  type Typography,
} from './typography';

export interface FormatOptions {
  /* whitespace */
  trimLineEnds: boolean;
  collapseSpaces: boolean;
  collapseBlankLines: boolean;
  removeBlankLines: boolean;
  trimDocument: boolean;
  tabsToSpaces: boolean;

  /* lines */
  removeDuplicateLines: boolean;
  sortLines: 'none' | 'asc' | 'desc';

  /* case */
  caseMode: 'none' | 'lower' | 'upper' | 'title' | 'sentence';

  /* writing — Latin typographic convention, off by default */
  fixRepeatedWords: boolean;
  spaceAfterPunctuation: boolean;
  removeSpaceBeforePunctuation: boolean;
  smartQuotes: boolean;
}

export const DEFAULT_OPTIONS: FormatOptions = {
  trimLineEnds: true,
  collapseSpaces: true,
  collapseBlankLines: true,
  removeBlankLines: false,
  trimDocument: true,
  tabsToSpaces: false,

  removeDuplicateLines: false,
  sortLines: 'none',

  caseMode: 'none',

  fixRepeatedWords: false,
  spaceAfterPunctuation: false,
  removeSpaceBeforePunctuation: false,
  smartQuotes: false,
};

/** Which operations actually fired, and how many times. Keys match the options. */
export type ChangeCounts = Partial<Record<keyof FormatOptions, number>>;

export interface FormatResult {
  output: string;
  changes: ChangeCounts;
  /** True when the output is byte-identical to the input. */
  unchanged: boolean;
}

/* ---------------------------------------------------------------- title --- */

/**
 * Words that stay lowercase inside an **English** title, by the conventions of
 * AP and Chicago where they agree. Deliberately short: the disputed cases
 * (`as`, `if`, `than`) are capitalised, which is the safer error — a wrongly
 * capitalised word reads as a style choice, a wrongly lowercased one reads as
 * a mistake.
 *
 * This list is not translated, and must not be. The Spanish for "of" is "de",
 * but Spanish title case does not demote "de" the way English demotes "of" —
 * it generally capitalises only the first word. Applying an English rule
 * through a translated word list would produce a title no style guide
 * recognises, so other languages get `all-words` instead. See `typography.ts`.
 */
const MINOR_WORDS = new Set([
  'a', 'an', 'and', 'at', 'but', 'by', 'for', 'in', 'nor', 'of', 'on', 'or',
  'per', 'so', 'the', 'to', 'up', 'via', 'yet',
]);

/**
 * Title Case, applied per word.
 *
 * The first and last words of each line are always capitalised regardless of
 * the minor-word list, which is the rule both style guides share. Words already
 * containing an interior capital — `iPhone`, `JSON`, `McCarthy` — are left
 * exactly as they are: lowercasing an acronym to re-capitalise its first letter
 * would turn `JSON` into `Json`, which is not a case conversion but damage.
 */
function toTitleCase(text: string, locale: string, style: Typography['titleCase']): string {
  return text
    .split('\n')
    .map((line) => {
      const tokens = line.split(/(\s+)/);
      const wordIndexes = tokens
        .map((token, index) => (token.trim() === '' ? -1 : index))
        .filter((index) => index >= 0);
      const first = wordIndexes[0];
      const last = wordIndexes[wordIndexes.length - 1];

      return tokens
        .map((token, index) => {
          if (token.trim() === '') return token;
          if (/\p{Lu}/u.test(token.slice(1))) return token;

          const bare = token.toLocaleLowerCase(locale);
          if (style === 'english-minor') {
            const letters = bare.replace(/^[^\p{L}\p{N}]+/u, '');
            const isMinor = MINOR_WORDS.has(letters.replace(/[^\p{L}]+$/u, ''));
            if (isMinor && index !== first && index !== last) return bare;
          }
          return bare.replace(/\p{L}/u, (letter) => letter.toLocaleUpperCase(locale));
        })
        .join('');
    })
    .join('\n');
}

/**
 * Sentence case: lowercase everything, then capitalise the first letter of each
 * sentence.
 *
 * The lone `i` → `I` repair runs for English only. It is grammar rather than
 * typography — English is unusual in capitalising its first-person pronoun —
 * and applying it everywhere would capitalise a perfectly ordinary `i` in
 * another language.
 */
function toSentenceCase(text: string, locale: string, capitaliseLoneI: boolean): string {
  const sentences = text
    .toLocaleLowerCase(locale)
    .replace(/(^|[.!?…。！？]\s*|\n\s*)(\p{Ll})/gu, (_match, lead: string, letter: string) =>
      lead + letter.toLocaleUpperCase(locale),
    );

  if (!capitaliseLoneI) return sentences;
  return sentences.replace(/\bi\b/g, 'I').replace(/\bi'/g, "I'");
}

/* ------------------------------------------------------------ operations --- */

/** Count how many times a pattern matches, for the change report. */
function countMatches(text: string, pattern: RegExp): number {
  return text.match(pattern)?.length ?? 0;
}

/**
 * Straight quotes to the ones this language actually uses.
 *
 * Order matters: apostrophes inside words (`don't`, `'90s`) are handled before
 * the opening/closing pass, or the apostrophe in `don't` becomes an opening
 * quote. Anything inside backticks is left alone — that is code, and curling
 * its quotes breaks it.
 *
 * The marks come from `typography.ts`, so German gets `„…“`, French and
 * Russian get `«…»`, and French additionally gets the narrow no-break space
 * that belongs inside its guillemets. A language whose quoting cannot be
 * inferred safely — Japanese, where a straight `"` is usually code — has no
 * style and never reaches this function.
 */
function applySmartQuotes(text: string, quotes: QuoteStyle): string {
  const inner = quotes.innerSpace ?? '';
  const segments = text.split(/(`[^`]*`)/g);

  return segments
    .map((segment) => {
      if (segment.startsWith('`') && segment.endsWith('`') && segment.length > 1) return segment;
      return (
        segment
          // An apostrophe inside a word is always an apostrophe, in every
          // language that has one, and never an opening quote.
          .replace(/(\p{L})'(\p{L})/gu, '$1’$2')
          .replace(/'(?=\d{2}s\b)/g, '’')
          .replace(/(^|[\s([{<—–])"/gu, `$1${quotes.openDouble}${inner}`)
          .replace(/"/g, `${inner}${quotes.closeDouble}`)
          .replace(/(^|[\s([{<—–])'/gu, `$1${quotes.openSingle}${inner}`)
          .replace(/'/g, `${inner}${quotes.closeSingle}`)
      );
    })
    .join('');
}

/**
 * A space after `,` `;` `:` `!` `?` and `.` where one is clearly missing.
 *
 * The lookaheads are what keep this from mangling ordinary text. Digits are
 * excluded so `1,000` and `12:30` survive, and the full stop is the strict
 * case: it only fires between a lowercase run of two or more and a following
 * capital. That leaves `e.g.`, `Node.js`, `3.14` and `utildock.dev` untouched
 * while still catching `end of sentence.Next one`.
 *
 * Never reached for CJK, whose punctuation is full-width and carries its own
 * spacing — inserting an ASCII space after `、` would be a defect, not a fix.
 */
function applySpaceAfterPunctuation(text: string): string {
  return text
    .replace(/([,;:!?])(?=[^\s\d\p{P}])/gu, '$1 ')
    .replace(/(?<=\p{Ll}{2})\.(?=\p{Lu})/gu, '. ');
}

/**
 * What to do about a space in front of `;` `:` `!` `?`.
 *
 * This is the rule that most needed to stop being English. English closes up
 * to its punctuation, so the space is a mistake and gets removed. **French
 * requires one** — and specifically a no-break one, narrow before `;!?` and
 * full before `:` — so in French the same switch inserts the correct space and
 * normalises any ordinary space already there. The comma and full stop close
 * up in both languages.
 */
function applySpaceBeforePunctuation(text: string, spacing: SpacingStyle): string {
  if (spacing === 'french') {
    return text
      .replace(/[ \t  ]*([;:!?])/g, (_match, mark: string) => frenchSpaceFor(mark) + mark)
      .replace(/[ \t]+([,.])/g, '$1');
  }
  return text.replace(/[ \t]+([,.;:!?])/g, '$1');
}

/**
 * `the the` → `the`, case-insensitively, within a line.
 *
 * Bounded to a single line on purpose: a word ending one line and beginning the
 * next is usually two different sentences, not a typo. Legitimate doubles do
 * exist — "had had", "that that" — so this is off by default and reported when
 * it fires.
 */
function applyFixRepeatedWords(text: string): string {
  return text.replace(/\b(\p{L}+)([ \t]+)\1\b/giu, (match, word: string) =>
    match.slice(0, word.length),
  );
}

/* -------------------------------------------------------------- the run --- */

/**
 * Apply the enabled operations, in a fixed order.
 *
 * The order is not arbitrary and cannot be exposed as a setting without the
 * results becoming unpredictable.
 *
 * Whitespace is normalised first, so that later line-level operations see clean
 * lines — deduplication in particular, where `hello` and `hello ` are different
 * strings before trimming and the same one after.
 *
 * **Punctuation spacing runs before case conversion**, and that ordering is
 * load-bearing. Sentence case decides where a sentence starts by looking for a
 * full stop followed by a space, so it has to run on text where that space is
 * already there. Given `Xerox .Almost`, converting case first lowercases the
 * `A` while the missing space still hides the boundary, and no later pass can
 * recover it — the result is `xerox.almost`, with the sentence break lost.
 * Repairing the spacing first turns it into `Xerox. Almost`, which sentence
 * case then reads correctly.
 *
 * Curly quotes come after case, since converting `"` to `“` is unaffected by
 * capitalisation and would otherwise have to be taught to survive it. Document
 * trimming is last, because several earlier operations can leave a blank line
 * at one end.
 */
export function formatText(
  input: string,
  options: FormatOptions,
  locale = 'en',
): FormatResult {
  const type = typographyFor(locale);
  const supported = supportedRules(locale);

  let text = input;
  const changes: ChangeCounts = {};

  const record = (key: keyof FormatOptions, count: number) => {
    if (count > 0) changes[key] = count;
  };

  /* --- whitespace --- */

  if (options.tabsToSpaces) {
    record('tabsToSpaces', countMatches(text, /\t/g));
    text = text.replace(/\t/g, '  ');
  }

  if (options.trimLineEnds) {
    record('trimLineEnds', countMatches(text, /[ \t]+$/gm));
    text = text.replace(/[ \t]+$/gm, '');
  }

  if (options.collapseSpaces) {
    // Leading indentation is structure, not an extra space, so the collapse
    // starts after any indent rather than at the start of the line.
    record('collapseSpaces', countMatches(text, /(?<=\S)[ \t]{2,}/g));
    text = text.replace(/(?<=\S)[ \t]{2,}/g, ' ');
  }

  if (options.removeBlankLines) {
    record('removeBlankLines', countMatches(text, /^[ \t]*$\n?/gm));
    text = text
      .split('\n')
      .filter((line) => line.trim() !== '')
      .join('\n');
  } else if (options.collapseBlankLines) {
    // Three or more newlines is two or more blank lines; collapse to one.
    record('collapseBlankLines', countMatches(text, /\n{3,}/g));
    text = text.replace(/\n{3,}/g, '\n\n');
  }

  /* --- lines --- */

  if (options.removeDuplicateLines) {
    const lines = text.split('\n');
    const seen = new Set<string>();
    const kept: string[] = [];
    let removed = 0;
    for (const line of lines) {
      // Blank lines are structure, not content — deduplicating them would
      // silently reflow the document's paragraphs into one block.
      if (line.trim() === '') {
        kept.push(line);
        continue;
      }
      if (seen.has(line)) {
        removed++;
        continue;
      }
      seen.add(line);
      kept.push(line);
    }
    record('removeDuplicateLines', removed);
    text = kept.join('\n');
  }

  if (options.sortLines !== 'none') {
    const lines = text.split('\n');
    const trailing = lines.length > 0 && lines[lines.length - 1] === '' ? lines.pop() : undefined;
    // Collated in the page's language, not the browser's. German expects ä
    // beside a, Swedish expects it at the end, and the two orders disagree on
    // the same list — so the locale has to be named rather than inferred.
    const sorted = [...lines].sort((a, b) => a.localeCompare(b, locale));
    if (options.sortLines === 'desc') sorted.reverse();
    const moved = sorted.filter((line, index) => line !== lines[index]).length;
    record('sortLines', moved);
    text = [...sorted, ...(trailing !== undefined ? [trailing] : [])].join('\n');
  }

  /* --- spacing around punctuation --- */

  if (options.fixRepeatedWords) {
    const before = text;
    text = applyFixRepeatedWords(text);
    record('fixRepeatedWords', countDifferentWords(before, text));
  }

  if (options.removeSpaceBeforePunctuation && supported.removeSpaceBeforePunctuation) {
    const before = text;
    text = applySpaceBeforePunctuation(text, type.spacing);
    // Counted by comparison rather than by matching, because in French this
    // rule inserts spaces where the other languages remove them.
    record('removeSpaceBeforePunctuation', before === text ? 0 : Math.abs(text.length - before.length) || 1);
  }

  if (options.spaceAfterPunctuation && supported.spaceAfterPunctuation) {
    const before = text;
    text = applySpaceAfterPunctuation(text);
    record('spaceAfterPunctuation', text.length - before.length || 0);
  }

  /* --- case --- */

  if (options.caseMode !== 'none') {
    const before = text;
    text =
      options.caseMode === 'lower'
        ? text.toLocaleLowerCase(locale)
        : options.caseMode === 'upper'
          ? text.toLocaleUpperCase(locale)
          : options.caseMode === 'title'
            ? toTitleCase(text, locale, type.titleCase)
            : toSentenceCase(text, locale, type.capitaliseLoneI);
    record('caseMode', before === text ? 0 : 1);
  }

  /* --- quotes --- */

  if (options.smartQuotes && type.quotes) {
    record('smartQuotes', countMatches(text, /['"]/g));
    text = applySmartQuotes(text, type.quotes);
  }

  /* --- document --- */

  if (options.trimDocument) {
    const before = text;
    text = text.trim();
    record('trimDocument', before === text ? 0 : 1);
  }

  return { output: text, changes, unchanged: text === input };
}

/** How many words the repeated-word pass actually dropped. */
function countDifferentWords(before: string, after: string): number {
  if (before === after) return 0;
  const count = (value: string) => value.split(/\s+/).filter(Boolean).length;
  return Math.max(1, count(before) - count(after));
}

/** True when no operation is enabled — the formatter would be a no-op. */
export function isIdentity(options: FormatOptions): boolean {
  return (
    !options.trimLineEnds &&
    !options.collapseSpaces &&
    !options.collapseBlankLines &&
    !options.removeBlankLines &&
    !options.trimDocument &&
    !options.tabsToSpaces &&
    !options.removeDuplicateLines &&
    options.sortLines === 'none' &&
    options.caseMode === 'none' &&
    !options.fixRepeatedWords &&
    !options.spaceAfterPunctuation &&
    !options.removeSpaceBeforePunctuation &&
    !options.smartQuotes
  );
}
