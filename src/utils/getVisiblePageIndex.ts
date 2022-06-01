interface IGetVisiblePage {
    scrollElement: HTMLElement;
    pageHeight: number;
    pageMargin?: number;
    pagesCount: number;
}

export default function getVisiblePageIndex({
    scrollElement,
    pageHeight,
    pageMargin = 0,
    pagesCount,
}: IGetVisiblePage): number {
    if (!scrollElement || !pageHeight) return -1;

    const currentScrollValue = scrollElement.scrollTop;
    const currentPageIndex = Math.round(currentScrollValue / (pageHeight + pageMargin * pagesCount));

    return currentPageIndex;
}