import { IConfig, IDocument } from '../models';

export declare const SET_ALL_DOCUMENTS = "SET_ALL_DOCUMENTS";
export declare const SET_DOCUMENT_LOADING = "SET_DOCUMENT_LOADING";
export declare const NEXT_DOCUMENT = "NEXT_DOCUMENT";
export declare const PREVIOUS_DOCUMENT = "PREVIOUS_DOCUMENT";
export declare const UPDATE_CURRENT_DOCUMENT = "UPDATE_CURRENT_DOCUMENT";
export declare const SET_RENDERER_RECT = "SET_RENDERER_RECT";
export declare const SET_MAIN_CONFIG = "SET_MAIN_CONFIG";
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
export declare const setAllDocuments: (documents: IDocument[], initialActiveDocument?: IDocument) => SetAllDocuments;
export declare const setDocumentLoading: (value: boolean) => SetDocumentLoading;
export declare const nextDocument: () => NextDocument;
export declare const previousDocument: () => PreviousDocument;
export declare const updateCurrentDocument: (document: IDocument) => UpdateCurrentDocument;
export declare const setRendererRect: (rect: DOMRect) => SetRendererRect;
export declare const setMainConfig: (config: IConfig) => SetMainConfig;
export type MainStateActions = SetAllDocuments | SetDocumentLoading | NextDocument | PreviousDocument | UpdateCurrentDocument | SetRendererRect | SetMainConfig;
