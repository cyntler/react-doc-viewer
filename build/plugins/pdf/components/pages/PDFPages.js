var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable consistent-return */
import React, { useContext, useEffect, useState } from "react";
import { Document } from "react-pdf";
import styled from "styled-components";
import { DocViewerContext, RenderContext } from "../../../../state";
import { setDocumentCurrentPage, setDocumentPagesCount, setDocumentRenderSettings, } from "../../../../state/actions/render.actions";
import { initialRenderSettingsState } from "../../../../state/reducers/render.reducers";
import { createEvent, emitEvent } from "../../../../utils/events";
import getVisibleIndexRangeByParent from "../../../../utils/getVisibleIndexRangeByParent";
import getVisiblePageIndex from "../../../../utils/getVisiblePageIndex";
import makeScrollListener from "../../../../utils/makeScrollListener";
import { PDFAllPages } from "./PDFAllPages";
var DOCUMENT_PAGES_MARGIN = 8;
var DocumentPDF = styled(Document)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 100%;\n  display: flex;\n\n  .document-content {\n    display: flex;\n    flex-direction: column;\n    margin: 0 auto;\n    gap: ", "px;\n  }\n"], ["\n  width: 100%;\n  display: flex;\n\n  .document-content {\n    display: flex;\n    flex-direction: column;\n    margin: 0 auto;\n    gap: ", "px;\n  }\n"])), DOCUMENT_PAGES_MARGIN);
var PDFPages = function () {
    var currentDocument = useContext(DocViewerContext).state.currentDocument;
    var _a = useContext(RenderContext), renderSettings = _a.state, dispatch = _a.dispatch;
    var _b = useState(null), pageDimension = _b[0], setPageDimension = _b[1];
    var _c = useState([
        { min: 0, max: 5, main: true },
    ]), requestPagesRange = _c[0], setRequestPagesRange = _c[1];
    var scrollElement = document.querySelector("#pdf-renderer");
    useEffect(function () {
        if (!scrollElement || !pageDimension)
            return;
        var clearScrollListener = makeScrollListener(scrollElement, function () { }, function () {
            var currentPageIndex = getVisiblePageIndex({
                scrollElement: scrollElement,
                pageHeight: pageDimension.height * renderSettings.zoomLevel,
                pageMargin: DOCUMENT_PAGES_MARGIN,
                pagesCount: renderSettings.pagesCount,
            });
            if (currentPageIndex !== -1 &&
                currentPageIndex + 1 !== renderSettings.currentPage) {
                var currentPage = currentPageIndex + 1;
                dispatch(setDocumentCurrentPage(currentPage > renderSettings.pagesCount
                    ? renderSettings.pagesCount
                    : currentPage));
            }
            var visibleRange = getVisibleIndexRangeByParent(scrollElement, {
                width: pageDimension.width * renderSettings.zoomLevel,
                height: pageDimension.height * renderSettings.zoomLevel,
            });
            var alreadyExists = requestPagesRange.find(function (range) {
                return range.min <= visibleRange.min && range.max >= visibleRange.max;
            });
            if (!alreadyExists) {
                setRequestPagesRange(requestPagesRange.map(function (requestRange) {
                    return requestRange.main ? __assign({ main: true }, visibleRange) : requestRange;
                }));
            }
        }, 200);
        var deleteRequestRangeListener = createEvent("onPageRequestRange", function (visibleRange) {
            var alreadyExists = requestPagesRange.find(function (range) {
                return range.min <= visibleRange.min && range.max >= visibleRange.max;
            });
            if (!alreadyExists) {
                setRequestPagesRange(__spreadArrays(requestPagesRange.filter(function (a) { return a.main; }), [
                    visibleRange,
                ]));
            }
        });
        return function () {
            deleteRequestRangeListener();
            clearScrollListener();
        };
    }, [
        scrollElement,
        pageDimension,
        requestPagesRange,
        renderSettings.currentPage,
        renderSettings.zoomLevel,
    ]);
    // Scrolling to the current page and setting the current page by the visible page index
    useEffect(function () {
        if (!scrollElement || !pageDimension)
            return;
        var pageHeight = pageDimension.height * renderSettings.zoomLevel;
        var currentPageIndex = getVisiblePageIndex({
            scrollElement: scrollElement,
            pageHeight: pageHeight,
            pageMargin: DOCUMENT_PAGES_MARGIN,
            pagesCount: renderSettings.pagesCount,
        });
        if (currentPageIndex + 1 !== renderSettings.currentPage) {
            scrollElement.scrollTo({
                left: 0,
                top: (renderSettings.currentPage - 1) * pageHeight + DOCUMENT_PAGES_MARGIN,
            });
        }
    }, [
        pageDimension,
        scrollElement,
        renderSettings.currentPage,
        renderSettings.pagesCount,
    ]);
    useEffect(function () {
        dispatch(setDocumentPagesCount(initialRenderSettingsState.pagesCount));
    }, [currentDocument]);
    if (!currentDocument || (currentDocument === null || currentDocument === void 0 ? void 0 : currentDocument.fileData) === undefined)
        return React.createElement(React.Fragment, null);
    return (React.createElement(DocumentPDF, { file: currentDocument.fileData, onLoadSuccess: function (payload) {
            dispatch(setDocumentRenderSettings({
                currentPage: 1,
                zoomLevel: 1,
                fitType: "width",
                loaded: true,
                pagesCount: payload.numPages,
                paginated: true,
                rotationAngle: 0,
            }));
            var pages = new Array(payload.numPages).fill(0);
            emitEvent("onPaginationDocumentLoaded", pages.map(function (page, index) { return ({
                index: index,
                loaded: false,
            }); }));
        }, loading: React.createElement("span", null, "Loading...") },
        React.createElement("div", { className: "document-content" },
            React.createElement(PDFAllPages, { pageRanges: requestPagesRange, pageDimension: pageDimension, onRendered: function (page) {
                    if (!pageDimension) {
                        setPageDimension(page.dimension);
                    }
                    emitEvent("onPaginationDocumentPagesLoaded", [
                        {
                            index: page.number - 1,
                            imageURL: page.canvas.toDataURL(),
                        },
                    ]);
                } }))));
};
export default PDFPages;
var templateObject_1;
