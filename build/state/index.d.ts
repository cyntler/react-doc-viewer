import React, { Dispatch, FC } from "react";
import { DocViewerProps } from "..";
import { IRenderSettings } from "../types";
import { RenderStateActions } from "./actions/render.actions";
import { MainStateActions } from "./actions/main.actions";
import { IMainState } from "./reducers/main.reducers";
declare const DocViewerContext: React.Context<{
    state: IMainState;
    dispatch: Dispatch<MainStateActions>;
}>;
declare const RenderContext: React.Context<{
    state: IRenderSettings;
    dispatch: Dispatch<RenderStateActions>;
}>;
declare const RenderProvider: FC<{}>;
declare const AppProvider: FC<Omit<DocViewerProps, "renderSettings">>;
export { RenderProvider, RenderContext, DocViewerContext, AppProvider };
