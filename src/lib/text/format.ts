/**
 * Deterministic text transforms. Every one is a toggle and every one reports a
 * count, so a rule that fired when it should not have is visible rather than
 * buried.
 *
 * Nothing here guesses: no grammar engine, no model. The CSP omits
 * `'wasm-unsafe-eval'` and there is no server, so the operations are the
 * mechanical ones where "correct" is typography rather than judgement.
 *
 * Whitespace and line operations are script-agnostic. Anything touching letters
 * or punctuation takes a locale — sorting collates in it, case maps in it, and
 * the punctuation rules follow that language. `typography.ts` owns that table.
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
 * Words that stay lowercase inside an **English** title, per AP and Chicago
 * where they agree. Disputed cases (`as`, `if`, `than`) are capitalised — the
 * safer error.
 *
 * Not translated, and must not be: Spanish title case capitalises only the
 * first word rather than demoting `de` the way English demotes `of`. Other
 * languages get `all-words` instead — see `typography.ts`.
 */
const MINOR_WORDS = new Set([
  'a', 'an', 'and', 'at', 'but', 'by', 'for', 'in', 'nor', 'of', 'on', 'or',
  'per', 'so', 'the', 'to', 'up', 'via', 'yet',
]);

/**
 * Title Case, applied per word.
 *
 * First and last word of each line are always capitalised, minor-word list or
 * not. Words with an interior capital — `iPhone`, `JSON`, `McCarthy` — are left
 * alone, or `JSON` would come back as `Json`.
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
 * The lone `i` → `I` repair is English-only: elsewhere it would capitalise an
 * ordinary word.
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
 * Straight quotes to the ones this language uses. Marks come from
 * `typography.ts`; a language with no safe style never reaches this function.
 *
 * Order matters: in-word apostrophes (`don't`, `'90s`) are handled before the
 * opening/closing pass, or `don't` gains an opening quote. Backticked spans are
 * left alone — that is code.
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
 * The lookaheads keep it off ordinary text: digits are excluded so `1,000` and
 * `12:30` survive, and the full stop fires only between a lowercase run of two
 * or more and a capital, sparing `e.g.`, `Node.js` and `utildock.dev`.
 *
 * Never reached for CJK, whose full-width punctuation carries its own spacing.
 */
function applySpaceAfterPunctuation(text: string): string {
  return text
    .replace(/([,;:!?])(?=[^\s\d\p{P}])/gu, '$1 ')
    .replace(/(?<=\p{Ll}{2})\.(?=\p{Lu})/gu, '. ');
}

/**
 * What to do about a space in front of `;` `:` `!` `?`.
 *
 * English closes up, so the space is removed. French requires a no-break space
 * — narrow before `;!?`, full before `:` — so the same switch inserts it there
 * and normalises any ordinary space already present. Comma and full stop close
 * up in both.
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
 * Single-line by design: a word ending one line and starting the next is
 * usually two sentences. Legitimate doubles exist ("had had"), so this is off
 * by default and reported when it fires.
 */
function applyFixRepeatedWords(text: string): string {
  return text.replace(/\b(\p{L}+)([ \t]+)\1\b/giu, (match, word: string) =>
    match.slice(0, word.length),
  );
}

/* -------------------------------------------------------------- the run --- */

/**
 * Apply the enabled operations, in a fixed order. The order is load-bearing and
 * must not become a setting.
 *
 * Whitespace first, so line-level operations see clean lines — `hello` and
 * `hello ` are distinct before trimming and identical after.
 *
 * Punctuation spacing before case, because sentence case finds boundaries by
 * looking for a full stop and a space. `Xerox .Almost` cased first becomes
 * `xerox.almost` and the break is unrecoverable; spaced first it becomes
 * `Xerox. Almost`.
 *
 * Quotes after case (curling is unaffected by capitalisation), and document
 * trimming last, since earlier operations can leave a blank line at one end.
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
    // Leading indentation is structure, so the collapse starts after it.
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
      // Blank lines are structure: deduplicating them would reflow every
      // paragraph into one block.
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
    // Collated in the page's language, not the browser's: German sorts ä beside
    // a, Swedish sorts it last.
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
    // Counted by comparison, not by matching: French inserts spaces here where
    // the other languages remove them.
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
