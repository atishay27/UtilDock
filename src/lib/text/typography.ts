/**
 * Per-language typographic convention.
 *
 * The punctuation rules in `format.ts` were written to English convention and
 * applied to every language, which is wrong in ways that range from cosmetic to
 * actively damaging:
 *
 *  - **French requires a space *before* `;` `:` `!` `?`.** A rule that strips it
 *    does not tidy French, it breaks it.
 *  - **Chinese and Japanese put no space around punctuation at all.** Both
 *    spacing rules are meaningless there, and the "add a space after a comma"
 *    rule would insert spaces that no CJK typesetter wants.
 *  - **Quotation marks differ per language.** German opens low (`„`), French
 *    and Russian use guillemets (`«`), Japanese uses corner brackets (`「`).
 *    Converting a German quote to `“` is not smart quotes, it is an error.
 *  - **Title Case minor words are English.** Demoting `de`, `la` or `von`
 *    because they resemble `of` and `the` produces a title no style guide in
 *    that language recognises.
 *
 * So the switches stay the same and their *behaviour* follows the page's
 * language, and where a rule has no meaning in that language it is reported as
 * unsupported and the UI disables it rather than quietly doing the wrong thing.
 *
 * The page's locale governs rather than the content's detected script. That is
 * a deliberate choice and the opposite of what `count.ts` does: counting is a
 * measurement of the text in front of it, so it must follow the text, whereas
 * this is an editorial convention, and someone working on the French site is
 * applying French house style. It is also predictable, which matters when the
 * tool is rewriting a document rather than describing one.
 */

/** How a language spaces its punctuation. */
export type SpacingStyle = 'latin' | 'french' | 'cjk';

export interface QuoteStyle {
  openDouble: string;
  closeDouble: string;
  openSingle: string;
  closeSingle: string;
  /**
   * Placed just inside guillemets. French sets a narrow no-break space there;
   * Russian, which uses the same marks, does not.
   */
  innerSpace?: string;
}

export interface Typography {
  spacing: SpacingStyle;
  /** `null` when converting quotes in this language would do more harm than good. */
  quotes: QuoteStyle | null;
  /**
   * `english-minor` demotes `of`, `the` and friends. `all-words` capitalises
   * every word — never as polished, but never wrong in the way that demoting
   * the wrong words is.
   */
  titleCase: 'english-minor' | 'all-words';
  /** The lone `i` → `I` repair is English grammar, not typography. */
  capitaliseLoneI: boolean;
}

/** U+202F, the narrow no-break space French typography sets before `;!?`. */
const NARROW_NBSP = ' ';
/** U+00A0, the ordinary no-break space, used before a French colon. */
const NBSP = ' ';

const LATIN_DOUBLE: QuoteStyle = {
  openDouble: '“', // “
  closeDouble: '”', // ”
  openSingle: '‘', // ‘
  closeSingle: '’', // ’
};

const TYPOGRAPHY: Record<string, Typography> = {
  en: { spacing: 'latin', quotes: LATIN_DOUBLE, titleCase: 'english-minor', capitaliseLoneI: true },

  // Spanish and Portuguese both accept angular quotes, but curly ones are what
  // the overwhelming majority of contemporary text on the web actually uses.
  es: { spacing: 'latin', quotes: LATIN_DOUBLE, titleCase: 'all-words', capitaliseLoneI: false },
  pt: { spacing: 'latin', quotes: LATIN_DOUBLE, titleCase: 'all-words', capitaliseLoneI: false },

  // German opens low and closes high — „so“ — and the single pair matches.
  de: {
    spacing: 'latin',
    quotes: {
      openDouble: '„', // „
      closeDouble: '“', // “
      openSingle: '‚', // ‚
      closeSingle: '‘', // ‘
    },
    titleCase: 'all-words',
    capitaliseLoneI: false,
  },

  // Guillemets, pointing outward, with a narrow no-break space inside each.
  fr: {
    spacing: 'french',
    quotes: {
      openDouble: '«', // «
      closeDouble: '»', // »
      openSingle: '‹', // ‹
      closeSingle: '›', // ›
      innerSpace: NARROW_NBSP,
    },
    titleCase: 'all-words',
    capitaliseLoneI: false,
  },

  // Russian uses the same guillemets as French but sets them tight.
  ru: {
    spacing: 'latin',
    quotes: {
      openDouble: '«', // «
      closeDouble: '»', // »
      openSingle: '„', // „
      closeSingle: '“', // “
    },
    titleCase: 'all-words',
    capitaliseLoneI: false,
  },

  // Simplified Chinese does use curly double quotes, so those convert cleanly.
  // Spacing does not: CJK punctuation is full-width and carries its own space.
  zh: { spacing: 'cjk', quotes: LATIN_DOUBLE, titleCase: 'all-words', capitaliseLoneI: false },

  // Japanese quotes with corner brackets 「」, and a straight `"` in Japanese
  // text is far more often inside code or a Latin fragment than a quotation.
  // Guessing wrong rewrites source code, so this one declines to guess.
  ja: { spacing: 'cjk', quotes: null, titleCase: 'all-words', capitaliseLoneI: false },
};

const FALLBACK = TYPOGRAPHY.en;

/**
 * The conventions for a BCP 47 tag. Islands receive `pt-BR` and `zh-Hans`, so
 * the region and script subtags are dropped before the lookup.
 */
export function typographyFor(locale: string): Typography {
  const base = locale.toLowerCase().split('-')[0];
  return TYPOGRAPHY[base] ?? FALLBACK;
}

/* ------------------------------------------------------------ capability --- */

/** The four punctuation switches, which are the ones that vary by language. */
export type WritingRule =
  | 'fixRepeatedWords'
  | 'spaceAfterPunctuation'
  | 'removeSpaceBeforePunctuation'
  | 'smartQuotes';

/**
 * Which punctuation rules mean anything in this language.
 *
 * The UI disables the rest and says why. A disabled switch with a reason is a
 * far better answer than an enabled one that silently corrupts the document —
 * and better than hiding it, which would leave someone hunting for a feature
 * the tool appears to have lost.
 */
export function supportedRules(locale: string): Record<WritingRule, boolean> {
  const { spacing, quotes } = typographyFor(locale);
  return {
    // A doubled word is a typo in every language. The rule needs whitespace
    // between the two copies, so it simply never matches unspaced CJK.
    fixRepeatedWords: true,
    spaceAfterPunctuation: spacing !== 'cjk',
    removeSpaceBeforePunctuation: spacing !== 'cjk',
    smartQuotes: quotes !== null,
  };
}

/* -------------------------------------------------------------- spacing --- */

/**
 * The no-break space French sets before a given mark: narrow before `;!?`,
 * full before `:`. Both are no-break on purpose — an ordinary space would let
 * the mark wrap onto the next line by itself.
 */
export function frenchSpaceFor(mark: string): string {
  return mark === ':' ? NBSP : NARROW_NBSP;
}

export { NARROW_NBSP, NBSP };
