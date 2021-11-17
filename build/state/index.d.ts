import React, { Dispatch, FC } from "react";
import { DocViewerProps } from "..";
import { MainStateActions } from "./actions";
import { IMainState } from "./reducer";
declare const DocViewerContext: React.Context<{
    state: IMainState;
    dispatch: Dispatch<MainStateActions>;
}>;
declare const AppProvider: FC<DocViewerProps>;
export { DocViewerContext, AppProvider };
