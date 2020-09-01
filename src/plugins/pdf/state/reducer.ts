import { IMainState } from "../../../state/reducer";
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
} from "./actions";

export type IPDFState = {
  zoomLevel: number;
  paginated: boolean;
  numPages: number;
  currentPage: number;
  mainState?: IMainState;
};

export const initialPDFState: IPDFState = {
  zoomLevel: 1,
  paginated: true,
  numPages: 0,
  currentPage: 1,
};

export type PDFStateReducer = (
  state: IPDFState,
  action: PDFStateActions
) => IPDFState;

export const reducer: PDFStateReducer = (
  state = initialPDFState,
  action: PDFStateActions
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

    default:
      return state;
  }
};
