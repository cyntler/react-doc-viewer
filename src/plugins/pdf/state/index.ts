import { atom } from "recoil";

export interface IPDFState {
  zoomLevel: number;
  paginated: boolean;
  numPages: number;
  currentPage: number;
}

export const initialPDFState: IPDFState = {
  zoomLevel: 1,
  paginated: true,
  numPages: 0,
  currentPage: 1,
};

export default class PDFRendererState {
  static zoomLevel = atom<number>({
    key: "zoomLevel",
    default: initialPDFState.zoomLevel,
  });

  static paginated = atom<boolean>({
    key: "paginated",
    default: initialPDFState.paginated,
  });

  static numPages = atom<number>({
    key: "numPages",
    default: initialPDFState.numPages,
  });

  static currentPage = atom<number>({
    key: "currentPage",
    default: initialPDFState.currentPage,
  });
}
