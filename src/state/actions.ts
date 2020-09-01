import { IConfig, IDocument } from "../types";

// SET_DOCUMENTS
export const SET_ALL_DOCUMENTS: string = "SET_ALL_DOCUMENTS";
export interface SetAllDocuments {
  type: typeof SET_ALL_DOCUMENTS;
  documents: IDocument[];
}
export const setAllDocuments = (documents: IDocument[]): SetAllDocuments => ({
  type: SET_ALL_DOCUMENTS,
  documents,
});

// SET_DOCUMENT_LOADING
export const SET_DOCUMENT_LOADING: string = "SET_DOCUMENT_LOADING";
export interface SetDocumentLoading {
  type: typeof SET_DOCUMENT_LOADING;
  value: boolean;
}
export const setDocumentLoading = (value: boolean): SetDocumentLoading => ({
  type: SET_DOCUMENT_LOADING,
  value,
});

// NEXT_DOCUMENT
export const NEXT_DOCUMENT: string = "NEXT_DOCUMENT";
export interface NextDocument {
  type: typeof NEXT_DOCUMENT;
}
export const nextDocument = (): NextDocument => ({ type: NEXT_DOCUMENT });

// PREVIOUS_DOCUMENT
export const PREVIOUS_DOCUMENT: string = "PREVIOUS_DOCUMENT";
export interface PreviousDocument {
  type: typeof PREVIOUS_DOCUMENT;
}
export const previousDocument = (): PreviousDocument => ({
  type: PREVIOUS_DOCUMENT,
});

// UPDATE_CURRENT_DOCUMENT
export const UPDATE_CURRENT_DOCUMENT: string = "UPDATE_CURRENT_DOCUMENT";
export interface UpdateCurrentDocument {
  type: typeof UPDATE_CURRENT_DOCUMENT;
  document: IDocument;
}
export const updateCurrentDocument = (
  document: IDocument
): UpdateCurrentDocument => ({ type: UPDATE_CURRENT_DOCUMENT, document });

// SET_RENDERER_RECT
export const SET_RENDERER_RECT: string = "SET_RENDERER_RECT";
export interface SetRendererRect {
  type: typeof SET_RENDERER_RECT;
  rect: DOMRect;
}
export const setRendererRect = (rect: DOMRect): SetRendererRect => ({
  type: SET_RENDERER_RECT,
  rect,
});

// SET_MAIN_CONFIG
export const SET_MAIN_CONFIG: string = "SET_MAIN_CONFIG";
export interface SetMainConfig {
  type: typeof SET_MAIN_CONFIG;
  config: IConfig;
}
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
