import React, {
  createContext,
  Dispatch,
  FC,
  useEffect,
  useReducer,
  PropsWithChildren,
} from "react";
import { DocViewerProps } from "../DocViewer";
import { defaultLanguage, locales } from "../i18n";
import {
  MainStateActions,
  setAllDocuments,
  setMainConfig,
  updateCurrentDocument,
} from "./actions";
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
    activeDocument,
    onDocumentChange,
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
    activeDocument,
    onDocumentChange,
  });

  useEffect(() => {
    dispatch(setAllDocuments(documents, initialActiveDocument));
    config && dispatch(setMainConfig(config));
  }, [documents, config, initialActiveDocument]);

  useEffect(() => {
    if (activeDocument) {
      dispatch(updateCurrentDocument(activeDocument));
    }
  }, [activeDocument]);

  return (
    <DocViewerContext.Provider value={{ state, dispatch }}>
      {children}
    </DocViewerContext.Provider>
  );
};

export { DocViewerContext, DocViewerProvider };
