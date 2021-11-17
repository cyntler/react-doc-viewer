import { IConfig, IDocument } from "../types";
export declare const SET_ALL_DOCUMENTS: string;
export interface SetAllDocuments {
    type: typeof SET_ALL_DOCUMENTS;
    documents: IDocument[];
}
export declare const setAllDocuments: (documents: IDocument[]) => SetAllDocuments;
export declare const SET_DOCUMENT_LOADING: string;
export interface SetDocumentLoading {
    type: typeof SET_DOCUMENT_LOADING;
    value: boolean;
}
export declare const setDocumentLoading: (value: boolean) => SetDocumentLoading;
export declare const NEXT_DOCUMENT: string;
export interface NextDocument {
    type: typeof NEXT_DOCUMENT;
}
export declare const nextDocument: () => NextDocument;
export declare const PREVIOUS_DOCUMENT: string;
export interface PreviousDocument {
    type: typeof PREVIOUS_DOCUMENT;
}
export declare const previousDocument: () => PreviousDocument;
export declare const UPDATE_CURRENT_DOCUMENT: string;
export interface UpdateCurrentDocument {
    type: typeof UPDATE_CURRENT_DOCUMENT;
    document: IDocument;
}
export declare const updateCurrentDocument: (document: IDocument) => UpdateCurrentDocument;
export declare const SET_RENDERER_RECT: string;
export interface SetRendererRect {
    type: typeof SET_RENDERER_RECT;
    rect: DOMRect;
}
export declare const setRendererRect: (rect: DOMRect) => SetRendererRect;
export declare const SET_MAIN_CONFIG: string;
export interface SetMainConfig {
    type: typeof SET_MAIN_CONFIG;
    config: IConfig;
}
export declare const setMainConfig: (config: IConfig) => SetMainConfig;
export declare type MainStateActions = SetAllDocuments | SetDocumentLoading | NextDocument | PreviousDocument | UpdateCurrentDocument | SetRendererRect | SetMainConfig;
