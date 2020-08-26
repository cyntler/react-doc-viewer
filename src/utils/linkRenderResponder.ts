import events from "alcumus-local-events";
import { DocRenderer } from "../types";

export const linkRenderResponder = (Renderer: DocRenderer) => {
  events.on(
    "request-document-renderer",
    (_ev: any, payload: { fileType: string }, returnPayload: DocRenderer[]) => {
      if (Renderer.fileTypes.indexOf(payload.fileType) >= 0) {
        returnPayload.push(Renderer);
      }
    }
  );
};
