import { useCallback, useContext } from "react";
import mustache from "mustache";
import { DocViewerContext } from "../store/DocViewerProvider";
import { defaultLanguage, locales } from "../i18n";

export const useTranslation = () => {
  const {
    state: { language },
  } = useContext(DocViewerContext);

  const defaultTranslations = locales[defaultLanguage];

  const t = useCallback(
    (
      key: keyof typeof defaultTranslations,
      variables?: Record<string, string | number>,
    ) => {
      const translations = locales[language];

      if (translations[key]) {
        return mustache.render(translations[key], variables);
      }

      if (defaultTranslations[key]) {
        return mustache.render(defaultTranslations[key], variables);
      }

      return key;
    },
    [language, defaultTranslations],
  );

  return {
    t,
  };
};
