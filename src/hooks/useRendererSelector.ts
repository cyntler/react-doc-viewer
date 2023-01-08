import { useContext, useEffect, useState } from "react";
import { DocViewerContext } from "../store/DocViewerProvider";
import { DocRenderer } from "..";

export const useRendererSelector = (): {
  CurrentRenderer: DocRenderer | null | undefined;
} => {
  const {
    state: { currentDocument, pluginRenderers },
  } = useContext(DocViewerContext);

  const [CurrentRenderer, setCurrentRenderer] =
    useState<DocRenderer | null | undefined>();

  useEffect(() => {
    if (!currentDocument) return;

    if (currentDocument.fileSource?.uri && !currentDocument.fileType) {
      setCurrentRenderer(undefined);
      return;
    }

    const matchingRenderers: DocRenderer[] = [];

    pluginRenderers?.forEach((r) => {
      const fileType = currentDocument.fileSource?.file
        ? currentDocument.fileSource.file.type
        : currentDocument.fileType;

      if (!fileType) return;

      if (r.fileTypes.indexOf(fileType) >= 0) {
        matchingRenderers.push(r);
      }
    });

    const [SelectedRenderer] = matchingRenderers.sort(
      (a, b) => b.weight - a.weight
    );

    if (SelectedRenderer && SelectedRenderer !== undefined) {
      setCurrentRenderer(() => SelectedRenderer);
    } else {
      setCurrentRenderer(null);
    }
  }, [currentDocument, pluginRenderers]);

  return { CurrentRenderer };
};
