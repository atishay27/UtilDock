/**
 * UtilDock service worker.
 *
 * Deliberately hand-written and short enough to read in one sitting — this file
 * is the only thing standing between the site and your browser cache, so it
 * should be auditable.
 *
 * It never talks to anything but this origin, and it caches only responses to
 * requests the page already made.
 *
 *   /_astro/*  content-hashed build output → cache first, it can never go stale
 *   documents  network first, falling back to cache so reloads work offline
 *   other GETs stale-while-revalidate
 */

const VERSION = 'v1';
const ASSET_CACHE = `utildock-assets-${VERSION}`;
const PAGE_CACHE = `utildock-pages-${VERSION}`;

/** The shell worth having before the first offline visit. */
const PRECACHE = ['/', '/json/viewer', '/json/validator', '/json/diff', '/json/formatter'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(PAGE_CACHE)
      // A failed precache must not block installation — the runtime caches
      // will pick these up on first visit anyway.
      .then((cache) => cache.addAll(PRECACHE).catch(() => undefined))
      .then(() => self.skipWaiting()),
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

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const hit = await cache.match(request);
  if (hit) return hit;

  const response = await fetch(request);
  if (response.ok) cache.put(request, response.clone());
  return response;
}

async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch (error) {
    const hit = await cache.match(request);
    if (hit) return hit;
    // Offline and never visited: fall back to the home page shell.
    const home = await cache.match('/');
    if (home) return home;
    throw error;
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const hit = await cache.match(request);
  const network = fetch(request)
    .then((response) => {
      if (response.ok) cache.put(request, response.clone());
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
    event.respondWith(networkFirst(request, PAGE_CACHE));
    return;
  }

  event.respondWith(staleWhileRevalidate(request, ASSET_CACHE));
});
