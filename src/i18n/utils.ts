import fr from "./fr.json";
import en from "./en.json";
import { defaultLocale, locales, type Locale } from "./config";

const translations: Record<Locale, Record<string, string>> = { fr, en };

/**
 * Validates and returns a supported locale, falling back to default.
 * @param locale - Locale string to validate
 * @returns Valid Locale or defaultLocale if invalid
 */
export function getLocale(locale: string | undefined): Locale {
  if (locales.includes(locale as Locale)) return locale as Locale;
  return defaultLocale;
}

/**
 * Returns a translation function for the specified locale.
 * @param locale - Target locale
 * @returns Translation function that accepts a key and optional params
 * @example
 * const t = useTranslations("fr");
 * t("nav.home") // "Accueil"
 * t("posts.count", { count: 5 }) // "5 articles"
 */
export function useTranslations(locale: Locale) {
  return function t(key: string, params?: Record<string, string | number>) {
    let text = translations[locale][key] || key;

    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        text = text.replace(`{${k}}`, String(v));
      });
    }
    return text;
  };
}

/**
 * Extracts locale from URL pathname.
 * @param url - URL object to extract locale from
 * @returns Detected locale or defaultLocale
 */
export function getLocaleFromUrl(url: URL) {
  const [, locale] = url.pathname.split("/");
  if (locale === "fr" || locale === "en") return locale;
  return defaultLocale;
}

/**
 * Prefixes a path with the locale code.
 * @param locale - Locale code
 * @param path - Path to localize
 * @returns Localized path (e.g., "/fr/about")
 */
export function getLocalizedPath(locale: Locale, path: string) {
  return `/${locale}${path}`;
}

/**
 * Removes the locale prefix from a post ID to get the slug.
 * @param postId - Full post ID (e.g., "fr/my-post")
 * @param locale - Locale to strip
 * @returns Post slug without locale prefix
 */
export function getPostSlug(postId: string, locale: Locale) {
  return postId.replace(`${locale}/`, "");
}
