export const SITE = {
  name: 'UtilDock',
  tagline: 'Your dock for developer utilities.',
  url: 'https://utildock.dev',
  description:
    'Fast, ad-free developer utilities that run entirely in your browser. JSON viewer, validator, comparator and formatter — no uploads, no accounts, no tracking.',
} as const;

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
