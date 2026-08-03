export const SITE = {
  name: 'UtilDock',
  tagline: 'Your dock for developer utilities.',
  url: 'https://utildock.dev',
  description:
    'Free, ad-free developer utilities that run entirely in your browser: JSON viewer, validator, diff and formatter. No uploads, no accounts, no tracking.',
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
 * There is deliberately no analytics configuration here. Every hosted product,
 * cookieless ones included, loads a script from another origin and beacons back
 * to it — which would mean adding a host to the CSP in `public/_headers` and
 * giving up the guarantee the site is built on. Traffic questions are answered
 * from Cloudflare's own request logs instead.
 *
 * If measurement is ever needed it must be first-party, same-origin, and
 * disclosed on /privacy before it ships.
 */
