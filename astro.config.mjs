// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: "https://alecs577.github.io",
  base: "/lisa-tarlato",
  trailingSlash: "always",
  vite: {
    plugins: [tailwindcss()]
  }
});