export interface FileLoaderFuncProps {
    documentURI: string;
    signal: AbortSignal;
    fileLoaderComplete: FileLoaderComplete;
}
export declare type FileLoaderComplete = (fileReader?: FileReader) => void;
export declare type FileLoaderFunction = (props: FileLoaderFuncProps) => void;
export declare const arrayBufferFileLoader: FileLoaderFunction;
export declare const dataURLFileLoader: FileLoaderFunction;
export declare const textFileLoader: FileLoaderFunction;
export declare const binaryStringFileLoader: FileLoaderFunction;
export declare const defaultFileLoader: FileLoaderFunction;
