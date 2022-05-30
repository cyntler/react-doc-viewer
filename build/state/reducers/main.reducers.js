var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { NEXT_DOCUMENT, PREVIOUS_DOCUMENT, SET_ALL_DOCUMENTS, SET_DOCUMENT_LOADING, SET_MAIN_CONFIG, SET_RENDERER_RECT, UPDATE_CURRENT_DOCUMENT, } from "../actions/main.actions";
export var initialState = {
    currentFileNo: 0,
    documents: [],
    documentLoading: true,
    currentDocument: undefined,
    rendererRect: undefined,
    config: {},
    pluginRenderers: [],
};
export var mainStateReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case SET_ALL_DOCUMENTS: {
            var documents = action.documents;
            return __assign(__assign({}, state), { documents: documents, currentDocument: documents[0] || null });
        }
        case SET_DOCUMENT_LOADING: {
            var value = action.value;
            return __assign(__assign({}, state), { documentLoading: value });
        }
        case NEXT_DOCUMENT: {
            if (state.currentFileNo >= state.documents.length - 1)
                return state;
            var nextDocumentNo = state.currentFileNo + 1;
            return __assign(__assign({}, state), { currentFileNo: nextDocumentNo, currentDocument: state.documents[nextDocumentNo], documentLoading: true });
        }
        case PREVIOUS_DOCUMENT: {
            if (state.currentFileNo <= 0)
                return state;
            var prevDocumentNo = state.currentFileNo - 1;
            return __assign(__assign({}, state), { currentFileNo: state.currentFileNo - 1, currentDocument: state.documents[prevDocumentNo], documentLoading: true });
        }
        case UPDATE_CURRENT_DOCUMENT: {
            var document_1 = action.document;
            return __assign(__assign({}, state), { currentDocument: document_1 });
        }
        case SET_RENDERER_RECT: {
            var rect = action.rect;
            return __assign(__assign({}, state), { rendererRect: rect });
        }
        case SET_MAIN_CONFIG: {
            var config = action.config;
            return __assign(__assign({}, state), { config: config });
        }
        default:
            return state;
    }
};
