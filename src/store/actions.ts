import { IConfig, IDocument } from "../models";

export const SET_ALL_DOCUMENTS = "SET_ALL_DOCUMENTS";
export const SET_DOCUMENT_LOADING = "SET_DOCUMENT_LOADING";
export const NEXT_DOCUMENT = "NEXT_DOCUMENT";
export const PREVIOUS_DOCUMENT = "PREVIOUS_DOCUMENT";
export const UPDATE_CURRENT_DOCUMENT = "UPDATE_CURRENT_DOCUMENT";
export const SET_RENDERER_RECT = "SET_RENDERER_RECT";
export const SET_MAIN_CONFIG = "SET_MAIN_CONFIG";

export interface SetAllDocuments {
  type: typeof SET_ALL_DOCUMENTS;
  documents: IDocument[];
  initialActiveDocument?: IDocument;
}

export interface SetDocumentLoading {
  type: typeof SET_DOCUMENT_LOADING;
  value: boolean;
}

export interface SetRendererRect {
  type: typeof SET_RENDERER_RECT;
  rect: DOMRect;
}

export interface SetMainConfig {
  type: typeof SET_MAIN_CONFIG;
  config: IConfig;
}

export interface NextDocument {
  type: typeof NEXT_DOCUMENT;
}

export interface UpdateCurrentDocument {
  type: typeof UPDATE_CURRENT_DOCUMENT;
  document: IDocument;
}

export interface PreviousDocument {
  type: typeof PREVIOUS_DOCUMENT;
}

export const setAllDocuments = (
  documents: IDocument[],
  initialActiveDocument?: IDocument,
): SetAllDocuments => ({
  type: SET_ALL_DOCUMENTS,
  documents,
  initialActiveDocument,
});

export const setDocumentLoading = (value: boolean): SetDocumentLoading => ({
  type: SET_DOCUMENT_LOADING,
  value,
});

export const nextDocument = (): NextDocument => ({ type: NEXT_DOCUMENT });

export const previousDocument = (): PreviousDocument => ({
  type: PREVIOUS_DOCUMENT,
});

export const updateCurrentDocument = (
  document: IDocument,
): UpdateCurrentDocument => ({ type: UPDATE_CURRENT_DOCUMENT, document });

export const setRendererRect = (rect: DOMRect): SetRendererRect => ({
  type: SET_RENDERER_RECT,
  rect,
});

export const setMainConfig = (config: IConfig): SetMainConfig => ({
  type: SET_MAIN_CONFIG,
  config,
});

export type MainStateActions =
  | SetAllDocuments
  | SetDocumentLoading
  | NextDocument
  | PreviousDocument
  | UpdateCurrentDocument
  | SetRendererRect
  | SetMainConfig;
