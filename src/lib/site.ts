export const SITE = {
  name: 'UtilDock',
  tagline: 'Your dock for developer utilities.',
  url: 'https://utildock.dev',
  description:
    'Fast, ad-free developer utilities that run entirely in your browser. JSON viewer, validator, comparator and formatter — no uploads, no accounts, no tracking.',
  /**
   * Cloudflare Web Analytics beacon token. Set PUBLIC_CF_BEACON_TOKEN in the
   * Pages project (or a local .env) to switch analytics on; when it is empty
   * no beacon script is emitted at all.
   */
  beaconToken: import.meta.env.PUBLIC_CF_BEACON_TOKEN ?? '',
} as const;
