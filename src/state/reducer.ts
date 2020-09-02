import { DocRenderer, IConfig, IDocument } from "../types";
import {
  MainStateActions,
  NEXT_DOCUMENT,
  PREVIOUS_DOCUMENT,
  SetAllDocuments,
  SetDocumentLoading,
  SetMainConfig,
  SetRendererRect,
  SET_ALL_DOCUMENTS,
  SET_DOCUMENT_LOADING,
  SET_MAIN_CONFIG,
  SET_RENDERER_RECT,
  UpdateCurrentDocument,
  UPDATE_CURRENT_DOCUMENT,
} from "./actions";

export type IMainState = {
  currentFileNo: number;
  documents: IDocument[];
  documentLoading?: boolean;
  currentDocument?: IDocument;
  rendererRect?: DOMRect;
  config?: IConfig;
  pluginRenderers?: DocRenderer[];
};

export const initialState: IMainState = {
  currentFileNo: 0,
  documents: [],
  documentLoading: true,
  currentDocument: undefined,
  rendererRect: undefined,
  config: {},
  pluginRenderers: [],
};

export type MainStateReducer = (
  state: IMainState,
  action: MainStateActions
) => IMainState;

export const mainStateReducer: MainStateReducer = (
  state = initialState,
  action: MainStateActions
): IMainState => {
  switch (action.type) {
    case SET_ALL_DOCUMENTS: {
      const { documents } = action as SetAllDocuments;
      return { ...state, documents, currentDocument: documents[0] || null };
    }

    case SET_DOCUMENT_LOADING: {
      const { value } = action as SetDocumentLoading;
      return { ...state, documentLoading: value };
    }

    case NEXT_DOCUMENT: {
      if (state.currentFileNo >= state.documents.length - 1) return state;

      const nextDocumentNo = state.currentFileNo + 1;
      return {
        ...state,
        currentFileNo: nextDocumentNo,
        currentDocument: state.documents[nextDocumentNo],
        documentLoading: true,
      };
    }

    case PREVIOUS_DOCUMENT: {
      if (state.currentFileNo <= 0) return state;

      const prevDocumentNo = state.currentFileNo - 1;
      return {
        ...state,
        currentFileNo: state.currentFileNo - 1,
        currentDocument: state.documents[prevDocumentNo],
        documentLoading: true,
      };
    }

    case UPDATE_CURRENT_DOCUMENT: {
      const { document } = action as UpdateCurrentDocument;
      return {
        ...state,
        currentDocument: document,
      };
    }

    case SET_RENDERER_RECT: {
      const { rect } = action as SetRendererRect;
      return {
        ...state,
        rendererRect: rect,
      };
    }

    case SET_MAIN_CONFIG: {
      const { config } = action as SetMainConfig;
      return {
        ...state,
        config,
      };
    }

    default:
      return state;
  }
};
