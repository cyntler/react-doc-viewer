import en from "./locales/en.json";
import pl from "./locales/pl.json";
import es from "./locales/es.json";
import de from "./locales/de.json";
import it from "./locales/it.json";
import pt from "./locales/pt.json";
import fr from "./locales/fr.json";
import ar from "./locales/ar.json";
import sr from "./locales/sr.json";
import sr_cyr from "./locales/sr_cyr.json";
import ja from "./locales/ja.json";
import ru from "./locales/ru.json";
import se from "./locales/se.json";
import tr from "./locales/tr.json";

export const locales = {
  en,
  pl,
  es,
  de,
  it,
  pt,
  fr,
  ar,
  sr,
  sr_cyr,
  ja,
  ru,
  se,
  tr,
};

export const supportedLanguages = Object.keys(locales);

export type AvailableLanguages = keyof typeof locales;

export const defaultLanguage: AvailableLanguages = "en";
