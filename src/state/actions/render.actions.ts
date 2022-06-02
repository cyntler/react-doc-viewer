import { IRenderSettings } from "../../types";

export const SET_DOCUMENT_ZOOM_LEVEL: string = "SET_DOCUMENT_ZOOM_LEVEL";

export interface SetDocumentZoomLevel {
    type: typeof SET_DOCUMENT_ZOOM_LEVEL;
    value: number;
}

export const setDocumentZoomLevel = (value: number): SetDocumentZoomLevel => ({
    type: SET_DOCUMENT_ZOOM_LEVEL,
    value,
});

export const SET_DOCUMENT_PAGINATED: string = "SET_DOCUMENT_PAGINATED";

export interface SetDocumentPaginated {
    type: typeof SET_DOCUMENT_PAGINATED;
    value: boolean;
}

export const setDocumentPaginated = (value: boolean): SetDocumentPaginated => ({
    type: SET_DOCUMENT_PAGINATED,
    value,
});

export const SET_DOCUMENT_PAGES_COUNT: string = "SET_DOCUMENT_PAGES_COUNT";
export interface SetDocumentPagesCount {
    type: typeof SET_DOCUMENT_PAGES_COUNT;
    value: number;
}

export const setDocumentPagesCount = (value: number): SetDocumentPagesCount => ({
    type: SET_DOCUMENT_PAGES_COUNT,
    value,
});

export const SET_DOCUMENT_CURRENT_PAGE: string = "SET_DOCUMENT_CURRENT_PAGE";

export interface SetDocumentCurrentPage {
    type: typeof SET_DOCUMENT_CURRENT_PAGE;
    value: number;
}

export const setDocumentCurrentPage = (value: number): SetDocumentCurrentPage => ({
    type: SET_DOCUMENT_CURRENT_PAGE,
    value,
});

export const SET_DOCUMENT_ROTATION_ANGLE: string = "SET_DOCUMENT_ROTATION_ANGLE";
export interface SetDocumentRotationAngle {
    type: typeof SET_DOCUMENT_ROTATION_ANGLE;
    value: number;
}
export const setDocumentRotationAngle = (
    value: number
): SetDocumentRotationAngle => ({
    type: SET_DOCUMENT_ROTATION_ANGLE,
    value,
});

export const SET_DOCUMENT_FIT_TYPE: string = "SET_DOCUMENT_FIT_TYPE";
export interface SetDocumentFitType {
    type: typeof SET_DOCUMENT_FIT_TYPE;
    value: "width" | "height" | "page";
}

export const SET_DOCUMENT_RENDER_SETTINGS: string = "SET_DOCUMENT_RENDER_SETTINGS";
export interface SetDocumentRenderSettings {
    type: typeof SET_DOCUMENT_RENDER_SETTINGS;
    value: IRenderSettings;
}

export const setDocumentRenderSettings = (
    value: IRenderSettings,
): SetDocumentRenderSettings => ({
    type: SET_DOCUMENT_RENDER_SETTINGS,
    value,
});

export const SET_DOCUMENT_RENDER_LOADED = "SET_DOCUMENT_RENDER_LOADED";
export interface SetDocumentRenderLoaded {
    type: typeof SET_DOCUMENT_RENDER_LOADED;
    value: boolean;
}

export const setDocumentRenderLoaded = (
    value: boolean
): SetDocumentRenderLoaded => ({
    type: SET_DOCUMENT_RENDER_LOADED,
    value,
});

export type RenderStateActions =
    | SetDocumentRenderSettings
    | SetDocumentZoomLevel
    | SetDocumentPaginated
    | SetDocumentPagesCount
    | SetDocumentCurrentPage
    | SetDocumentRotationAngle
    | SetDocumentFitType
    | SetDocumentRenderLoaded;
