import { useCallback, useContext } from "react";
import mustache from "mustache";
import { DocViewerContext } from "../store/DocViewerProvider";
import { locales } from "../utils/i18n";

export const useTranslation = () => {
  const {
    state: { language },
  } = useContext(DocViewerContext);

  const t = useCallback(
    (key: string, variables?: Record<string, string | number>) => {
      const translations = locales[language];
      return translations[key]
        ? mustache.render(translations[key], variables)
        : key;
    },
    [language]
  );

  return {
    t,
  };
};
