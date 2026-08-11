/**
 * Counting words, characters, sentences and paragraphs in any script.
 *
 * `text.split(/\s+/)` reports one word for a whole Japanese paragraph, which
 * contains no spaces at all. `Intl.Segmenter` implements the Unicode
 * text-segmentation annex, ships with the browser, and is why this file needs
 * no dependency and no per-language special cases.
 *
 * It is given the *content's* locale, not the page's: Japanese pasted into the
 * English page still has to count as Japanese, so the script is detected from
 * the text.
 *
 * Without `Intl.Segmenter` the regex path takes over and the result is flagged
 * imprecise, so a wrong number is never reported as a right one.
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
 * Reading speed is not one number. The conventional 200–250 wpm is for
 * alphabetic prose; CJK is measured in characters per minute, around 400–500.
 * Reporting 238 wpm for Japanese overstates reading time about twofold.
 */
export type Script = 'latin' | 'cjk';

const READING_WORDS_PER_MINUTE = 238;
const READING_CJK_CHARS_PER_MINUTE = 400;
const SPEAKING_WORDS_PER_MINUTE = 140;
const SPEAKING_CJK_CHARS_PER_MINUTE = 250;

/*
 * Escapes rather than literal characters, so the ranges survive being copied
 * between editors without a normalisation step altering one.
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
 * Whether the text is mostly CJK. A threshold rather than "contains any": an
 * English paragraph quoting one Japanese place name is still English. Twenty
 * per cent sits well clear of both incidental quotation and real CJK text.
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
 * The CJK language picks `Intl.Segmenter`'s dictionary, so a CJK page locale is
 * trusted and anything else asks for `ja`. That gives CJK pasted into the
 * English page word segmentation instead of a character-by-character split.
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
 * The words in the text, in order. `Intl.Segmenter` marks which segments are
 * word-like, which excludes punctuation without a blocklist and keeps "don't"
 * and "l'objet" segmented the way each language reads them.
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
 * Sentence count. Splitting on `[.!?]` reads "Dr. Smith went to Washington D.C.
 * yesterday" as three sentences and misses the CJK full stop; the Unicode
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
 * Words worth reporting in the frequency table. Single characters and bare
 * numbers are dropped as noise, except in CJK where one ideograph is a word.
 *
 * Stop words are deliberately kept: the list would need eight languages, and
 * someone checking keyword density does want to see that "the" is six per cent.
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
 * Limits people count against — each a real published cap in the unit its
 * platform measures. The two SEO figures are conventional approximations:
 * Google truncates on rendered pixel width, not character count.
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
