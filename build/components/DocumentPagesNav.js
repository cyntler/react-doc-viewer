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
/* eslint-disable consistent-return */
import React from "react";
import styled from "styled-components";
import { areEqual, FixedSizeList } from "react-window";
import { RenderContext } from "../state";
import { setDocumentCurrentPage } from "../state/actions/render.actions";
import { createEvent, emitEvent } from "../utils/events";
import makeScrollListener from "../utils/makeScrollListener";
import getVisibleIndexRangeByParent from "../utils/getVisibleIndexRangeByParent";
var Container = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  gap: 15px;\n  flex-direction: column;\n  max-width: 340px;\n  height: 100%;\n\n  .navigator-list {\n    // scroll bar\n    ::-webkit-scrollbar {\n      width: 5px;\n    }\n    ::-webkit-scrollbar-track {\n      background: transparent;\n    }\n    ::-webkit-scrollbar-thumb {\n      background: #888;\n    }\n    ::-webkit-scrollbar-thumb:hover {\n      background: #555;\n    }\n  }\n\n  .page {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n\n    &[data-active=\"true\"] {\n      background: rgba(0, 0, 0, 0.3);\n    }\n\n    &:hover {\n      background: rgba(0, 0, 0, 0.3);\n    }\n\n    .page-image {\n      max-width: 150px;\n\n      img {\n        width: 100%;\n      }\n\n      .not-loaded {\n        width: 150px;\n        min-height: 200px;\n        height: 100%;\n        background: #fff;\n      }\n    }\n\n    .page-caption {\n      margin-top: 8px;\n      text-align: center;\n      color: #fff;\n    }\n  }\n"], ["\n  display: flex;\n  gap: 15px;\n  flex-direction: column;\n  max-width: 340px;\n  height: 100%;\n\n  .navigator-list {\n    // scroll bar\n    ::-webkit-scrollbar {\n      width: 5px;\n    }\n    ::-webkit-scrollbar-track {\n      background: transparent;\n    }\n    ::-webkit-scrollbar-thumb {\n      background: #888;\n    }\n    ::-webkit-scrollbar-thumb:hover {\n      background: #555;\n    }\n  }\n\n  .page {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n\n    &[data-active=\"true\"] {\n      background: rgba(0, 0, 0, 0.3);\n    }\n\n    &:hover {\n      background: rgba(0, 0, 0, 0.3);\n    }\n\n    .page-image {\n      max-width: 150px;\n\n      img {\n        width: 100%;\n      }\n\n      .not-loaded {\n        width: 150px;\n        min-height: 200px;\n        height: 100%;\n        background: #fff;\n      }\n    }\n\n    .page-caption {\n      margin-top: 8px;\n      text-align: center;\n      color: #fff;\n    }\n  }\n"])));
function DocumentPagesNav() {
    var _a = React.useContext(RenderContext), state = _a.state, dispatch = _a.dispatch;
    var _b = React.useState([]), pages = _b[0], setPages = _b[1];
    var containerRef = React.useRef(null);
    var listRef = React.useRef(null);
    var _c = React.useState(0), listHeight = _c[0], setListHeight = _c[1];
    var paginated = state.pagesCount > 1 && state.paginated;
    React.useEffect(function () {
        var pages = [];
        var clearLoadListener = createEvent("onPaginationDocumentLoaded", function (payload) {
            pages = payload.map(function (item) { return ({
                id: item.index + 1,
                loaded: item.loaded,
                image: item.imageURL,
                caption: (item.name || "Page") + " " + (item.index + 1),
            }); });
            setPages(pages);
        });
        var clearPageLoadListener = createEvent("onPaginationDocumentPagesLoaded", function (loadedPages) {
            // I've pictures of the requested pages.
            pages = pages.map(function (page) {
                var loadedPage = loadedPages.find(function (item) { return item.index + 1 === page.id; });
                if (loadedPage) {
                    return __assign(__assign({}, page), { loaded: true, image: loadedPage.imageURL });
                }
                return page;
            });
            setPages(pages);
        });
        return function () {
            clearPageLoadListener();
            clearLoadListener();
        };
    }, []);
    React.useEffect(function () {
        if (!listRef.current)
            return;
        var element = listRef.current._outerRef || document.querySelector(".navigator-list");
        if (!element)
            return;
        var clearScrollListener = makeScrollListener(element, function () { }, function () {
            var visiblePageRange = getVisibleIndexRangeByParent(element, {
                width: 280,
                height: 280,
            });
            emitEvent("onPageRequestRange", visiblePageRange);
        }, 300);
        return function () {
            clearScrollListener();
        };
    }, [listRef.current]);
    React.useEffect(function () {
        if (listRef.current) {
            listRef.current.scrollToItem(state.currentPage - 1);
        }
    }, [state.currentPage]);
    React.useEffect(function () {
        if (!containerRef.current)
            return;
        setListHeight(containerRef.current.clientHeight);
        window.addEventListener("resize", function () {
            var _a;
            setListHeight(((_a = containerRef.current) === null || _a === void 0 ? void 0 : _a.clientHeight) || 0);
        });
    }, [containerRef.current]);
    // eslint-disable-next-line react/no-unstable-nested-components
    var Row = React.memo(function (_a) {
        var index = _a.index, style = _a.style;
        var page = pages[index];
        var active = page.id === state.currentPage;
        var onPageClick = function () {
            var _a;
            if (state.currentPage === page.id)
                return;
            if ((_a = listRef.current) === null || _a === void 0 ? void 0 : _a.scrollToItem) {
                listRef.current.scrollToItem(page.id - 1);
            }
            dispatch(setDocumentCurrentPage(page.id));
        };
        return (React.createElement("div", { role: "button", tabIndex: 0, onKeyDown: function () { }, className: "page", "data-active": active, style: style, onClick: onPageClick },
            React.createElement("div", { className: "page-image" }, page.loaded ? (React.createElement("img", { src: page.image, alt: page.caption })) : (React.createElement("div", { className: "not-loaded" }))),
            React.createElement("div", { className: "page-caption" }, page.caption)));
    }, areEqual);
    return paginated ? (React.createElement(Container, { id: "document-pages-nav", ref: containerRef },
        React.createElement(FixedSizeList, { className: "navigator-list", ref: listRef, width: 230, height: listHeight, itemCount: pages.length, itemData: pages, itemSize: 280 }, Row))) : (React.createElement(React.Fragment, null));
}
export default DocumentPagesNav;
var templateObject_1;
