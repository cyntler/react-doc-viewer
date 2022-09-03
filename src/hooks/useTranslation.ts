import { useCallback, useContext } from "react";
import { DocViewerContext } from "../store/DocViewerProvider";
import { locales } from "../utils/i18n";

export const useTranslation = (key: string) => {
  const {
    state: { language },
  } = useContext(DocViewerContext);

  const t = useCallback(() => {
    const translations = locales[language];
    return translations[key] ?? key;
  }, [key, language]);

  return {
    t,
  };
};
