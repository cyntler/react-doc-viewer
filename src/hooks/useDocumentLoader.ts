import { Dispatch, useContext, useEffect } from "react";
import { DocViewerContext } from "../store/DocViewerProvider";
import {
  MainStateActions,
  setDocumentLoading,
  updateCurrentDocument,
} from "../store/actions";
import { IMainState } from "../store/mainStateReducer";
import { DocRenderer } from "..";
import {
  defaultFileLoader,
  FileLoaderComplete,
  FileLoaderFuncProps,
} from "../utils/fileLoaders";
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
  const { currentFileNo, currentDocument, prefetchMethod } = state;
  const { fileSource = {} } = currentDocument || {};
  const { uri = "", file = null } = fileSource;

  const { CurrentRenderer } = useRendererSelector();

  useEffect(
    () => {
      if (!currentDocument) return;

      if (file) return;

      if (currentDocument.fileType) return;

      const controller = new AbortController();
      const { signal } = controller;

      fetch(uri, {
        method: prefetchMethod || uri.startsWith("blob:") ? "GET" : "HEAD",
        signal,
        headers: state?.requestHeaders,
      }).then((response) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentFileNo, fileSource]
  );

  useEffect(() => {
    if (!currentDocument || !CurrentRenderer) return;

    const controller = new AbortController();
    const { signal } = controller;

    const fileLoaderComplete: FileLoaderComplete = (fileReader) => {
      if (!currentDocument || !fileReader) {
        dispatch(setDocumentLoading(false));
        return;
      }

      let updatedDocument = { ...currentDocument };
      if (fileReader.result !== null) {
        updatedDocument.fileData = fileReader.result;
      }

      dispatch(updateCurrentDocument(updatedDocument));
      dispatch(setDocumentLoading(false));
    };

    const loaderFunctionProps: FileLoaderFuncProps = {
      fileSource,
      signal,
      fileLoaderComplete,
      headers: state?.requestHeaders,
    };

    if (CurrentRenderer === null) {
      dispatch(setDocumentLoading(false));
    } else if (CurrentRenderer.fileLoader !== undefined) {
      CurrentRenderer.fileLoader?.(loaderFunctionProps);
    } else {
      defaultFileLoader(loaderFunctionProps);
    }

    return () => {
      controller.abort();
    };
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [CurrentRenderer, currentFileNo]);

  return { state, dispatch, CurrentRenderer };
};
