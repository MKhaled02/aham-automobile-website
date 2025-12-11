import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';

export default defineConfig({
  output: 'static',  // Statische Seiten (SSG)
  site: 'https://aham-automobile.de',  // Später deine Domain
  // adapter: netlify()  // Nur nötig wenn du SSR willst
});