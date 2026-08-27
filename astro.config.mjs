import { defineConfig } from 'astro/config';

// LP autonoma de conversao. Deploy estatico em lp.kontiva.ai.
export default defineConfig({
  site: 'https://lp.kontiva.ai',
  output: 'static',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
});
