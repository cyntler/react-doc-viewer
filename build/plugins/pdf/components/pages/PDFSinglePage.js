var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React, { useContext } from "react";
import { Page } from "react-pdf";
import styled from "styled-components";
import { DocViewerContext, RenderContext } from "../../../../state";
var PDFSinglePage = function (props) {
    var pageNum = props.pageNum, onRendered = props.onRendered;
    var documentNavigationPages = document.querySelector("#document-pages-nav");
    var subtractWidth = documentNavigationPages ? documentNavigationPages.clientWidth + 10 : 10;
    var rendererRect = useContext(DocViewerContext).state.rendererRect;
    var _a = useContext(RenderContext).state, zoomLevel = _a.zoomLevel, pagesCount = _a.pagesCount, currentPage = _a.currentPage, rotationAngle = _a.rotationAngle;
    var _pageNum = pageNum || currentPage;
    return (React.createElement(PageWrapper, { id: "pdf-page-wrapper", last: _pageNum >= pagesCount },
        React.createElement(Page, { pageNumber: _pageNum || currentPage, scale: zoomLevel, rotate: rotationAngle, height: ((rendererRect === null || rendererRect === void 0 ? void 0 : rendererRect.height) || 100) - subtractWidth, width: ((rendererRect === null || rendererRect === void 0 ? void 0 : rendererRect.width) || 100) - subtractWidth, onRenderSuccess: function () { return onRendered(); } })));
};
export default PDFSinglePage;
var PageWrapper = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  /* margin: 20px 0; */\n"], ["\n  /* margin: 20px 0; */\n"])));
var PageTag = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  padding: 0 0 10px 10px;\n  color: ", ";\n  font-size: 14px;\n  text-align: left;\n\n  @media (max-width: 768px) {\n    font-size: 10px;\n  }\n"], ["\n  padding: 0 0 10px 10px;\n  color: ", ";\n  font-size: 14px;\n  text-align: left;\n\n  @media (max-width: 768px) {\n    font-size: 10px;\n  }\n"])), function (props) { return props.theme.textTertiary; });
var templateObject_1, templateObject_2;
