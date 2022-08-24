/* eslint-disable react/jsx-no-useless-fragment */
import React, { useContext } from "react";
import { RenderContext } from "../../../../state";
import PDFSinglePage from "./PDFSinglePage";
export var PDFAllPages = function (_a) {
    var pageRanges = _a.pageRanges, pageDimension = _a.pageDimension, _b = _a.onRendered, onRendered = _b === void 0 ? function () { } : _b;
    var pagesCount = useContext(RenderContext).state.pagesCount;
    var pages = [];
    var _loop_1 = function (i) {
        pages.push(React.createElement(PDFSinglePage, { key: i + 1, pageNum: i + 1, pageDimension: pageDimension, visible: pageRanges.some(function (range) { return range.min <= i && range.max >= i; }), onRendered: onRendered }));
    };
    for (var i = 0; i < pagesCount; i++) {
        _loop_1(i);
    }
    return React.createElement(React.Fragment, null, pages);
};
