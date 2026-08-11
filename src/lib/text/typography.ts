/**
/**
 * Per-language typographic convention. The switches in `format.ts` are the same
 * everywhere; their behaviour comes from here.
 *
 *  - French wants a space *before* `;` `:` `!` `?`; stripping it breaks French.
 *  - CJK puts no space around punctuation, so both spacing rules are meaningless.
 *  - Quotation marks differ: German `„`, French and Russian `«`, Japanese `「`.
 *  - Title Case minor words are English and do not transfer.
 *
 * Where a rule has no meaning in a language it is reported unsupported and the
 * UI disables it, rather than quietly doing the wrong thing.
 *
 * The page's locale governs, not the content's detected script — the opposite
 * of `count.ts`, which measures the text in front of it. This is editorial
 * convention, and it has to be predictable when the tool rewrites a document.
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
   * every word — less polished, but never wrong the way demoting the wrong
   * words is.
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

  // Spanish and Portuguese accept angular quotes, but contemporary web text
  // overwhelmingly uses curly ones.
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

  // Japanese quotes with corner brackets 「」. A straight `"` in Japanese text
  // is more often code than a quotation, so this one declines to guess.
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
 * Which punctuation rules mean anything in this language. The UI disables the
 * rest and says why — better than an enabled switch that corrupts the document,
 * and better than hiding one and looking like the feature is gone.
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
