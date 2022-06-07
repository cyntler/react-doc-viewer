import React, {
  createContext,
  Dispatch,
  FC,
  useEffect,
  useReducer,
  PropsWithChildren,
} from "react";
import { DocViewerProps } from "..";
import { MainStateActions, setAllDocuments, setMainConfig } from "./actions";
import {
  IMainState,
  initialState,
  mainStateReducer,
  MainStateReducer,
} from "./reducer";

const DocViewerContext = createContext<{
  state: IMainState;
  dispatch: Dispatch<MainStateActions>;
}>({ state: initialState, dispatch: () => null });

const AppProvider: FC<PropsWithChildren<DocViewerProps>> = (props) => {
  const { children, documents, config, pluginRenderers, prefetchMethod } =
    props;

  const [state, dispatch] = useReducer<MainStateReducer>(mainStateReducer, {
    ...initialState,
    documents: documents || [],
    currentDocument: documents && documents.length ? documents[0] : undefined,
    config,
    pluginRenderers,
    prefetchMethod,
  });

  useEffect(() => {
    dispatch(setAllDocuments(documents));
    config && dispatch(setMainConfig(config));
  }, [documents, config]);

  return (
    <DocViewerContext.Provider value={{ state, dispatch }}>
      {children}
    </DocViewerContext.Provider>
  );
};

export { DocViewerContext, AppProvider };
