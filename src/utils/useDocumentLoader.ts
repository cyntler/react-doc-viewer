import { Dispatch, useContext, useEffect } from "react";
import { DocViewerContext } from "../state";
import { MainStateActions, updateCurrentDocument } from "../state/actions";
import { IMainState } from "../state/reducer";
import { DocRenderer } from "../types";
import { useRendererSelector } from "./useRendererSelector";

/**
 * Custom Hook for loading the current document into context
 */
export const useDocumentLoader = (): {
  state: IMainState;
  dispatch: Dispatch<MainStateActions>;
  CurrentRenderer: DocRenderer | undefined;
} => {
  const { state, dispatch } = useContext(DocViewerContext);
  const { currentFileNo, currentDocument } = state;

  const { CurrentRenderer } = useRendererSelector();

  const documentURI = currentDocument?.uri || "";

  useEffect(
    () => {
      if (!currentDocument) return;

      Promise.resolve().then(async () => {
        const res = await fetch(documentURI);
        const blob = await res.blob();

        const fileReader = new FileReader();
        fileReader.addEventListener("loadend", () => {
          dispatch(
            updateCurrentDocument({
              ...currentDocument,
              base64Data: fileReader.result as string,
              fileType: blob.type,
            })
          );
          // dispatch(setDocumentLoading(false));
        });
        fileReader.readAsDataURL(blob);
      });
    },
    // eslint ignore added, because a warning appears for dispatch to
    // be a dependancy of the useEffect
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentFileNo, documentURI]
  );

  return { state, dispatch, CurrentRenderer };
};
