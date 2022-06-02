var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { createContext, useEffect, useReducer, } from "react";
import { setAllDocuments, setMainConfig } from "./actions/main.actions";
import { initialState, mainStateReducer, } from "./reducers/main.reducers";
import { initialRenderSettingsState, renderSettingsReducer } from "./reducers/render.reducers";
var DocViewerContext = createContext({ state: initialState, dispatch: function () { return null; } });
var RenderContext = createContext({ state: initialRenderSettingsState, dispatch: function () { return null; } });
var RenderProvider = function (_a) {
    var children = _a.children;
    var _b = useReducer(renderSettingsReducer, initialRenderSettingsState), state = _b[0], dispatch = _b[1];
    return (React.createElement(RenderContext.Provider, { value: { state: state, dispatch: dispatch } }, children));
};
var AppProvider = function (props) {
    var children = props.children, documents = props.documents, config = props.config, pluginRenderers = props.pluginRenderers, prefetchMethod = props.prefetchMethod;
    var _a = useReducer(mainStateReducer, __assign(__assign({}, initialState), { documents: documents || [], currentDocument: documents && documents.length ? documents[0] : undefined, config: config,
        pluginRenderers: pluginRenderers,
        prefetchMethod: prefetchMethod })), state = _a[0], dispatch = _a[1];
    useEffect(function () {
        dispatch(setAllDocuments(documents));
        config && dispatch(setMainConfig(config));
    }, [documents, config]);
    return (React.createElement(DocViewerContext.Provider, { value: { state: state, dispatch: dispatch } }, children));
};
export { RenderProvider, RenderContext, DocViewerContext, AppProvider };
