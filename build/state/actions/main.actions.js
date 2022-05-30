export var SET_ALL_DOCUMENTS = "SET_ALL_DOCUMENTS";
export var setAllDocuments = function (documents) { return ({
    type: SET_ALL_DOCUMENTS,
    documents: documents,
}); };
export var SET_DOCUMENT_LOADING = "SET_DOCUMENT_LOADING";
export var setDocumentLoading = function (value) { return ({
    type: SET_DOCUMENT_LOADING,
    value: value,
}); };
export var NEXT_DOCUMENT = "NEXT_DOCUMENT";
export var nextDocument = function () { return ({ type: NEXT_DOCUMENT }); };
export var PREVIOUS_DOCUMENT = "PREVIOUS_DOCUMENT";
export var previousDocument = function () { return ({
    type: PREVIOUS_DOCUMENT,
}); };
export var UPDATE_CURRENT_DOCUMENT = "UPDATE_CURRENT_DOCUMENT";
export var updateCurrentDocument = function (document) { return ({ type: UPDATE_CURRENT_DOCUMENT, document: document }); };
export var SET_RENDERER_RECT = "SET_RENDERER_RECT";
export var setRendererRect = function (rect) { return ({
    type: SET_RENDERER_RECT,
    rect: rect,
}); };
export var SET_MAIN_CONFIG = "SET_MAIN_CONFIG";
export var setMainConfig = function (config) { return ({
    type: SET_MAIN_CONFIG,
    config: config,
}); };
