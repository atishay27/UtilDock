/**
 * Counting words, characters, sentences and paragraphs — correctly, in any
 * script.
 *
 * The naive implementation of a word counter is `text.split(/\s+/).length`, and
 * it is wrong in a way that matters enormously to a site published in eight
 * languages. Japanese and Chinese do not put spaces between words, so a whole
 * Japanese paragraph contains no space at all and a whitespace split reports
 * **one word**. The same split reports one word for "don't", which is right,
 * and two for "l'objet", which is right in French and would not be in English.
 * Getting those cases right by hand means writing a word-segmentation engine
 * per language.
 *
 * `Intl.Segmenter` is that engine, already in the browser, implementing the
 * Unicode text-segmentation annex. It costs no bytes, handles every script the
 * site publishes in, and is the reason this file has no dependency and no
 * per-language special cases. It is used with the *content's* likely locale
 * rather than the page's: someone reading the German UI is usually counting
 * German, but a Japanese document pasted into the English page must still be
 * counted as Japanese, so the script is detected from the text itself.
 *
 * Where `Intl.Segmenter` is missing the regex path takes over and the result is
 * flagged imprecise, so a wrong number is never reported as a right one.
 */

export interface TextCounts {
  /** Unicode code points, not UTF-16 units: one emoji is one character. */
  characters: number;
  charactersNoSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  lines: number;
  /** Bytes the text occupies as UTF-8, which is what a size limit measures. */
  bytes: number;
  /** Longest word, for the "is this within the limit" question. */
  longestWord: number;
  averageWordLength: number;
  averageSentenceLength: number;
}

export interface WordFrequency {
  word: string;
  count: number;
  /** Share of all words, 0–1. */
  share: number;
}

export interface CountResult {
  counts: TextCounts;
  frequency: WordFrequency[];
  /** False when `Intl.Segmenter` was unavailable and the regex path was used. */
  precise: boolean;
  /** The script the counter decided the text is in, for the reading-rate pick. */
  script: Script;
}

/**
 * Reading speed is not one number. The conventional 200–250 words per minute is
 * a figure for alphabetic prose; CJK is normally measured in characters per
 * minute instead, because a "word" is a less useful unit there and readers take
 * in roughly 400–500 characters a minute. Reporting 238 wpm for Japanese would
 * overstate reading time by roughly a factor of two.
 */
export type Script = 'latin' | 'cjk';

const READING_WORDS_PER_MINUTE = 238;
const READING_CJK_CHARS_PER_MINUTE = 400;
const SPEAKING_WORDS_PER_MINUTE = 140;
const SPEAKING_CJK_CHARS_PER_MINUTE = 250;

/*
 * Written as escapes rather than literal characters. The ranges are the point
 * of this module and have to survive being read, reviewed and copied between
 * editors without a normalisation step quietly altering one of them.
 */
const CJK_RANGES =
  '\\u3040-\\u30ff' + // hiragana and katakana
  '\\u3400-\\u4dbf' + // CJK unified ideographs, extension A
  '\\u4e00-\\u9fff' + // CJK unified ideographs
  '\\uf900-\\ufaff' + // CJK compatibility ideographs
  '\\uff66-\\uff9f' + // halfwidth katakana
  '\\u3130-\\u318f' + // Hangul compatibility jamo
  '\\uac00-\\ud7af'; //  Hangul syllables

const CJK_PATTERN = new RegExp(`[${CJK_RANGES}]`, 'gu');
const CJK_CHARACTER = new RegExp(`[${CJK_RANGES}]`, 'u');

/**
 * Whether the text is mostly CJK.
 *
 * A threshold rather than "contains any", because an English paragraph quoting
 * one Japanese place name is still English. Twenty per cent is well above what
 * incidental quotation produces and well below what genuinely CJK text hits.
 */
