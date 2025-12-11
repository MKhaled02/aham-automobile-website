import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://aham-automobile.de',  // Deine Domain
  integrations: [sitemap()],
  output: 'static'
});