import { FileLoaderFunction } from "../types";

export const base64FileLoader: FileLoaderFunction = (
  documentURI,
  signal,
  cb
) => {
  fetch(documentURI, { signal })
    .then(async (res) => {
      const blob = await res.blob();

      const fileReader = new FileReader();
      fileReader.addEventListener("loadend", () => cb(fileReader));
      fileReader.readAsDataURL(blob);
    })
    .catch((e) => {
      return e;
    });
};

export const arrayBufferFileLoader: FileLoaderFunction = (
  documentURI,
  signal,
  fileLoadComplete
) => {
  return fetch(documentURI, { signal })
    .then(async (res) => {
      const blob = await res.blob();

      const fileReader = new FileReader();
      fileReader.addEventListener("loadend", () =>
        fileLoadComplete(fileReader)
      );
      fileReader.readAsArrayBuffer(blob);
    })
    .catch((e) => {
      return e;
    });
};

export const defaultFileLoader = base64FileLoader;
