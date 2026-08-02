export const SITE = {
  name: 'UtilDock',
  tagline: 'Your dock for developer utilities.',
  url: 'https://utildock.dev',
  description:
    'Fast, ad-free developer utilities that run entirely in your browser. JSON viewer, validator, comparator and formatter — no uploads, no accounts, no tracking.',
} as const;

/**
 * There is deliberately no analytics configuration here.
 *
 * Every hosted analytics product — including the cookieless ones — works by
 * loading a script from someone else's origin and beaconing back to it. That
 * breaks the site's no-third-party-requests rule and would force 'unsafe' hosts
 * into the CSP in `public/_headers`, weakening the guarantee the product is
 * built on.
 *
 * Traffic questions are answered from the host's own request logs (the
 * Cloudflare Pages dashboard reports per-path counts), which exist because the
 * files have to be served at all. Nothing extra is collected, and nothing runs
 * in the visitor's page.
 *
 * If measurement is ever genuinely needed, it must be first-party: same origin,
 * no script from elsewhere, and disclosed on /privacy before it ships.
 */
