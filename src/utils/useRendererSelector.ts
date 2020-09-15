import { useContext, useEffect, useState } from "react";
import { DocViewerContext } from "../state";
import { DocRenderer } from "../types";

/**
 * Custom Hook for loading the current document into context
 */
export const useRendererSelector = (): {
  CurrentRenderer: DocRenderer | null | undefined;
} => {
  const {
    state: { currentDocument, pluginRenderers },
  } = useContext(DocViewerContext);

  const [CurrentRenderer, setCurrentRenderer] = useState<
    DocRenderer | null | undefined
  >();

  useEffect(() => {
    if (!currentDocument) return;

    // Do not advance if the document does not yet have a fileType
    // This prevents prematurely showing 'no renderer' message
    if (!currentDocument.fileType) {
      setCurrentRenderer(undefined);
      return;
    }

    const matchingRenderers: DocRenderer[] = [];

    pluginRenderers?.map((r) => {
      if (currentDocument.fileType === undefined) return;
      if (r.fileTypes.indexOf(currentDocument.fileType) >= 0) {
        matchingRenderers.push(r);
      }
    });

    // Compute prefered Renderer based on weight
    const [SelectedRenderer] = matchingRenderers.sort(
      (a, b) => b.weight - a.weight
    );

    if (SelectedRenderer && SelectedRenderer !== undefined) {
      setCurrentRenderer(() => SelectedRenderer);
    } else {
      setCurrentRenderer(null);
    }
  }, [currentDocument]);

  return { CurrentRenderer };
};
