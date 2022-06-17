import { IDocument } from "../types";

export const fromArrayBuffer = (
  buffer: ArrayBuffer,
  mimeType: string
): IDocument => ({
  uri: URL.createObjectURL(new Blob([buffer], { type: mimeType })),
  isAsArrayBuffer: true,
});
