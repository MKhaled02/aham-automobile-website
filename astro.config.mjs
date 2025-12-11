import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://aham-automobile.de',
  integrations: [sitemap()],
  output: 'static'
});
