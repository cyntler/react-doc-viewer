interface IGetVisiblePage {
    scrollElement: HTMLElement;
    pageHeight: number;
    pageMargin?: number;
    pagesCount: number;
}
export default function getVisiblePageIndex({ scrollElement, pageHeight, pageMargin, pagesCount, }: IGetVisiblePage): number;
export {};
