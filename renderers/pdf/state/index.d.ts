import { default as React, Dispatch, FC, PropsWithChildren } from '../../../../node_modules/react';
import { IMainState } from '../../../store/mainStateReducer';
import { PDFActions } from './actions';
import { IPDFState } from './reducer';

declare const PDFContext: React.Context<{
    state: IPDFState;
    dispatch: Dispatch<PDFActions>;
}>;
declare const PDFProvider: FC<PropsWithChildren<{
    mainState: IMainState;
}>>;
export { PDFContext, PDFProvider };
