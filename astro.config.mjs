// @ts-check
import pagefind from "astro-pagefind";
import { defineConfig } from "astro/config";
import { defaultLocale, locales } from "./src/i18n/config";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://blog.simoncardona.com",
  integrations: [pagefind(), sitemap()],
  i18n: {
    defaultLocale: defaultLocale,
    locales: [...locales],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
});