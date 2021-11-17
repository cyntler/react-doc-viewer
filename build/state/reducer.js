"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainStateReducer = exports.initialState = void 0;
var actions_1 = require("./actions");
exports.initialState = {
    currentFileNo: 0,
    documents: [],
    documentLoading: true,
    currentDocument: undefined,
    rendererRect: undefined,
    config: {},
    pluginRenderers: [],
};
exports.mainStateReducer = function (state, action) {
    if (state === void 0) { state = exports.initialState; }
    switch (action.type) {
        case actions_1.SET_ALL_DOCUMENTS: {
            var documents = action.documents;
            return __assign(__assign({}, state), { documents: documents, currentDocument: documents[0] || null });
        }
        case actions_1.SET_DOCUMENT_LOADING: {
            var value = action.value;
            return __assign(__assign({}, state), { documentLoading: value });
        }
        case actions_1.NEXT_DOCUMENT: {
            if (state.currentFileNo >= state.documents.length - 1)
                return state;
            var nextDocumentNo = state.currentFileNo + 1;
            return __assign(__assign({}, state), { currentFileNo: nextDocumentNo, currentDocument: state.documents[nextDocumentNo], documentLoading: true });
        }
        case actions_1.PREVIOUS_DOCUMENT: {
            if (state.currentFileNo <= 0)
                return state;
            var prevDocumentNo = state.currentFileNo - 1;
            return __assign(__assign({}, state), { currentFileNo: state.currentFileNo - 1, currentDocument: state.documents[prevDocumentNo], documentLoading: true });
        }
        case actions_1.UPDATE_CURRENT_DOCUMENT: {
            var document_1 = action.document;
            return __assign(__assign({}, state), { currentDocument: document_1 });
        }
        case actions_1.SET_RENDERER_RECT: {
            var rect = action.rect;
            return __assign(__assign({}, state), { rendererRect: rect });
        }
        case actions_1.SET_MAIN_CONFIG: {
            var config = action.config;
            return __assign(__assign({}, state), { config: config });
        }
        default:
            return state;
    }
};
