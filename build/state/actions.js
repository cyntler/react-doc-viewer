"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setMainConfig = exports.SET_MAIN_CONFIG = exports.setRendererRect = exports.SET_RENDERER_RECT = exports.updateCurrentDocument = exports.UPDATE_CURRENT_DOCUMENT = exports.previousDocument = exports.PREVIOUS_DOCUMENT = exports.nextDocument = exports.NEXT_DOCUMENT = exports.setDocumentLoading = exports.SET_DOCUMENT_LOADING = exports.setAllDocuments = exports.SET_ALL_DOCUMENTS = void 0;
// SET_DOCUMENTS
exports.SET_ALL_DOCUMENTS = "SET_ALL_DOCUMENTS";
exports.setAllDocuments = function (documents) { return ({
    type: exports.SET_ALL_DOCUMENTS,
    documents: documents,
}); };
// SET_DOCUMENT_LOADING
exports.SET_DOCUMENT_LOADING = "SET_DOCUMENT_LOADING";
exports.setDocumentLoading = function (value) { return ({
    type: exports.SET_DOCUMENT_LOADING,
    value: value,
}); };
// NEXT_DOCUMENT
exports.NEXT_DOCUMENT = "NEXT_DOCUMENT";
exports.nextDocument = function () { return ({ type: exports.NEXT_DOCUMENT }); };
// PREVIOUS_DOCUMENT
exports.PREVIOUS_DOCUMENT = "PREVIOUS_DOCUMENT";
exports.previousDocument = function () { return ({
    type: exports.PREVIOUS_DOCUMENT,
}); };
// UPDATE_CURRENT_DOCUMENT
exports.UPDATE_CURRENT_DOCUMENT = "UPDATE_CURRENT_DOCUMENT";
exports.updateCurrentDocument = function (document) { return ({ type: exports.UPDATE_CURRENT_DOCUMENT, document: document }); };
// SET_RENDERER_RECT
exports.SET_RENDERER_RECT = "SET_RENDERER_RECT";
exports.setRendererRect = function (rect) { return ({
    type: exports.SET_RENDERER_RECT,
    rect: rect,
}); };
// SET_MAIN_CONFIG
exports.SET_MAIN_CONFIG = "SET_MAIN_CONFIG";
exports.setMainConfig = function (config) { return ({
    type: exports.SET_MAIN_CONFIG,
    config: config,
}); };
