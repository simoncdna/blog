// @ts-check
import pagefind from "astro-pagefind";
import { defineConfig } from "astro/config";
import { defaultLang, locales } from "./src/i18n/config";

// https://astro.build/config
export default defineConfig({
  integrations: [pagefind()],
  i18n: {
    defaultLocale: defaultLang,
    locales: [...locales],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
});
