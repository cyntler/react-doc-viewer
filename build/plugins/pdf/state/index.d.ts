import React, { Dispatch, FC } from "react";
import { IMainState } from "../../../state/reducer";
import { PDFActions } from "./actions";
import { IPDFState } from "./reducer";
declare const PDFContext: React.Context<{
    state: IPDFState;
    dispatch: Dispatch<PDFActions>;
}>;
declare const PDFProvider: FC<{
    mainState: IMainState;
}>;
export { PDFContext, PDFProvider };
