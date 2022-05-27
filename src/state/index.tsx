import React, {
  createContext,
  Dispatch,
  FC,
  useEffect,
  useReducer,
} from "react";
import { DocViewerProps } from "..";
import { IRenderSettings } from "../types"
import { RenderStateActions, setDocumentRenderSettings } from "./actions/render.actions";
import { MainStateActions, setAllDocuments, setMainConfig } from "./actions/main.actions";
import {
  IMainState,
  initialState,
  mainStateReducer,
  MainStateReducer,
} from "./reducers/main.reducers";
import { initialRenderSettingsState, renderSettingsReducer, RenderSettingsStateReducer } from "./reducers/render.reducers";

const DocViewerContext = createContext<{
  state: IMainState;
  dispatch: Dispatch<MainStateActions>;
}>({ state: initialState, dispatch: () => null });

const RenderContext = createContext<{
  state: IRenderSettings;
  dispatch: Dispatch<RenderStateActions>;
}>({ state: initialRenderSettingsState, dispatch: () => null });

const RenderProvider: FC<{ renderSettings: IRenderSettings }> = ({ children, renderSettings }) => {
  const [state, dispatch] = useReducer<RenderSettingsStateReducer>(
    renderSettingsReducer,
    {
      ...initialRenderSettingsState,
      ...renderSettings
    }
  );

  useEffect(() => {
    dispatch(setDocumentRenderSettings(renderSettings));
  }, [renderSettings])

  return (
    <RenderContext.Provider value={{ state, dispatch }}>
      {children}
    </RenderContext.Provider>
  );
}

const AppProvider: FC<Omit<DocViewerProps, "renderSettings">> = (props) => {
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

export { RenderProvider, RenderContext, DocViewerContext, AppProvider };
