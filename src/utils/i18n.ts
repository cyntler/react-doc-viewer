import en from "../locales/en.json";

export const locales = {
  en: en as Record<string, string>,
};

export type AvailableLanguages = keyof typeof locales;
export const defaultLanguage: AvailableLanguages = "en";
