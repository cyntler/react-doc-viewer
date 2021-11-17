import { FC, ReactElement } from "react";
import { ThemedStyledProps } from "styled-components";
import { IMainState } from "../state/reducer";
import { FileLoaderFunction } from "../utils/fileLoaders";
export interface IConfig {
    header?: IHeaderConfig;
}
export interface IHeaderConfig {
    disableHeader?: boolean;
    disableFileName?: boolean;
    retainURLParams?: boolean;
    overrideComponent?: IHeaderOverride;
}
export declare type IHeaderOverride = (state: IMainState, previousDocument: () => void, nextDocument: () => void) => ReactElement<any, any> | null;
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
export interface IDocument {
    uri: string;
    fileType?: string;
    fileData?: string | ArrayBuffer;
}
export interface DocRendererProps {
    mainState: IMainState;
}
export interface DocRenderer extends FC<DocRendererProps> {
    fileTypes: string[];
    weight: number;
    fileLoader?: FileLoaderFunction | null | undefined;
}
