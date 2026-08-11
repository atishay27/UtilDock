/**
 * Google Tag Manager / GA4, gated behind explicit consent. Three rules this
 * module exists to keep:
 *
 *  1. **Nothing is requested from Google until the visitor says yes.** Consent
 *     Mode's default-denied state still pings Google; we do not use it. Neither
 *     gtm.js nor gtag.js is injected until consent is stored, so declining — or
 *     never answering — makes zero third-party requests.
 *  2. **Advertising signals are off permanently.** `ad_storage`, `ad_user_data`
 *     and `ad_personalization` are denied unconditionally and never updated, so
 *     a tag added in the GTM console cannot turn remarketing on. Consent can
 *     only raise `analytics_storage`.
 *  3. **The CSP stays an allowlist.** GTM can load arbitrary vendors;
 *     `public/_headers` names only Google's hosts, so a tag pointing elsewhere
 *     is blocked until that file changes in a reviewed commit.
 *
 * IDs come from the environment, so local and preview builds stay silent and
 * same-origin. Absent them this is inert.
 */

/** Set as PUBLIC_GTM_ID in the Cloudflare Pages environment, e.g. GTM-XXXXXXX. */
export const GTM_ID = import.meta.env.PUBLIC_GTM_ID ?? '';

/**
 * Set as PUBLIC_GA_ID only when GA4 is loaded *directly* rather than through a
 * container. When PUBLIC_GTM_ID is present this is ignored: GTM owns the GA4
 * configuration tag, and firing gtag.js alongside it would double-count every
 * page view against the same property.
 */
export const GA_ID = import.meta.env.PUBLIC_GA_ID ?? '';

/** localStorage key holding 'granted' | 'denied'. Absent means undecided. */
export const CONSENT_KEY = 'utildock:consent';

/** GTM wins where both are configured — see the note on GA_ID. */
export const LOADER: 'gtm' | 'gtag' | 'none' = GTM_ID ? 'gtm' : GA_ID ? 'gtag' : 'none';

/** Analytics is only ever wired up when there is somewhere to send to. */
export const ANALYTICS_ENABLED = LOADER !== 'none';

/**
 * Push a custom event to the container.
 *
 * **Nothing describing the visitor's document belongs in `params`** — not its
 * content, size, shape or error. The event's existence already carries the only
 * fact worth having, that the tool was used. PRODUCT.md rule 4; a byte count
 * measures their document as surely as a substring of it does.
 *
 * Silent unless a container is configured *and* consent was granted. The
 * consent check is defence in depth: unloaded, these pushes only fill an array
 * nobody reads, but a later tag replaying historical dataLayer entries would
 * find them.
 */
export function trackEvent(name: string, params: Record<string, string> = {}): void {
  if (!ANALYTICS_ENABLED || typeof window === 'undefined') return;

  const api = (window as { utildock?: { consent?: string | null } }).utildock;
  if (api?.consent !== 'granted') return;

  const layer = (window as { dataLayer?: unknown[] }).dataLayer;
  if (!layer) return;

  layer.push({ event: name, ...params });
}
