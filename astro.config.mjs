// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

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
      lastmod: new Date(),
      changefreq: 'weekly',
      // Emits the xhtml:link alternates that pair with the <head> hreflang tags.
      i18n: { defaultLocale: 'en', locales: LOCALES },
      serialize(item) {
        // The tools are the point of the site; the legal pages are not.
        const path = rootPath(new URL(item.url).pathname);
        if (path === '/') item.priority = 1.0;
        else if (path === '/json') item.priority = 0.9;
        else if (path.startsWith('/json/')) item.priority = 0.8;
        else {
          item.priority = 0.3;
          item.changefreq = /** @type {typeof item.changefreq} */ ('yearly');
        }
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
