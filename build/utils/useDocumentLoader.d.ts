import { Dispatch } from "react";
import { MainStateActions } from "../state/actions";
import { IMainState } from "../state/reducer";
import { DocRenderer } from "../types";
/**
 * Custom Hook for loading the current document into context
 */
export declare const useDocumentLoader: () => {
    state: IMainState;
    dispatch: Dispatch<MainStateActions>;
    CurrentRenderer: DocRenderer | null | undefined;
};
