/**
 * The locales the site is published in.
 *
 * English is the default and keeps its unprefixed URLs — `/json/formatter`, not
 * `/en/json/formatter`. That is not a style preference: those URLs are indexed
 * and ranking, and moving them would throw that away for nothing. Every other
 * locale lives under a path segment.
 *
 * `segment` is what appears in the URL and what `src/pages/[lang]/` matches.
 * `hreflang` is what search engines are told, and the two are allowed to differ
 * — `/pt-br/` is a tidier URL than `/pt-BR/`, and `zh` is a tidier one than
 * `zh-Hans`, but the tag has to carry the precise code or it is ignored.
 */

export const DEFAULT_LOCALE = 'en' as const;

export interface LocaleMeta {
  /** URL path segment. Empty for the default locale, which has no prefix. */
  segment: string;
  /** BCP 47 tag for `<html lang>` and `hreflang`. */
  hreflang: string;
  /** Open Graph wants underscores and a region, always. */
  ogLocale: string;
  /** How this language names itself — the only correct label for a picker. */
  native: string;
  /** How English names it, for `aria-label` and the `title` attribute. */
  english: string;
  /**
   * Short form for the header trigger — native, because the visitor who needs
   * this control is by definition reading a language they did not choose, and
   * "JA" identifies Japanese only to someone who already reads English.
   */
  short: string;
  /**
   * Latin language code, for the aligned column in the open panel and the
   * footer's fallback row. A tidy index, not wayfinding — the native names
   * beside it do that job.
   */
  code: string;
}

export const LOCALES = {
  en: {
    segment: '',
    hreflang: 'en',
    ogLocale: 'en_US',
    native: 'English',
    english: 'English',
    short: 'EN',
    code: 'EN',
  },
  es: {
    segment: 'es',
    hreflang: 'es',
    ogLocale: 'es_ES',
    native: 'Español',
    english: 'Spanish',
    short: 'ES',
    code: 'ES',
  },
  de: {
    segment: 'de',
    hreflang: 'de',
    ogLocale: 'de_DE',
    native: 'Deutsch',
    english: 'German',
    short: 'DE',
    code: 'DE',
  },
  fr: {
    segment: 'fr',
    hreflang: 'fr',
    ogLocale: 'fr_FR',
    native: 'Français',
    english: 'French',
    short: 'FR',
    code: 'FR',
  },
  'pt-br': {
    segment: 'pt-br',
    hreflang: 'pt-BR',
    ogLocale: 'pt_BR',
    native: 'Português (Brasil)',
    english: 'Portuguese (Brazil)',
    short: 'PT',
    code: 'PT',
  },
  ja: {
    segment: 'ja',
    hreflang: 'ja',
    ogLocale: 'ja_JP',
    native: '日本語',
    english: 'Japanese',
    short: '日本語',
    code: 'JA',
  },
  ru: {
    segment: 'ru',
    hreflang: 'ru',
    ogLocale: 'ru_RU',
    native: 'Русский',
    english: 'Russian',
    short: 'RU',
    code: 'RU',
  },
  zh: {
    segment: 'zh',
    hreflang: 'zh-Hans',
    ogLocale: 'zh_CN',
    native: '简体中文',
    english: 'Chinese (Simplified)',
    short: '中文',
    code: 'ZH',
  },
} as const satisfies Record<string, LocaleMeta>;

export type Locale = keyof typeof LOCALES;

export const LOCALE_IDS = Object.keys(LOCALES) as Locale[];

/** Every locale but the default — the set `src/pages/[lang]/` generates. */
export const PREFIXED_LOCALES = LOCALE_IDS.filter((id) => id !== DEFAULT_LOCALE);

export function isLocale(value: string): value is Locale {
  return Object.hasOwn(LOCALES, value);
}

/**
 * Rewrite a site-root path into a locale. The default locale is returned
 * unprefixed, which is the whole reason this function exists rather than a
 * template literal at each call site.
 *
 * The trailing slash is not cosmetic. Astro builds directory-style, so the
 * server answers `/de/json/` and 308s `/de/json`. Every canonical, hreflang and
 * sitemap entry carries the slash; an internal link without one sends both the
 * visitor and the crawler through a redirect to reach the page it just named.
 */
export function localizedPath(path: string, locale: Locale): string {
  const { segment } = LOCALES[locale];
  const clean = path === '/' ? '' : path.replace(/^\/|\/$/g, '');
  const parts = [segment, clean].filter(Boolean);
  return parts.length === 0 ? '/' : `/${parts.join('/')}/`;
}

/**
 * The inverse: strip a locale prefix back to the canonical English path, so a
 * language picker can offer the same page rather than dumping the visitor on
 * the homepage of their language.
 */
export function rootPath(pathname: string): string {
  const parts = pathname.replace(/^\/|\/$/g, '').split('/').filter(Boolean);
  const first = parts[0];
  if (first && isLocale(first) && first !== DEFAULT_LOCALE) parts.shift();
  return parts.length === 0 ? '/' : `/${parts.join('/')}`;
}
