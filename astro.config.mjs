// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://utildock.dev',
  integrations: [
    react(),
    // /og is a render target for the share card, not a page anyone should land on.
    sitemap({
      filter: (page) => !page.includes('/og'),
      lastmod: new Date(),
      changefreq: 'weekly',
      serialize(item) {
        // The tools are the point of the site; the legal pages are not.
        const path = new URL(item.url).pathname;
        if (path === '/') item.priority = 1.0;
        else if (path === '/json/') item.priority = 0.9;
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
