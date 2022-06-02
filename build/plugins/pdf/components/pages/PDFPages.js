var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
/* eslint-disable */
import React, { useContext, useEffect, useState } from "react";
import { Document } from "react-pdf";
import styled from "styled-components";
import { DocViewerContext, RenderContext } from "../../../../state";
import { setDocumentCurrentPage, setDocumentPagesCount, setDocumentRenderLoaded } from "../../../../state/actions/render.actions";
import { initialRenderSettingsState } from "../../../../state/reducers/render.reducers";
import { emitEvent } from "../../../../utils/events";
import getVisiblePageIndex from "../../../../utils/getVisiblePageIndex";
import { PDFAllPages } from "./PDFAllPages";
var DOCUMENT_PAGES_MARGIN = 8;
var PDFPages = function () {
    var currentDocument = useContext(DocViewerContext).state.currentDocument;
    var _a = useContext(RenderContext), renderSettings = _a.state, dispatch = _a.dispatch;
    var _b = useState(0), loadedPageCount = _b[0], setLoadedPageCount = _b[1];
    var scrollElement = document.querySelector("#pdf-renderer");
    var canvas = document.querySelector("#pdf-page-wrapper canvas");
    // Scrolling to the current page and setting the current page by the visible page index
    useEffect(function () {
        if (!scrollElement || !canvas)
            return;
        var currentPageIndex = getVisiblePageIndex({
            scrollElement: scrollElement,
            pageHeight: canvas.clientHeight,
            pageMargin: DOCUMENT_PAGES_MARGIN,
            pagesCount: renderSettings.pagesCount
        });
        if (currentPageIndex + 1 !== renderSettings.currentPage) {
            scrollElement.scrollTo({
                left: 0,
                top: (renderSettings.currentPage - 1) * canvas.clientHeight + DOCUMENT_PAGES_MARGIN * renderSettings.pagesCount
            });
        }
        var endScrollTimerId = null;
        var onScrollEnd = function () {
            if (canvas) {
                var currentPageIndex_1 = getVisiblePageIndex({
                    scrollElement: scrollElement,
                    pageHeight: canvas.clientHeight,
                    pageMargin: DOCUMENT_PAGES_MARGIN,
                    pagesCount: renderSettings.pagesCount
                });
                if (currentPageIndex_1 === -1)
                    return;
                var currentPage = currentPageIndex_1 + 1;
                dispatch(setDocumentCurrentPage(currentPage > renderSettings.pagesCount ? renderSettings.pagesCount : currentPage));
            }
            ;
        };
        var onScroll = function () {
            if (endScrollTimerId) {
                clearTimeout(endScrollTimerId);
            }
            endScrollTimerId = setTimeout(onScrollEnd, 100);
        };
        scrollElement.onscroll = onScroll;
    }, [canvas, scrollElement, renderSettings.currentPage]);
    // Reset the render settings after the document is changed
    useEffect(function () {
        dispatch(setDocumentPagesCount(initialRenderSettingsState.pagesCount));
        setLoadedPageCount(0);
    }, [currentDocument]);
    // Set the loaded page count
    useEffect(function () {
        if (loadedPageCount !== renderSettings.pagesCount)
            return;
        var elements = Array.from(document.querySelectorAll("#pdf-page-wrapper canvas"));
        var payload = elements.map(function (el, index) { return ({
            index: index,
            imageURL: el.toDataURL()
        }); });
        emitEvent("onPaginationDocumentLoaded", payload);
    }, [loadedPageCount]);
    if (!currentDocument || (currentDocument === null || currentDocument === void 0 ? void 0 : currentDocument.fileData) === undefined)
        return null;
    return (React.createElement(DocumentPDF, { file: currentDocument.fileData, onLoadSuccess: function (payload) {
            dispatch(setDocumentPagesCount(payload.numPages));
            dispatch(setDocumentRenderLoaded(true));
        }, loading: React.createElement("span", null, "Loading...") },
        React.createElement("div", { className: "document-content" },
            React.createElement(PDFAllPages, { onRendered: function () { return setLoadedPageCount(loadedPageCount + 1); } }))));
};
var DocumentPDF = styled(Document)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 100%;\n  display: flex;\n\n  .document-content { \n    display: flex;\n    flex-direction: column;\n    margin: 0 auto;\n    gap: ", "px;\n  }\n"], ["\n  width: 100%;\n  display: flex;\n\n  .document-content { \n    display: flex;\n    flex-direction: column;\n    margin: 0 auto;\n    gap: ", "px;\n  }\n"])), DOCUMENT_PAGES_MARGIN);
export default PDFPages;
var templateObject_1;
