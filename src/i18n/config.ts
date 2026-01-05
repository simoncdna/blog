export const defaultLocale = "en" as const;
export const locales = ["fr", "en"] as const;

export type Locale = (typeof locales)[number];
