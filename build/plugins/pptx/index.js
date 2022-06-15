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
import React from "react";
import { DocViewerContext, RenderContext } from "../../state";
import { setDocumentCurrentPage, setDocumentRenderSettings, } from "../../state/actions/render.actions";
import { emitEvent } from "../../utils/events";
import getVisiblePageIndex from "../../utils/getVisiblePageIndex";
import PPTXRender from "./render";
import { parsePresentation } from "./utils/presentation.util";
var MemorizedRender = React.memo(function (args) { return React.createElement(PPTXRender, __assign({}, args)); }, function (prev, current) {
    if (prev.presentation)
        return true;
    return false;
});
var DOCUMENT_PAGES_MARGIN = 8;
function PPTXRenderer(props) {
    var _a = React.useState(null), presentation = _a[0], setPresentation = _a[1];
    var scrollElement = document.querySelector("#pptx-container");
    var mainState = React.useContext(DocViewerContext).state;
    var _b = React.useContext(RenderContext), renderSettings = _b.state, dispatch = _b.dispatch;
    React.useEffect(function () {
        if (!presentation)
            return;
        scrollElement.style.zoom = renderSettings.zoomLevel * 100 + "%";
        var currentPageIndex = getVisiblePageIndex({
            scrollElement: scrollElement,
            pageHeight: presentation.size.height,
            pageMargin: DOCUMENT_PAGES_MARGIN,
            pagesCount: renderSettings.pagesCount,
        });
        if (currentPageIndex + 1 !== renderSettings.currentPage) {
            scrollElement.scrollTo({
                left: 0,
                top: (renderSettings.currentPage - 1) * presentation.size.height +
                    DOCUMENT_PAGES_MARGIN * renderSettings.pagesCount,
            });
        }
        var endScrollTimerId = null;
        var onScrollEnd = function () {
            var currentPageIndex = getVisiblePageIndex({
                scrollElement: scrollElement,
                pageHeight: presentation.size.height,
                pageMargin: DOCUMENT_PAGES_MARGIN,
                pagesCount: renderSettings.pagesCount,
            });
            if (currentPageIndex === -1)
                return;
            var currentPage = currentPageIndex + 1;
            dispatch(setDocumentCurrentPage(currentPage > renderSettings.pagesCount
                ? renderSettings.pagesCount
                : currentPage));
        };
        var onScroll = function () {
            if (endScrollTimerId) {
                clearTimeout(endScrollTimerId);
            }
            endScrollTimerId = setTimeout(onScrollEnd, 100);
        };
        scrollElement.onscroll = onScroll;
    }, [renderSettings]);
    React.useEffect(function () {
        if (!mainState.currentDocument)
            return;
        var thenableObject = parsePresentation(mainState.currentDocument.fileData);
        thenableObject
            .then(function (presentation) { return setPresentation(presentation); })
            .catch(function (error) { return console.error(error); });
    }, []);
    var onRendered = React.useCallback(function (slides) {
        props.onLoaded(presentation);
        dispatch(setDocumentRenderSettings({
            currentPage: 1,
            zoomLevel: 1,
            fitType: "width",
            loaded: true,
            pagesCount: slides.length,
            paginated: true,
            rotationAngle: 0,
        }));
        emitEvent("onPaginationDocumentLoaded", slides);
    }, [presentation]);
    return (React.createElement(MemorizedRender, { presentation: presentation, onRendered: onRendered }));
}
PPTXRenderer.fileTypes = [
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "application/vnd.ms-powerpoint",
];
PPTXRenderer.weight = 0;
export default PPTXRenderer;
