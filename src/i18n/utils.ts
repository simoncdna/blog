import fr from "./fr.json";
import en from "./en.json";
import { defaultLang, locales, type Lang } from "./config";

const translations: Record<Lang, Record<string, string>> = { fr, en };

/**
 * Validates and returns a supported language, falling back to default.
 * @param lang - Language string to validate
 * @returns Valid Lang or defaultLang if invalid
 */
export function getLang(lang: string | undefined): Lang {
  if (locales.includes(lang as Lang)) return lang as Lang;
  return defaultLang;
}

/**
 * Returns a translation function for the specified language.
 * @param lang - Target language
 * @returns Translation function that accepts a key and optional params
 * @example
 * const t = useTranslations("fr");
 * t("nav.home") // "Accueil"
 * t("posts.count", { count: 5 }) // "5 articles"
 */
export function useTranslations(lang: Lang) {
  return function t(key: string, params?: Record<string, string | number>) {
    let text = translations[lang][key] || key;

    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        text = text.replace(`{${k}}`, String(v));
      });
    }
    return text;
  };
}

/**
 * Extracts language from URL pathname.
 * @param url - URL object to extract language from
 * @returns Detected language or defaultLang
 */
export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang === "fr" || lang === "en") return lang;
  return defaultLang;
}

/**
 * Prefixes a path with the language code.
 * @param lang - Language code
 * @param path - Path to localize
 * @returns Localized path (e.g., "/fr/about")
 */
export function getLocalizedPath(lang: Lang, path: string) {
  return `/${lang}${path}`;
}

/**
 * Removes the language prefix from a post ID to get the slug.
 * @param postId - Full post ID (e.g., "fr/my-post")
 * @param lang - Language to strip
 * @returns Post slug without language prefix
 */
export function getPostSlug(postId: string, lang: Lang) {
  return postId.replace(`${lang}/`, "");
}
