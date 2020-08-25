import { FC } from "react";
import { ThemedStyledProps } from "styled-components";

export interface IConfig {
  header?: IHeaderConfig;
}
export interface IHeaderConfig {
  disableHeader?: boolean;
  disableFileName?: boolean;
}
export interface ITheme {
  primary?: string;
  secondary?: string;
  tertiary?: string;
  text_primary?: string;
  text_secondary?: string;
  text_tertiary?: string;
  disableThemeScrollbar?: boolean;
}

export interface IStyledProps extends ThemedStyledProps<any, any> {
  theme: ITheme;
}

export type FileType =
  | "application/pdf"
  | "image/png"
  | "image/jpg"
  | "image/gif"
  | "image/jpeg";

export interface IDocument {
  uri: string;
  fileType?: FileType;
  base64Data?: string;
}

export interface DocRenderer extends FC<{}> {
  fileTypes: FileType[];
  priority: number;
}
