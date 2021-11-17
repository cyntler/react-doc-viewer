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
exports.useDocumentLoader = void 0;
var react_1 = require("react");
var state_1 = require("../state");
var actions_1 = require("../state/actions");
var fileLoaders_1 = require("./fileLoaders");
var useRendererSelector_1 = require("./useRendererSelector");
/**
 * Custom Hook for loading the current document into context
 */
exports.useDocumentLoader = function () {
    var _a = react_1.useContext(state_1.DocViewerContext), state = _a.state, dispatch = _a.dispatch;
    var currentFileNo = state.currentFileNo, currentDocument = state.currentDocument;
    var CurrentRenderer = useRendererSelector_1.useRendererSelector().CurrentRenderer;
    var documentURI = (currentDocument === null || currentDocument === void 0 ? void 0 : currentDocument.uri) || "";
    react_1.useEffect(function () {
        if (!currentDocument)
            return;
        if (currentDocument.fileType !== undefined)
            return;
        var controller = new AbortController();
        var signal = controller.signal;
        fetch(documentURI, { method: "HEAD", signal: signal }).then(function (response) {
            var contentTypeRaw = response.headers.get("content-type");
            var contentTypes = (contentTypeRaw === null || contentTypeRaw === void 0 ? void 0 : contentTypeRaw.split(";")) || [];
            var contentType = contentTypes.length ? contentTypes[0] : undefined;
            dispatch(actions_1.updateCurrentDocument(__assign(__assign({}, currentDocument), { fileType: contentType || undefined })));
        });
        return function () {
            controller.abort();
        };
    }, 
    // eslint ignore added, because a warning appears for dispatch to
    // be a dependancy of the useEffect
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentFileNo, documentURI]);
    react_1.useEffect(function () {
        var _a;
        if (!currentDocument || CurrentRenderer === undefined)
            return;
        var controller = new AbortController();
        var signal = controller.signal;
        var fileLoaderComplete = function (fileReader) {
            if (!currentDocument || !fileReader) {
                dispatch(actions_1.setDocumentLoading(false));
                return;
            }
            var updatedDocument = __assign({}, currentDocument);
            if (fileReader.result !== null) {
                updatedDocument.fileData = fileReader.result;
            }
            dispatch(actions_1.updateCurrentDocument(updatedDocument));
            dispatch(actions_1.setDocumentLoading(false));
        };
        if (CurrentRenderer === null) {
            dispatch(actions_1.setDocumentLoading(false));
        }
        else if (CurrentRenderer.fileLoader !== undefined) {
            (_a = CurrentRenderer.fileLoader) === null || _a === void 0 ? void 0 : _a.call(CurrentRenderer, { documentURI: documentURI, signal: signal, fileLoaderComplete: fileLoaderComplete });
        }
        else {
            fileLoaders_1.defaultFileLoader({ documentURI: documentURI, signal: signal, fileLoaderComplete: fileLoaderComplete });
        }
        return function () {
            controller.abort();
        };
    }, [CurrentRenderer]);
    return { state: state, dispatch: dispatch, CurrentRenderer: CurrentRenderer };
};
