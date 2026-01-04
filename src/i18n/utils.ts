import fr from "./fr.json";
import en from "./en.json";
import { defaultLang, locales, type Lang } from "./config";

const translations: Record<Lang, Record<string, string>> = { fr, en };

export function getLang(lang: string | undefined): Lang {
  if (locales.includes(lang as Lang)) return lang as Lang;
  return defaultLang;
}

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

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang === "fr" || lang === "en") return lang;
  return defaultLang;
}

export function getLocalizedPath(lang: Lang, path: string) {
  return `/${lang}${path}`;
}

export function getPostSlug(postId: string, lang: Lang) {
  return postId.replace(`${lang}/`, "");
}
