import { DocRenderer, IConfig, IDocument } from '..';
import { MainStateActions } from './actions';
import { AvailableLanguages } from '../i18n';

export type IMainState = {
    currentFileNo: number;
    documents: IDocument[];
    documentLoading?: boolean;
    currentDocument?: IDocument;
    rendererRect?: DOMRect;
    config?: IConfig;
    pluginRenderers?: DocRenderer[];
    prefetchMethod?: string;
    requestHeaders?: Record<string, string>;
    language: AvailableLanguages;
    activeDocument?: IDocument;
    onDocumentChange?: (document: IDocument) => void;
};
export declare const initialState: IMainState;
export type MainStateReducer = (state: IMainState, action: MainStateActions) => IMainState;
export declare const mainStateReducer: MainStateReducer;
