var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
/* eslint-disable */
import React, { useContext, useEffect } from "react";
import { Document } from "react-pdf";
import styled from "styled-components";
import { DocViewerContext, RenderContext } from "../../../../state";
import { setDocumentPagesCount } from "../../../../state/actions/render.actions";
import { initialRenderSettingsState } from "../../../../state/reducers/render.reducers";
import onLoadCallback from "../../../../utils/onLoadCallback";
import { PDFAllPages } from "./PDFAllPages";
import PDFSinglePage from "./PDFSinglePage";
var PDFPages = function () {
    var currentDocument = useContext(DocViewerContext).state.currentDocument;
    var _a = useContext(RenderContext), paginated = _a.state.paginated, dispatch = _a.dispatch;
    var callback = onLoadCallback();
    useEffect(function () {
        dispatch(setDocumentPagesCount(initialRenderSettingsState.pagesCount));
    }, [currentDocument]);
    if (!currentDocument || (currentDocument === null || currentDocument === void 0 ? void 0 : currentDocument.fileData) === undefined)
        return null;
    return (React.createElement(DocumentPDF, { file: currentDocument.fileData, onLoadSuccess: function (payload) {
            dispatch(setDocumentPagesCount(payload.numPages));
            callback(payload);
        }, loading: React.createElement("span", null, "Loading...") }, paginated ? React.createElement(PDFSinglePage, null) : React.createElement(PDFAllPages, null)));
};
var DocumentPDF = styled(Document)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  margin: 0 auto;\n"], ["\n  display: flex;\n  flex-direction: column;\n  margin: 0 auto;\n"])));
export default PDFPages;
var templateObject_1;
