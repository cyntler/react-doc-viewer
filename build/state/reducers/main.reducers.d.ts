import { DocRenderer, IConfig, IDocument } from "../../types";
import { MainStateActions } from "../actions/main.actions";
export declare type IMainState = {
    currentFileNo: number;
    documents: IDocument[];
    documentLoading?: boolean;
    currentDocument?: IDocument;
    rendererRect?: DOMRect;
    config?: IConfig;
    pluginRenderers?: DocRenderer[];
    prefetchMethod?: string;
};
export declare const initialState: IMainState;
export declare type MainStateReducer = (state: IMainState, action: MainStateActions) => IMainState;
export declare const mainStateReducer: MainStateReducer;
