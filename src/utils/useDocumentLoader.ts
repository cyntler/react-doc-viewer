import { Dispatch, useContext, useEffect } from "react";
import { DocViewerContext } from "../state";
import {
  MainStateActions,
  setDocumentLoading,
  updateCurrentDocument,
} from "../state/actions";
import { IMainState } from "../state/reducer";
import { DocRenderer } from "../types";
import { useRendererSelector } from "./useRendererSelector";

/**
 * Custom Hook for loading the current document into context
 */
export const useDocumentLoader = (): {
  state: IMainState;
  dispatch: Dispatch<MainStateActions>;
  CurrentRenderer: DocRenderer | null | undefined;
} => {
  const { state, dispatch } = useContext(DocViewerContext);
  const { currentFileNo, currentDocument } = state;

  const { CurrentRenderer } = useRendererSelector();

  const documentURI = currentDocument?.uri || "";

  useEffect(
    () => {
      if (!currentDocument) return;
      if (currentDocument.fileType !== undefined) {
        dispatch(updateCurrentDocument({ uri: currentDocument.uri }));
      }

      const controller = new AbortController();
      const { signal } = controller;

      fetch(documentURI, { method: "HEAD", signal }).then((response) => {
        const contentTypeRaw = response.headers.get("content-type");
        const contentTypes = contentTypeRaw?.split(";") || [];
        const contentType = contentTypes.length ? contentTypes[0] : undefined;

        dispatch(
          updateCurrentDocument({
            ...currentDocument,
            fileType: contentType || undefined,
          })
        );
      });

      return () => {
        controller.abort();
      };
    },
    // eslint ignore added, because a warning appears for dispatch to
    // be a dependancy of the useEffect
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentFileNo, documentURI]
  );

  useEffect(() => {
    if (!currentDocument || CurrentRenderer === undefined) return;

    const controller = new AbortController();
    const { signal } = controller;

    if (CurrentRenderer === null) {
      dispatch(setDocumentLoading(false));
    } else if (CurrentRenderer.fileLoader !== undefined) {
      CurrentRenderer.fileLoader?.(() => {
        dispatch(setDocumentLoading(false));
      });
    } else {
      defaultFileLoader(documentURI, signal, (blob, fileReader) => {
        dispatch(
          updateCurrentDocument({
            ...currentDocument,
            base64Data: fileReader.result as string,
          })
        );
        dispatch(setDocumentLoading(false));
      });
    }

    return () => {
      controller.abort();
    };
  }, [CurrentRenderer]);

  return { state, dispatch, CurrentRenderer };
};

const defaultFileLoader = (
  documentURI: string,
  signal: AbortSignal,
  cb: (blob: Blob, fileReader: FileReader) => void
) => {
  fetch(documentURI, { signal })
    .then(async (res) => {
      const blob = await res.blob();

      const fileReader = new FileReader();
      fileReader.addEventListener("loadend", () => cb(blob, fileReader));
      fileReader.readAsDataURL(blob);
    })
    .catch((e) => {
      return e;
    });
};