export function detectScript(text: string): Script {
  if (text === '') return 'latin';
  const cjk = text.match(CJK_PATTERN)?.length ?? 0;
  const letters = text.replace(/[\s\d\p{P}\p{S}]/gu, '').length;
  if (letters === 0) return 'latin';
  return cjk / letters >= 0.2 ? 'cjk' : 'latin';
}

/**
 * The locale to segment with, chosen from the content rather than the UI.
 *
 * The specific CJK language changes the dictionary `Intl.Segmenter` uses, and
 * segmenting Chinese with the Japanese dictionary is worse than not naming a
 * language at all. So when the page's own locale is already a CJK one it is
 * trusted, and otherwise `ja` is requested — a visitor on the English page who
 * pasted CJK text then gets word segmentation rather than the character-by-
 * character split a Latin locale would produce.
 */
function segmentationLocale(script: Script, uiLocale: string): string {
  if (script !== 'cjk') return uiLocale;
  const base = uiLocale.toLowerCase().split('-')[0];
  return base === 'ja' || base === 'zh' || base === 'ko' ? uiLocale : 'ja';
}

let segmenterSupport: boolean | null = null;

function hasSegmenter(): boolean {
  if (segmenterSupport === null) {
    segmenterSupport = typeof Intl !== 'undefined' && typeof Intl.Segmenter === 'function';
  }
  return segmenterSupport;
}

/* ---------------------------------------------------------------- words --- */

/**
 * The words in the text, in order.
 *
 * `Intl.Segmenter` marks which segments are "word-like" — that is what excludes
 * punctuation and whitespace without a blocklist, and what keeps "don't" and
 * "l'objet" segmented the way each language actually reads them.
 */
function segmentWords(text: string, locale: string): string[] {
  const segmenter = new Intl.Segmenter(locale, { granularity: 'word' });
  const words: string[] = [];
  for (const segment of segmenter.segment(text)) {
    if (segment.isWordLike) words.push(segment.segment);
  }
  return words;
}

/**
 * The fallback. Splits on whitespace and strips surrounding punctuation, which
 * is right for alphabetic text and hopeless for CJK — hence `precise: false`,
 * which the UI surfaces rather than hiding.
 */
function regexWords(text: string): string[] {
  return text
    .split(/\s+/)
    .map((word) => word.replace(/^[\p{P}\p{S}]+|[\p{P}\p{S}]+$/gu, ''))
    .filter((word) => word !== '');
}

/* ------------------------------------------------------------ sentences --- */

/**
 * Sentence count.
 *
 * `Intl.Segmenter` again, and again it earns its place: the regex answer is to
 * split on `[.!?]`, which reads "Dr. Smith went to Washington D.C. yesterday"
 * as three sentences and misses the CJK full stop entirely. The Unicode
 * sentence-break algorithm knows about abbreviations, decimals and ideographic
 * punctuation.
 */
function countSentences(text: string, locale: string, precise: boolean): number {
  const trimmed = text.trim();
  if (trimmed === '') return 0;

  if (precise) {
    const segmenter = new Intl.Segmenter(locale, { granularity: 'sentence' });
    let total = 0;
    for (const segment of segmenter.segment(trimmed)) {
      if (segment.segment.trim() !== '') total++;
    }
    return total;
  }

  const matches = trimmed.match(
    /[^.!?。！？…]+[.!?。！？…]+(\s|$)|[^.!?。！？…]+$/g,
  );
  return matches ? matches.length : 1;
}

/* ------------------------------------------------------------ the count --- */

/**
 * A paragraph is a run of text separated by a blank line — the convention every
 * word processor and Markdown renderer uses. Text with no blank lines at all is
 * counted one paragraph per non-empty line instead, because that is what a
 * pasted list is and calling it a single paragraph would be useless.
 */
function countParagraphs(text: string): number {
  const trimmed = text.trim();
  if (trimmed === '') return 0;
  if (/\n\s*\n/.test(trimmed)) {
    return trimmed.split(/\n\s*\n+/).filter((block) => block.trim() !== '').length;
  }
  return trimmed.split('\n').filter((line) => line.trim() !== '').length;
}

