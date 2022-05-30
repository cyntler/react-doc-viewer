import { Dispatch } from "react";
import { MainStateActions } from "../state/actions/main.actions";
import { IMainState } from "../state/reducers/main.reducers";
import { DocRenderer } from "../types";
/**
 * Custom Hook for loading the current document into context
 */
export declare const useDocumentLoader: () => {
    state: IMainState;
    dispatch: Dispatch<MainStateActions>;
    CurrentRenderer: DocRenderer | null | undefined;
};
