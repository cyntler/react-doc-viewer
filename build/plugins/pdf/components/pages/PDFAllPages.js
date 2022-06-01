import React, { useContext } from "react";
import { RenderContext } from "../../../../state";
import PDFSinglePage from "./PDFSinglePage";
export var PDFAllPages = function (_a) {
    var _b = _a.onRendered, onRendered = _b === void 0 ? function () { } : _b;
    var pagesCount = useContext(RenderContext).state.pagesCount;
    var pages = [];
    for (var i = 0; i < pagesCount; i++) {
        pages.push(React.createElement(PDFSinglePage, { key: i + 1, pageNum: i + 1, onRendered: onRendered }));
    }
    return React.createElement(React.Fragment, null, pages);
};
