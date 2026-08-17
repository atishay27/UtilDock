/**
 * UtilDock service worker. Hand-written and kept short so it stays auditable:
 * it talks to no other origin and caches only what the page already requested.
 *
 *   /_astro/*  content-hashed build output → cache first, it can never go stale
 *   documents  network first, falling back to cache so reloads work offline
 *   other GETs stale-while-revalidate
 *
 * Bump VERSION when any of that changes.
 */

const VERSION = 'v7';
const ASSET_CACHE = `utildock-assets-${VERSION}`;
const PAGE_CACHE = `utildock-pages-${VERSION}`;

/**
 * The shell worth having before the first offline visit, per language.
 *
 * Trailing slashes are required, not tidiness: the host 308s the slashless
 * form, and `cache.addAll` rejects a redirected response — one bad entry threw
 * away the whole precache. The keys would not have matched a navigation anyway.
 */
const PAGES = [
  '/',
  '/json/',
  '/json/viewer/',
  '/json/validator/',
  '/json/diff/',
  '/json/formatter/',
  '/jwt/',
  '/jwt/decoder/',
  '/jwt/encoder/',
  '/text/',
  '/text/counter/',
  '/text/formatter/',
];

/**
 * Kept in step with `src/lib/i18n/locales.ts` by hand — this file ships as-is
 * and imports nothing. English is absent because it has no prefix.
 */
const LOCALES = ['es', 'de', 'fr', 'pt-br', 'ja', 'ru', 'zh'];

function localePrefix(pathname) {
  const first = pathname.split('/')[1];
  return LOCALES.includes(first) ? `/${first}` : '';
}

/**
 * Precache one language's pages, once per worker lifetime.
 *
 * On first navigation rather than on install: install cannot know which of the
 * eight languages this visitor reads, and caching all of them to serve one is
 * most of a megabyte of waste.
 */
const primed = new Set();

function prime(prefix) {
  if (primed.has(prefix)) return;
  primed.add(prefix);
  const urls = PAGES.map((page) => `${prefix}${page}`);
  // A failed precache must not break anything — the runtime caches pick these
  // up on first visit anyway.
  caches
    .open(PAGE_CACHE)
    .then((cache) => cache.addAll(urls))
    .catch(() => undefined);
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(PAGE_CACHE)
      .then((cache) => cache.addAll(PAGES).catch(() => undefined))
      .then(() => {
        primed.add('');
        return self.skipWaiting();
      }),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith('utildock-') && key !== ASSET_CACHE && key !== PAGE_CACHE)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

/**
 * `cache.put` rejects a response that arrived via a redirect, so an inbound link
 * to the slashless form of a page would otherwise throw where nothing is
 * listening. The site links only the slashed form; this covers links it did not
 * write.
 */
function storable(response) {
  return response.ok && !response.redirected;
}

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const hit = await cache.match(request);
  if (hit) return hit;

  const response = await fetch(request);
  if (storable(response)) cache.put(request, response.clone());
  return response;
}

async function networkFirst(request, cacheName, prefix = '') {
  const cache = await caches.open(cacheName);
  try {
    const response = await fetch(request);
    if (storable(response)) cache.put(request, response.clone());
    return response;
  } catch (error) {
    const hit = await cache.match(request);
    if (hit) return hit;
    // Offline and never visited: fall back to the home page shell — in the
    // language of the address that was asked for, not in English. Landing a
    // Russian reader on the English homepage is a worse failure than the one
    // it is recovering from.
    const home = (prefix && (await cache.match(`${prefix}/`))) || (await cache.match('/'));
    if (home) return home;
    throw error;
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const hit = await cache.match(request);
  const network = fetch(request)
    .then((response) => {
      if (storable(response)) cache.put(request, response.clone());
      return response;
    })
    .catch(() => hit);
  return hit ?? network;
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (url.pathname.startsWith('/_astro/')) {
    event.respondWith(cacheFirst(request, ASSET_CACHE));
    return;
  }

  if (request.mode === 'navigate' || request.destination === 'document') {
    const prefix = localePrefix(url.pathname);
    prime(prefix);
    event.respondWith(networkFirst(request, PAGE_CACHE, prefix));
    return;
  }

  event.respondWith(staleWhileRevalidate(request, ASSET_CACHE));
});
