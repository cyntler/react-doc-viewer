import React, {
  createContext,
  Dispatch,
  FC,
  useEffect,
  useReducer,
  PropsWithChildren,
} from "react";
import { DocViewerProps } from "../";
import { defaultLanguage, locales } from "../utils/i18n";
import { MainStateActions, setAllDocuments, setMainConfig } from "./actions";
import {
  IMainState,
  initialState,
  mainStateReducer,
  MainStateReducer,
} from "./mainStateReducer";

const DocViewerContext = createContext<{
  state: IMainState;
  dispatch: Dispatch<MainStateActions>;
}>({ state: initialState, dispatch: () => null });

const DocViewerProvider: FC<PropsWithChildren<DocViewerProps>> = (props) => {
  const {
    children,
    documents,
    config,
    pluginRenderers,
    prefetchMethod,
    requestHeaders,
    initialActiveDocument,
    language,
  } = props;

  const [state, dispatch] = useReducer<MainStateReducer>(mainStateReducer, {
    ...initialState,
    documents: documents || [],
    currentDocument:
      documents && documents.length
        ? initialActiveDocument
          ? initialActiveDocument
          : documents[0]
        : undefined,
    config,
    pluginRenderers,
    prefetchMethod,
    requestHeaders,
    currentFileNo: initialActiveDocument
      ? documents.findIndex((doc) => doc === initialActiveDocument) ?? 0
      : 0,
    language: language && locales[language] ? language : defaultLanguage,
  });

  useEffect(() => {
    dispatch(setAllDocuments(documents, initialActiveDocument));
    config && dispatch(setMainConfig(config));
  }, [documents, config, initialActiveDocument]);

  return (
    <DocViewerContext.Provider value={{ state, dispatch }}>
      {children}
    </DocViewerContext.Provider>
  );
};

export { DocViewerContext, DocViewerProvider };
