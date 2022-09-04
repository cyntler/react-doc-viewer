import en from "../locales/en.json";
import pl from "../locales/pl.json";

export const locales = {
  en: en as Record<string, string>,
  pl: pl as Record<string, string>,
};

export type AvailableLanguages = keyof typeof locales;
export const defaultLanguage: AvailableLanguages = "en";
