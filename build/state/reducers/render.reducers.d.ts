import { IRenderSettings } from "../../types";
import { RenderStateActions } from "../actions/render.actions";
export declare const initialRenderSettingsState: IRenderSettings;
export declare type RenderSettingsStateReducer = (state: IRenderSettings, action: RenderStateActions) => IRenderSettings;
export declare const renderSettingsReducer: RenderSettingsStateReducer;
