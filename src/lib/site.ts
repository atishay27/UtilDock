export const SITE = {
  name: 'UtilDock',
  tagline: 'Your dock for developer utilities.',
  url: 'https://utildock.dev',
  description:
    'Free, ad-free developer utilities that run entirely in your browser: JSON formatter, viewer, validator and diff, JWT decoder and encoder, word counter and text formatter. No uploads, no accounts, no ads.',
} as const;

/**
 * An absolute URL in the one shape the site commits to: directory-style, with a
 * trailing slash. Canonicals, the sitemap and every JSON-LD `url` must agree,
 * or they nominate different pages for the same content.
 */
export function absoluteUrl(path: string): string {
  const withSlash = path.endsWith('/') ? path : `${path}/`;
  return new URL(withSlash, SITE.url).href;
}

/**
 * Analytics configuration lives in `./analytics.ts`, not here. Read the note at
 * the top of that file before changing anything about it: measurement is opt-in
 * and loads no third-party code until a visitor grants it, and the disclosure
 * on /privacy is written to match that exactly. The two have to move together.
 */
