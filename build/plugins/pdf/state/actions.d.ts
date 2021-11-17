export declare const SET_ZOOM_LEVEL: string;
export interface SetZoomLevel {
    type: typeof SET_ZOOM_LEVEL;
    value: number;
}
export declare const setZoomLevel: (value: number) => SetZoomLevel;
export declare const SET_PDF_PAGINATED: string;
export interface SetPDFPaginated {
    type: typeof SET_PDF_PAGINATED;
    value: boolean;
}
export declare const setPDFPaginated: (value: boolean) => SetPDFPaginated;
export declare const SET_NUM_PAGES: string;
export interface SetNumPages {
    type: typeof SET_NUM_PAGES;
    value: number;
}
export declare const setNumPages: (value: number) => SetNumPages;
export declare const SET_CURRENT_PAGE: string;
export interface SetCurrentPage {
    type: typeof SET_CURRENT_PAGE;
    value: number;
}
export declare const setCurrentPage: (value: number) => SetCurrentPage;
export declare type PDFActions = SetZoomLevel | SetPDFPaginated | SetNumPages | SetCurrentPage;
