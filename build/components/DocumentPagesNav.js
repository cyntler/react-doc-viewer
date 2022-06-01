var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React from 'react';
import styled from "styled-components";
import { areEqual, FixedSizeList } from "react-window";
import { RenderContext } from '../state';
import { setDocumentCurrentPage } from '../state/actions/render.actions';
import { createEvent } from '../utils/events';
var Container = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    display: flex;\n    gap: 15px;\n    flex-direction: column;\n    max-width: 340px;\n    height: 100%;\n    \n    .navigator-list {\n        // scroll bar \n        ::-webkit-scrollbar {\n            width: 5px;\n        }\n        ::-webkit-scrollbar-track {\n            background: transparent;\n        }\n        ::-webkit-scrollbar-thumb {\n            background: #888;\n        }\n        ::-webkit-scrollbar-thumb:hover {\n            background: #555;\n        }\n    }\n    \n    \n    .page {\n        display: flex;\n        flex-direction: column;\n        justify-content: center;\n        align-items: center;\n        \n        &:hover { \n            background: rgba(0, 0, 0, .3);\n        }\n        \n        .page-image {\n            max-width: 150px;\n            img { \n                width: 100%;\n\n            }\n        }\n\n        .page-caption {  \n            margin-top: 8px;\n            text-align: center;\n            color: #fff;\n        }\n    }\n"], ["\n    display: flex;\n    gap: 15px;\n    flex-direction: column;\n    max-width: 340px;\n    height: 100%;\n    \n    .navigator-list {\n        // scroll bar \n        ::-webkit-scrollbar {\n            width: 5px;\n        }\n        ::-webkit-scrollbar-track {\n            background: transparent;\n        }\n        ::-webkit-scrollbar-thumb {\n            background: #888;\n        }\n        ::-webkit-scrollbar-thumb:hover {\n            background: #555;\n        }\n    }\n    \n    \n    .page {\n        display: flex;\n        flex-direction: column;\n        justify-content: center;\n        align-items: center;\n        \n        &:hover { \n            background: rgba(0, 0, 0, .3);\n        }\n        \n        .page-image {\n            max-width: 150px;\n            img { \n                width: 100%;\n\n            }\n        }\n\n        .page-caption {  \n            margin-top: 8px;\n            text-align: center;\n            color: #fff;\n        }\n    }\n"])));
function DocumentPagesNav() {
    var _a = React.useContext(RenderContext), state = _a.state, dispatch = _a.dispatch;
    var _b = React.useState([]), pages = _b[0], setPages = _b[1];
    var containerRef = React.useRef(null);
    var listRef = React.useRef(null);
    var _c = React.useState(0), listHeight = _c[0], setListHeight = _c[1];
    React.useEffect(function () {
        createEvent("onPaginationDocumentLoaded", function (payload) {
            setPages(payload.map(function (item) {
                return {
                    id: item.index + 1,
                    image: item.imageURL,
                    caption: "Page " + (item.index + 1)
                };
            }));
        });
    }, []);
    React.useEffect(function () {
        if (listRef.current) {
            listRef.current.scrollToItem(state.currentPage - 1);
        }
    }, [state.currentPage]);
    React.useEffect(function () {
        if (!listRef.current)
            return;
    }, [listRef]);
    React.useEffect(function () {
        if (!containerRef.current)
            return;
        setListHeight(containerRef.current.clientHeight);
        window.addEventListener('resize', function () {
            var _a;
            setListHeight(((_a = containerRef.current) === null || _a === void 0 ? void 0 : _a.clientHeight) || 0);
        });
    }, [containerRef]);
    // if (!state.paginated || !pages.length) return <></>;
    var Row = React.memo(function (_a) {
        var index = _a.index, style = _a.style;
        var page = pages[index];
        var onPageClick = function () {
            var _a;
            if (state.currentPage === page.id)
                return;
            if ((_a = listRef.current) === null || _a === void 0 ? void 0 : _a.scrollToItem) {
                listRef.current.scrollToItem(page.id - 1);
            }
            dispatch(setDocumentCurrentPage(page.id));
        };
        return (React.createElement("div", { className: "page", style: style, onClick: onPageClick },
            React.createElement("div", { className: "page-image" },
                React.createElement("img", { src: page.image, alt: page.caption })),
            React.createElement("div", { className: "page-caption" }, page.caption)));
    }, areEqual);
    return (React.createElement(Container, { ref: containerRef },
        React.createElement(FixedSizeList, { className: "navigator-list", ref: listRef, width: 230, height: listHeight, itemCount: pages.length, itemData: pages, itemSize: 300 }, Row)));
}
export default DocumentPagesNav;
var templateObject_1;
