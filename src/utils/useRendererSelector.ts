import events from "alcumus-local-events";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import DocViewerState from "../state";
import { DocRenderer } from "../types";

/**
 * Custom Hook for loading the current document into context
 */
const useRendererSelector = (): {
  CurrentRenderer: DocRenderer | undefined;
} => {
  const currentDocument = useRecoilValue(DocViewerState.currentDocument);

  const [CurrentRenderer, setCurrentRenderer] = useState<DocRenderer>();

  useEffect(() => {
    if (!currentDocument) return;

    Promise.resolve().then(async () => {
      const respondingRenderers: DocRenderer[] = [];

      // Emit async event, to populate respondingRenderers array
      await events.emitAsync(
        "request-document-renderer",
        currentDocument,
        respondingRenderers
      );

      // Arbitrary sorting of priorities for demo purposes
      const [SelectedRenderer] = respondingRenderers.sort(
        (a, b) => a.priority - b.priority
      );

      if (SelectedRenderer && SelectedRenderer !== undefined) {
        setCurrentRenderer(() => SelectedRenderer);
      } else {
        setCurrentRenderer(undefined);
      }
    });
  }, [currentDocument]);

  return { CurrentRenderer };
};

export default useRendererSelector;
