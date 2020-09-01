import events from "alcumus-local-events";
import { useContext, useEffect, useState } from "react";
import { MainContext } from "../state";
import { DocRenderer } from "../types";

/**
 * Custom Hook for loading the current document into context
 */
export const useRendererSelector = (): {
  CurrentRenderer: DocRenderer | undefined;
} => {
  const {
    state: { currentDocument },
  } = useContext(MainContext);

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
        (a, b) => b.weight - a.weight
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
