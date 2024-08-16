import { IMainState } from "../../../store/mainStateReducer";
import {
  PDFActions as PDFStateActions,
  SetCurrentPage,
  SetNumPages,
  SetPDFPaginated,
  SetZoomLevel,
  SET_CURRENT_PAGE,
  SET_NUM_PAGES,
  SET_PDF_PAGINATED,
  SET_ZOOM_LEVEL,
  SET_CURRENT_MAIN_STATE,
  SetCurrentMainState,
} from "./actions";

export type IPDFState = {
  defaultZoomLevel: number;
  zoomLevel: number;
  zoomJump: number;
  paginated: boolean;
  numPages: number;
  currentPage: number;
  mainState?: IMainState;
};

export const initialPDFState: IPDFState = {
  defaultZoomLevel: 1,
  zoomLevel: 1,
  zoomJump: 0.1,
  paginated: true,
  numPages: 0,
  currentPage: 1,
};

export type PDFStateReducer = (
  state: IPDFState,
  action: PDFStateActions,
) => IPDFState;

export const reducer: PDFStateReducer = (
  state = initialPDFState,
  action: PDFStateActions,
): IPDFState => {
  switch (action.type) {
    case SET_ZOOM_LEVEL: {
      const { value } = action as SetZoomLevel;

      return { ...state, zoomLevel: value };
    }

    case SET_PDF_PAGINATED: {
      const { value } = action as SetPDFPaginated;
      return { ...state, paginated: value };
    }

    case SET_NUM_PAGES: {
      const { value } = action as SetNumPages;
      return { ...state, numPages: value };
    }

    case SET_CURRENT_PAGE: {
      const { value } = action as SetCurrentPage;
      return { ...state, currentPage: value };
    }

    case SET_CURRENT_MAIN_STATE: {
      const { value } = action as SetCurrentMainState;
      return { ...state, mainState: value };
    }

    default:
      return state;
  }
};