const FREQUENCY_LIMIT = 12;

/**
 * Words worth reporting in the frequency table.
 *
 * Single characters and bare numbers are dropped: they crowd the top of the
 * list without telling anyone anything. One ideograph is a word, though, so the
 * length rule does not apply to CJK.
 *
 * Stop words ("the", "and", "der") are deliberately *not* dropped. A stop-word
 * list would have to exist in eight languages, would be wrong at the edges of
 * each, and the visitor checking keyword density usually does want to see that
 * "the" is six per cent of their text.
 */
function buildFrequency(words: string[], locale: string): WordFrequency[] {
  const tally = new Map<string, number>();
  for (const word of words) {
    // Case-folded in the content's language: Turkish folds `I` differently
    // from English, and German `Straße`/`STRASSE` only agree under `de`.
    const key = word.toLocaleLowerCase(locale);
    if (key.length < 2 && !CJK_CHARACTER.test(key)) continue;
    if (/^\d+$/.test(key)) continue;
    tally.set(key, (tally.get(key) ?? 0) + 1);
  }

  const total = words.length || 1;
  return [...tally.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], locale))
    .slice(0, FREQUENCY_LIMIT)
    .map(([word, count]) => ({ word, count, share: count / total }));
}

export function countText(text: string, uiLocale = 'en'): CountResult {
  const script = detectScript(text);
  const precise = hasSegmenter();
  const locale = segmentationLocale(script, uiLocale);

  const words = text.trim() === '' ? [] : precise ? segmentWords(text, locale) : regexWords(text);

  const characters = [...text].length;
  const charactersNoSpaces = [...text.replace(/\s/gu, '')].length;
  const sentences = countSentences(text, locale, precise);
  const wordLengths = words.map((word) => [...word].length);
  const totalWordLength = wordLengths.reduce((sum, length) => sum + length, 0);

  return {
    counts: {
      characters,
      charactersNoSpaces,
      words: words.length,
      sentences,
      paragraphs: countParagraphs(text),
      // An empty document has no lines; otherwise every newline adds one.
      lines: text === '' ? 0 : text.split('\n').length,
      bytes: new TextEncoder().encode(text).length,
      longestWord: wordLengths.length > 0 ? Math.max(...wordLengths) : 0,
      averageWordLength: words.length > 0 ? totalWordLength / words.length : 0,
      averageSentenceLength: sentences > 0 ? words.length / sentences : 0,
    },
    frequency: buildFrequency(words, locale),
    precise,
    script,
  };
}

/* ------------------------------------------------------------ durations --- */

/** Seconds of reading, and of reading aloud, by the rates above. */
export function estimateDurations(
  counts: TextCounts,
  script: Script,
): { reading: number; speaking: number } {
  if (script === 'cjk') {
    return {
      reading: (counts.charactersNoSpaces / READING_CJK_CHARS_PER_MINUTE) * 60,
      speaking: (counts.charactersNoSpaces / SPEAKING_CJK_CHARS_PER_MINUTE) * 60,
    };
  }
  return {
    reading: (counts.words / READING_WORDS_PER_MINUTE) * 60,
    speaking: (counts.words / SPEAKING_WORDS_PER_MINUTE) * 60,
  };
}

/**
 * Limits people are actually counting against.
 *
 * Each is a real published cap, measured in the unit its platform measures in.
 * The two SEO figures are the conventional character approximations rather than
 * promises: Google truncates on rendered pixel width, not character count, so
 * a title of sixty narrow characters may survive where fifty wide ones do not.
 */
export interface Limit {
  id: string;
  unit: 'characters' | 'words';
  max: number;
}

export const LIMITS: Limit[] = [
  { id: 'tweet', unit: 'characters', max: 280 },
  { id: 'sms', unit: 'characters', max: 160 },
  { id: 'page-title', unit: 'characters', max: 60 },
  { id: 'meta-description', unit: 'characters', max: 155 },
];
