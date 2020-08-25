import { selector } from "recoil";
import DocViewerState from ".";

export default class DocViewerSelectors {
  static setNextDocument = selector<void>({
    key: "setNextDocument",
    get: () => {},
    set: ({ get, set }) => {
      const nextDocumentNo = get(DocViewerState.currentFileNo) + 1;
      set(DocViewerState.currentFileNo, nextDocumentNo);
      set(
        DocViewerState.privateCurrentDocument,
        get(DocViewerState.documents)[nextDocumentNo]
      );
      set(DocViewerState.documentLoading, true);
    },
  });

  static setPreviousDocument = selector<void>({
    key: "setPreviousDocument",
    get: ({ get }) => {},
    set: ({ get, set }) => {
      const prevDocumentNo = get(DocViewerState.currentFileNo) - 1;
      set(DocViewerState.currentFileNo, prevDocumentNo);
      set(
        DocViewerState.privateCurrentDocument,
        get(DocViewerState.documents)[prevDocumentNo]
      );
      set(DocViewerState.documentLoading, true);
    },
  });
}
