import { useContext, useEffect, useState } from "react";
import { DocViewerContext } from "../state";
import { DocRenderer } from "../types";

/**
 * Custom Hook for loading the current document into context
 */
export const useRendererSelector = (): {
  CurrentRenderer: DocRenderer | undefined;
} => {
  const {
    state: { currentDocument, pluginRenderers },
  } = useContext(DocViewerContext);

  const [CurrentRenderer, setCurrentRenderer] = useState<DocRenderer>();

  useEffect(() => {
    if (!currentDocument) return;

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
      setCurrentRenderer(undefined);
    }
  }, [currentDocument]);

  return { CurrentRenderer };
};
