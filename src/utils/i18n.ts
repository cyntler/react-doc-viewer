import en from "../locales/en.json";
import pl from "../locales/pl.json";

export const locales = {
  en,
  pl,
};

export type AvailableLanguages = keyof typeof locales;
export const defaultLanguage: AvailableLanguages = "en";
