// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import clerk from "@clerk/astro";
import { dark } from '@clerk/themes'
import { esMX } from '@clerk/localizations';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [clerk({
    localization: esMX,
    appearance: {
      baseTheme: dark,
    }
  }), react()],
  adapter: vercel({}),
  output: "server"
});