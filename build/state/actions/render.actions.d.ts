import { IRenderSettings } from "../../types";
export declare const SET_DOCUMENT_ZOOM_LEVEL: string;
export interface SetDocumentZoomLevel {
    type: typeof SET_DOCUMENT_ZOOM_LEVEL;
    value: number;
}
export declare const setDocumentZoomLevel: (value: number) => SetDocumentZoomLevel;
export declare const SET_DOCUMENT_PAGINATED: string;
export interface SetDocumentPaginated {
    type: typeof SET_DOCUMENT_PAGINATED;
    value: boolean;
}
export declare const setDocumentPaginated: (value: boolean) => SetDocumentPaginated;
export declare const SET_DOCUMENT_PAGES_COUNT: string;
export interface SetDocumentPagesCount {
    type: typeof SET_DOCUMENT_PAGES_COUNT;
    value: number;
}
export declare const setDocumentPagesCount: (value: number) => SetDocumentPagesCount;
export declare const SET_DOCUMENT_CURRENT_PAGE: string;
export interface SetDocumentCurrentPage {
    type: typeof SET_DOCUMENT_CURRENT_PAGE;
    value: number;
}
export declare const setDocumentCurrentPage: (value: number) => SetDocumentCurrentPage;
export declare const SET_DOCUMENT_ROTATION_ANGLE: string;
export interface SetDocumentRotationAngle {
    type: typeof SET_DOCUMENT_ROTATION_ANGLE;
    value: number;
}
export declare const setDocumentRotationAngle: (value: number) => SetDocumentRotationAngle;
export declare const SET_DOCUMENT_FIT_TYPE: string;
export interface SetDocumentFitType {
    type: typeof SET_DOCUMENT_FIT_TYPE;
    value: "width" | "height" | "page";
}
export declare const SET_DOCUMENT_RENDER_SETTINGS: string;
export interface SetDocumentRenderSettings {
    type: typeof SET_DOCUMENT_RENDER_SETTINGS;
    value: IRenderSettings;
}
export declare const setDocumentRenderSettings: (value: IRenderSettings) => SetDocumentRenderSettings;
export declare const SET_DOCUMENT_RENDER_LOADED = "SET_DOCUMENT_RENDER_LOADED";
export interface SetDocumentRenderLoaded {
    type: typeof SET_DOCUMENT_RENDER_LOADED;
    value: boolean;
}
export declare const setDocumentRenderLoaded: (value: boolean) => SetDocumentRenderLoaded;
export declare type RenderStateActions = SetDocumentRenderSettings | SetDocumentZoomLevel | SetDocumentPaginated | SetDocumentPagesCount | SetDocumentCurrentPage | SetDocumentRotationAngle | SetDocumentFitType | SetDocumentRenderLoaded;
