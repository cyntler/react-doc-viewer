import React, { useContext } from "react";
import { RenderContext } from "../../../../state";
import PDFSinglePage from "./PDFSinglePage";
export var PDFAllPages = function () {
    var pagesCount = useContext(RenderContext).state.pagesCount;
    var PagesArray = [];
    for (var i = 0; i < pagesCount; i++) {
        PagesArray.push(React.createElement(PDFSinglePage, { key: i + 1, pageNum: i + 1 }));
    }
    return React.createElement(React.Fragment, null, PagesArray);
};
