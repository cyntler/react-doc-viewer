export default function getVisiblePageIndex(_a) {
    var scrollElement = _a.scrollElement, pageHeight = _a.pageHeight, _b = _a.pageMargin, pageMargin = _b === void 0 ? 0 : _b, pagesCount = _a.pagesCount;
    if (!scrollElement || !pageHeight)
        return -1;
    var currentScrollValue = scrollElement.scrollTop;
    var currentPageIndex = Math.round(currentScrollValue / (pageHeight + pageMargin));
    return currentPageIndex;
}
