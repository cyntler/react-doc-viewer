import { FC, ReactElement, ComponentType, PropsWithChildren } from "react";
import { IMainState } from "./store/mainStateReducer";
import { FileLoaderFunction } from "./utils/fileLoaders";

export interface IConfig {
  header?: IHeaderConfig;
  loadingRenderer?: ILoadingRendererConfig;
  noRenderer?: INoRendererConfig;
  csvDelimiter?: string;
  pdfZoom?: IPdfZoomConfig;
  pdfVerticalScrollByDefault?: boolean;
}

export interface ILoadingRendererConfig {
  overrideComponent?: ComponentType<{
    document: IDocument | undefined;
    fileName: string;
  }>;
  showLoadingTimeout?: false | number;
}

export interface INoRendererConfig {
  overrideComponent?: ComponentType<{
    document: IDocument | undefined;
    fileName: string;
  }>;
}

export interface IHeaderConfig {
  disableHeader?: boolean;
  disableFileName?: boolean;
  retainURLParams?: boolean;
  overrideComponent?: IHeaderOverride;
}

export interface IPdfZoomConfig {
  defaultZoom: number;
  zoomJump: number;
}

export type IHeaderOverride = (
  state: IMainState,
  previousDocument: () => void,
  nextDocument: () => void,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) => ReactElement<any, any> | null;

export interface ITheme {
  primary?: string;
  secondary?: string;
  tertiary?: string;
  textPrimary?: string;
  textSecondary?: string;
  textTertiary?: string;
  disableThemeScrollbar?: boolean;
}

export interface IStyledProps {
  theme: ITheme;
}

export interface IDocument {
  uri: string;
  fileType?: string;
  fileData?: string | ArrayBuffer;
  fileName?: string;
}

export interface DocRendererProps {
  mainState: IMainState;
}

export interface DocRenderer extends FC<PropsWithChildren<DocRendererProps>> {
  fileTypes: string[];
  weight: number;
  fileLoader?: FileLoaderFunction | null | undefined;
}

export interface DocViewerRef {
  prev: () => void;
  next: () => void;
}
