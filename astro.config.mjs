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
    sitemap({ filter: (page) => !page.includes('/og') }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
