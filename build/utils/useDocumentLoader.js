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
import { useContext, useEffect } from "react";
import { DocViewerContext } from "../state";
import { setDocumentLoading, updateCurrentDocument, } from "../state/actions/main.actions";
import { defaultFileLoader } from "./fileLoaders";
import { useRendererSelector } from "./useRendererSelector";
/**
 * Custom Hook for loading the current document into context
 */
export var useDocumentLoader = function () {
    var _a = useContext(DocViewerContext), state = _a.state, dispatch = _a.dispatch;
    var currentFileNo = state.currentFileNo, currentDocument = state.currentDocument, prefetchMethod = state.prefetchMethod;
    var CurrentRenderer = useRendererSelector().CurrentRenderer;
    var documentURI = (currentDocument === null || currentDocument === void 0 ? void 0 : currentDocument.uri) || "";
    useEffect(function () {
        if (!currentDocument)
            return;
        if (currentDocument.fileType !== undefined)
            return;
        var controller = new AbortController();
        var signal = controller.signal;
        fetch(documentURI, { method: prefetchMethod || "HEAD", signal: signal }).then(function (response) {
            var contentTypeRaw = response.headers.get("content-type");
            var contentTypes = (contentTypeRaw === null || contentTypeRaw === void 0 ? void 0 : contentTypeRaw.split(";")) || [];
            var contentType = contentTypes.length ? contentTypes[0] : undefined;
            dispatch(updateCurrentDocument(__assign(__assign({}, currentDocument), { fileType: contentType || undefined })));
        });
        return function () {
            controller.abort();
        };
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentFileNo, documentURI]);
    useEffect(function () {
        var _a;
        if (!currentDocument || CurrentRenderer === undefined)
            return;
        var controller = new AbortController();
        var signal = controller.signal;
        var fileLoaderComplete = function (fileReader) {
            if (!currentDocument || !fileReader) {
                dispatch(setDocumentLoading(false));
                return;
            }
            var updatedDocument = __assign({}, currentDocument);
            if (fileReader.result !== null) {
                updatedDocument.fileData = fileReader.result;
            }
            dispatch(updateCurrentDocument(updatedDocument));
            dispatch(setDocumentLoading(false));
        };
        if (CurrentRenderer === null) {
            dispatch(setDocumentLoading(false));
        }
        else if (CurrentRenderer.fileLoader !== undefined) {
            (_a = CurrentRenderer.fileLoader) === null || _a === void 0 ? void 0 : _a.call(CurrentRenderer, { documentURI: documentURI, signal: signal, fileLoaderComplete: fileLoaderComplete });
        }
        else {
            defaultFileLoader({ documentURI: documentURI, signal: signal, fileLoaderComplete: fileLoaderComplete });
        }
        return function () {
            controller.abort();
        };
        /* eslint-disable react-hooks/exhaustive-deps */
    }, [CurrentRenderer, currentFileNo]);
    return { state: state, dispatch: dispatch, CurrentRenderer: CurrentRenderer };
};
