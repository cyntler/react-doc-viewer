import { atom, MutableSnapshot, selector } from "recoil";
import { DocViewerProps } from "../DocViewer";
import { IConfig, IDocument } from "../types";

export type IMainState = {
  currentFileNo: number;
  documents: IDocument[];
  documentLoading: boolean;
  currentDocument?: IDocument;
  rendererRect?: DOMRect;
  config: IConfig;
};

export const initialMainState: IMainState = {
  currentFileNo: 0,
  documents: [],
  documentLoading: true,
  currentDocument: undefined,
  rendererRect: undefined,
  config: {},
};

export const initializeRecoilRoot = (
  props: DocViewerProps
): ((mutableSnapshot: MutableSnapshot) => void) => {
  return ({ set }) => {
    set(DocViewerState.documents, props.documents);
    set(DocViewerState.privateCurrentDocument, props.documents[0]);
    set(DocViewerState.config, props.config || initialMainState.config);
  };
};

export default class DocViewerState {
  static currentFileNo = atom<number>({
    key: "currentFileNo",
    default: initialMainState.currentFileNo,
  });

  static documents = atom<IDocument[]>({
    key: "documents",
    default: initialMainState.documents,
  });

  static documentLoading = atom<boolean>({
    key: "documentLoading",
    default: initialMainState.documentLoading,
  });

  static privateCurrentDocument = atom<IDocument | undefined>({
    key: "privateCurrentDocument",
    default: initialMainState.currentDocument,
  });
  static currentDocument = selector<IDocument | undefined>({
    key: "currentDocument",
    get: ({ get }) => get(DocViewerState.privateCurrentDocument),
    set: ({ get, set }, newValue) => {
      set(DocViewerState.privateCurrentDocument, newValue);
      set(DocViewerState.documentLoading, false);
    },
  });

  static rendererRect = atom<DOMRect | undefined>({
    key: "rendererRect",
    default: initialMainState.rendererRect,
  });

  static config = atom<IConfig>({
    key: "config",
    default: initialMainState.config,
  });
}
