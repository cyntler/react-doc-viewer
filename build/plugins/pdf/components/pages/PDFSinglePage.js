var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React, { useContext } from "react";
import { Page } from "react-pdf";
import styled from "styled-components";
import { DocViewerContext, RenderContext } from "../../../../state";
var PageWrapper = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  /* margin: 20px 0; */\n"], ["\n  /* margin: 20px 0; */\n"])));
var PageTag = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  padding: 0 0 10px 10px;\n  color: ", ";\n  font-size: 14px;\n  text-align: left;\n\n  @media (max-width: 768px) {\n    font-size: 10px;\n  }\n"], ["\n  padding: 0 0 10px 10px;\n  color: ", ";\n  font-size: 14px;\n  text-align: left;\n\n  @media (max-width: 768px) {\n    font-size: 10px;\n  }\n"])), function (props) { return props.theme.textTertiary; });
var PageNotVisible = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  background: #fff;\n"], ["\n  background: #fff;\n"])));
var PDFSinglePage = function (props) {
    var pageNumber = props.pageNum, onRendered = props.onRendered, visible = props.visible;
    var documentNavigationPages = document.querySelector("#document-pages-nav");
    var subtractWidth = documentNavigationPages
        ? documentNavigationPages.clientWidth + 10
        : 10;
    var rendererRect = useContext(DocViewerContext).state.rendererRect;
    var _a = useContext(RenderContext).state, zoomLevel = _a.zoomLevel, pagesCount = _a.pagesCount, currentPage = _a.currentPage, rotationAngle = _a.rotationAngle;
    var _pageNum = pageNumber || currentPage;
    var pageWidth = rendererRect.width - subtractWidth;
    var _b = React.useState(null), pageDimension = _b[0], setPageDimension = _b[1];
    return (React.createElement(PageWrapper, { id: "pdf-page-wrapper", last: _pageNum >= pagesCount }, visible ? (React.createElement(Page, { pageNumber: _pageNum || currentPage, scale: zoomLevel, rotate: rotationAngle, width: pageWidth, onLoadSuccess: function (page) {
            return setPageDimension({
                width: page.width,
                height: page.height,
            });
        }, onRenderSuccess: function () {
            var canvas = document.querySelector("#pdf-page-wrapper [data-page-number=\"" + pageNumber + "\"] canvas");
            onRendered({
                number: pageNumber,
                dimension: pageDimension,
                canvas: canvas,
            });
        }, loading: "loading..." })) : (React.createElement(PageNotVisible, { style: props.pageDimension
            ? {
                width: props.pageDimension.width * zoomLevel,
                height: props.pageDimension.height * zoomLevel,
            }
            : undefined }))));
};
export default React.memo(PDFSinglePage, function (prev, current) {
    if (prev.pageDimension !== current.pageDimension)
        return false;
    if (prev.pageNum !== current.pageNum)
        return false;
    if (prev.visible !== current.visible)
        return false;
    return true;
});
var templateObject_1, templateObject_2, templateObject_3;
