import events from "alcumus-local-events";
import { DocRenderer, FileType } from "../types";

const linkRenderResponder = (Renderer: DocRenderer) => {
  events.on(
    "request-document-renderer",
    (_ev: any, payload: { fileType: FileType }, something: DocRenderer[]) => {
      if (Renderer.fileTypes.indexOf(payload.fileType) >= 0) {
        something.push(Renderer);
      }
    }
  );
};

export default linkRenderResponder;
