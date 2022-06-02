import { FC, ReactElement, ComponentType } from "react";
import { ThemedStyledProps } from "styled-components";
import { IMainState } from "../state/reducers/main.reducers";
import { FileLoaderFunction } from "../utils/fileLoaders";

export interface IConfig {
  header?: IHeaderConfig;
  loadingRenderer?: ILoadingRendererConfig;
  noRenderer?: INoRendererConfig;
}

export interface ILoadingRendererConfig {
  overrideComponent?: ComponentType;
}

export interface INoRendererConfig {
  overrideComponent?: ComponentType;
}

export interface IHeaderConfig {
  disableHeader?: boolean;
  disableFileName?: boolean;
  retainURLParams?: boolean;
  overrideComponent?: IHeaderOverride;
}

export type IHeaderOverride = (
  state: IMainState,
  previousDocument: () => void,
  nextDocument: () => void
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

export interface IRenderSettings {
  loaded: boolean;
  zoomLevel: number;
  paginated: boolean;
  pagesCount: number;
  currentPage: number;
  rotationAngle: number;
  fitType: "width" | "height" | "page";
}

export interface IStyledProps extends ThemedStyledProps<any, any> {
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
export interface DocRenderer extends FC<DocRendererProps> {
  fileTypes: string[];
  weight: number;
  fileLoader?: FileLoaderFunction | null | undefined;
}
