import { IRenderSettings } from "../../types";
import { RenderStateActions, SetDocumentCurrentPage, SetDocumentFitType, SetDocumentPagesCount, SetDocumentPaginated, SetDocumentRenderLoaded, SetDocumentRenderSettings, SetDocumentRotationAngle, SetDocumentZoomLevel, SET_DOCUMENT_CURRENT_PAGE, SET_DOCUMENT_FIT_TYPE, SET_DOCUMENT_PAGES_COUNT, SET_DOCUMENT_PAGINATED, SET_DOCUMENT_RENDER_LOADED, SET_DOCUMENT_RENDER_SETTINGS, SET_DOCUMENT_ROTATION_ANGLE, SET_DOCUMENT_ZOOM_LEVEL } from "../actions/render.actions";

export const initialRenderSettingsState: IRenderSettings = {
    loaded: false,
    zoomLevel: 1,
    paginated: true,
    pagesCount: 0,
    currentPage: 1,
    rotationAngle: 0,
    fitType: "width",
};

export type RenderSettingsStateReducer = (
    state: IRenderSettings,
    action: RenderStateActions
) => IRenderSettings;

export const renderSettingsReducer: RenderSettingsStateReducer = (
    state: IRenderSettings = initialRenderSettingsState,
    action: RenderStateActions
): IRenderSettings => {
    switch (action.type) {
        case SET_DOCUMENT_ZOOM_LEVEL: {
            const { value } = action as SetDocumentZoomLevel;
            return {
                ...state,
                zoomLevel: value,
            };
        }
        case SET_DOCUMENT_PAGINATED: {
            const { value } = action as SetDocumentPaginated;
            return {
                ...state,
                paginated: value,
            };
        }
        case SET_DOCUMENT_CURRENT_PAGE: {
            const { value } = action as SetDocumentCurrentPage;
            return {
                ...state,
                currentPage: value,
            };
        }
        case SET_DOCUMENT_PAGES_COUNT: {
            const { value } = action as SetDocumentPagesCount;
            return {
                ...state,
                pagesCount: value,
            };
        }
        case SET_DOCUMENT_ROTATION_ANGLE: {
            const { value } = action as SetDocumentRotationAngle;
            return {
                ...state,
                rotationAngle: value,
            };
        }
        case SET_DOCUMENT_FIT_TYPE: {
            const { value } = action as SetDocumentFitType;
            return {
                ...state,
                fitType: value,
            };
        }

        case SET_DOCUMENT_RENDER_SETTINGS: {
            const { value } = action as SetDocumentRenderSettings;
            return {
                ...state,
                ...value,
            };
        }

        case SET_DOCUMENT_RENDER_LOADED: {
            const { value } = action as SetDocumentRenderLoaded;
            return {
                ...state,
                loaded: value,
            };
        }

        default:
            return state;
    }
}