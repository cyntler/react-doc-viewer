import { IMainState } from "../../../store/mainStateReducer";

export const SET_ZOOM_LEVEL: string = "SET_ZOOM_LEVEL";

export interface SetZoomLevel {
  type: typeof SET_ZOOM_LEVEL;
  value: number;
}

export const setZoomLevel = (value: number): SetZoomLevel => ({
  type: SET_ZOOM_LEVEL,
  value,
});

export const SET_PDF_PAGINATED: string = "SET_PDF_PAGINATED";

export interface SetPDFPaginated {
  type: typeof SET_PDF_PAGINATED;
  value: boolean;
}

export const setPDFPaginated = (value: boolean): SetPDFPaginated => ({
  type: SET_PDF_PAGINATED,
  value,
});

export const SET_NUM_PAGES: string = "SET_NUM_PAGES";
export interface SetNumPages {
  type: typeof SET_NUM_PAGES;
  value: number;
}

export const setNumPages = (value: number): SetNumPages => ({
  type: SET_NUM_PAGES,
  value,
});

export const SET_CURRENT_PAGE: string = "SET_CURRENT_PAGE";

export interface SetCurrentPage {
  type: typeof SET_CURRENT_PAGE;
  value: number;
}

export const SET_CURRENT_MAIN_STATE: string = "SET_CURRENT_MAIN_STATE";

export interface SetCurrentMainState {
  type: typeof SET_CURRENT_MAIN_STATE;
  value: IMainState;
}

export const setCurrentPage = (value: number): SetCurrentPage => ({
  type: SET_CURRENT_PAGE,
  value,
});

export type PDFActions =
  | SetZoomLevel
  | SetPDFPaginated
  | SetNumPages
  | SetCurrentPage
  | SetCurrentMainState;
