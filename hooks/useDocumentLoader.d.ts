import { Dispatch } from '../../node_modules/react';
import { MainStateActions } from '../store/actions';
import { IMainState } from '../store/mainStateReducer';
import { DocRenderer } from '..';

/**
 * Custom Hook for loading the current document into context
 */
export declare const useDocumentLoader: () => {
    state: IMainState;
    dispatch: Dispatch<MainStateActions>;
    CurrentRenderer: DocRenderer | null | undefined;
};
