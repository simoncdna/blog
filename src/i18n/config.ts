export const defaultLang = "en" as const;
export const locales = ["fr", "en"] as const;

export type Lang = (typeof locales)[number];
