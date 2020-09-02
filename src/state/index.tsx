import React, {
  createContext,
  Dispatch,
  FC,
  useEffect,
  useReducer,
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

const AppProvider: FC<DocViewerProps> = (props) => {
  const { children, documents, config, pluginRenderers } = props;

  const [state, dispatch] = useReducer<MainStateReducer>(mainStateReducer, {
    ...initialState,
    documents: documents || [],
    currentDocument: documents && documents.length ? documents[0] : undefined,
    config,
    pluginRenderers,
  });

  // On inital load, and whenever they change,
  // replace documents with the new props passed in
  useEffect(() => {
    dispatch(setAllDocuments(documents));
    config && dispatch(setMainConfig(config));
  }, [documents]);

  return (
    <DocViewerContext.Provider value={{ state, dispatch }}>
      {children}
    </DocViewerContext.Provider>
  );
};

export { DocViewerContext, AppProvider };
