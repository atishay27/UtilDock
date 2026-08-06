// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { lastmodLookup } from './scripts/content-dates.mjs';

/**
 * Kept in step with `src/lib/i18n/locales.ts` by hand, because this file is
 * plain JS and cannot import the TypeScript module that owns the list. Key is
 * the URL segment, value is the hreflang code the sitemap emits.
 *
 * English is deliberately absent from the prefix set: it lives at the site root
 * and its URLs predate this, so moving them under /en/ would discard every
 * ranking the site has.
 */
const LOCALES = {
  en: 'en',
  es: 'es',
  de: 'de',
  fr: 'fr',
  'pt-br': 'pt-BR',
  ja: 'ja',
  ru: 'ru',
  zh: 'zh-Hans',
};

const PREFIXES = Object.keys(LOCALES).filter((code) => code !== 'en');

/**
 * `/es/json/diff/` → `/json/diff`, so one rule set covers every language.
 * @param {string} pathname
 */
function rootPath(pathname) {
  const trimmed = pathname.replace(/\/$/, '');
  const [, first, ...rest] = trimmed.split('/');
  return PREFIXES.includes(first) ? `/${rest.join('/')}` : trimmed || '/';
}

/**
 * `/es/json/diff/` → `es`. Anything unprefixed is English, which lives at the root.
 * @param {string} pathname
 */
function localeOf(pathname) {
  const [, first] = pathname.split('/');
  return PREFIXES.includes(first) ? first : 'en';
}

/** Pages that are read rather than used. Everything else is a tool surface. */
const READING_PAGES = ['/about', '/privacy'];

// Read once at config load, not once per URL — this shells out to git.
const lastmodFor = lastmodLookup();

// https://astro.build/config
export default defineConfig({
  site: 'https://utildock.dev',
  i18n: {
    defaultLocale: 'en',
    locales: Object.keys(LOCALES),
    routing: {
      // English stays at /json/formatter, not /en/json/formatter.
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    react(),
    // /og is a render target for the share card, not a page anyone should land on.
    sitemap({
      filter: (page) => !page.includes('/og'),
      changefreq: 'weekly',
      // Emits the xhtml:link alternates that pair with the <head> hreflang tags.
      i18n: { defaultLocale: 'en', locales: LOCALES },
      serialize(item) {
        const { pathname } = new URL(item.url);
        const path = rootPath(pathname);

        // Dated from the page's own content, so a deploy that changes nothing
        // does not claim every URL changed. Undefined omits the tag entirely.
        item.lastmod = lastmodFor(path, localeOf(pathname));

        /* The tools are the point of the site; the legal pages are not.
           Stated as a shape rule rather than a list of routes: the home page,
           then the reading pages, then category hubs at one segment and tools
           at two. Adding a tool or a whole category needs no edit here, which
           the previous version — which named `/json` twice — did. */
        if (path === '/') item.priority = 1.0;
        else if (READING_PAGES.includes(path)) {
          item.priority = 0.3;
          item.changefreq = /** @type {typeof item.changefreq} */ ('yearly');
        } else if (path.split('/').length > 2) item.priority = 0.8;
        else item.priority = 0.9;

        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
