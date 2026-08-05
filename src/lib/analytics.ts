/**
 * Google Tag Manager / Google Analytics 4, gated behind explicit consent.
 *
 * The site's guarantee is about the visitor's *document* — that is held by the
 * worker boundary and by the fact that no code path reads an editor buffer into
 * a request. Measurement is a separate question, and it is answered here rather
 * than silently.
 *
 * Three rules this module exists to keep:
 *
 *  1. **Nothing is requested from Google until the visitor says yes.** Consent
 *     Mode's default-denied state still fires cookieless pings to Google. We do
 *     not use that. Neither gtm.js nor gtag.js is injected at all until consent
 *     is stored, so a visitor who declines — or who never answers — makes zero
 *     third-party requests, exactly as before this shipped.
 *  2. **Advertising signals are off permanently.** `ad_storage`, `ad_user_data`
 *     and `ad_personalization` are denied unconditionally in the Consent Mode
 *     defaults and are never updated by the consent flow, so a tag added in the
 *     GTM console later cannot quietly turn remarketing on. Consent can only
 *     ever raise `analytics_storage`.
 *  3. **The CSP stays an allowlist.** GTM can load arbitrary vendors by design;
 *     `public/_headers` only names Google's own hosts, so any new tag pointing
 *     somewhere else is blocked by the browser until someone edits that file in
 *     a reviewed commit. That is deliberate — it keeps the GTM console from
 *     being a way to add a third party without touching the repository.
 *
 * IDs come from the environment so local and preview builds stay silent and
 * entirely same-origin. Absent them, this is all inert.
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
 * **What may be passed here is not a matter of taste.** A page view already
 * tells us a tool page was opened; the only thing worth adding is whether the
 * tool was then *used*, which is one boolean's worth of information and is
 * carried by the event's existence. Nothing describing the visitor's document
 * belongs in `params` — not its content, not its size, not its shape, not the
 * error it produced. Rule 4 in PRODUCT.md is that no analytics event carries
 * document content, and a byte count is a measurement of their document just
 * as surely as a substring of it is.
 *
 * Silent unless a container is configured *and* consent was granted. The
 * consent check is defence in depth: with nothing loaded these pushes only
 * accumulate in an array nobody reads, but a future tag that fires on
 * historical dataLayer entries would replay them, and this stops that.
 */
export function trackEvent(name: string, params: Record<string, string> = {}): void {
  if (!ANALYTICS_ENABLED || typeof window === 'undefined') return;

  const api = (window as { utildock?: { consent?: string | null } }).utildock;
  if (api?.consent !== 'granted') return;

  const layer = (window as { dataLayer?: unknown[] }).dataLayer;
  if (!layer) return;

  layer.push({ event: name, ...params });
}
