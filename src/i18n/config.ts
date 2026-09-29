export const locales = ["ro", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ro";
export const localeCookieName = "NEXT_LOCALE";
