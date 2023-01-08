import { FileSource } from "../models";

export interface FileLoaderFuncProps {
  fileSource: FileSource;
  signal: AbortSignal;
  fileLoaderComplete: FileLoaderComplete;
  headers?: Record<string, string>;
}

export type FileLoaderComplete = (fileReader?: FileReader) => void;
export type FileLoaderFunction = (props: FileLoaderFuncProps) => void;

type ReaderTypeFunction = "dataURL" | "arrayBuffer" | "binaryString" | "text";

interface BaseFileLoaderFuncOptions extends FileLoaderFuncProps {
  readerTypeFunction: ReaderTypeFunction;
}

type BaseFileLoaderFunction = (props: BaseFileLoaderFuncOptions) => void;

const _fileReader = (blob: Blob, readerType: string, cb: Function) => {
  const fileReader = new FileReader();

  fileReader.addEventListener("loadend", () => cb && cb(fileReader));

  switch (readerType) {
        case "arrayBuffer":
          fileReader.readAsArrayBuffer(blob);
          break;
        case "binaryString":
          fileReader.readAsBinaryString(blob);
          break;
        case "dataURL":
          fileReader.readAsDataURL(blob);
          break;
        case "text":
          fileReader.readAsText(blob);
          break;

        default:
          break;
      }
};

const _fileLoader: BaseFileLoaderFunction = ({
  fileSource,
  signal,
  fileLoaderComplete,
  readerTypeFunction,
  headers,
}) => {
  const { uri = "", file = null } = fileSource;

  if (file)
    return _fileReader(
      new Blob([file], { type: file.type }),
      readerTypeFunction,
      fileLoaderComplete
    );

  return fetch(uri, { signal, headers })
    .then(async (res) => {
      const blob = await res.blob();

      _fileReader(blob, readerTypeFunction, fileLoaderComplete);
    })
    .catch((e) => {
      return e;
    });
};

export const arrayBufferFileLoader: FileLoaderFunction = (props) => {
  return _fileLoader({ ...props, readerTypeFunction: "arrayBuffer" });
};

export const dataURLFileLoader: FileLoaderFunction = (props) => {
  return _fileLoader({ ...props, readerTypeFunction: "dataURL" });
};

export const textFileLoader: FileLoaderFunction = (props) => {
  return _fileLoader({ ...props, readerTypeFunction: "text" });
};

export const binaryStringFileLoader: FileLoaderFunction = (props) => {
  return _fileLoader({ ...props, readerTypeFunction: "binaryString" });
};

export const defaultFileLoader = dataURLFileLoader;
