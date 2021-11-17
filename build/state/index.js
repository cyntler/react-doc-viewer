"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppProvider = exports.DocViewerContext = void 0;
var react_1 = __importStar(require("react"));
var actions_1 = require("./actions");
var reducer_1 = require("./reducer");
var DocViewerContext = react_1.createContext({ state: reducer_1.initialState, dispatch: function () { return null; } });
exports.DocViewerContext = DocViewerContext;
var AppProvider = function (props) {
    var children = props.children, documents = props.documents, config = props.config, pluginRenderers = props.pluginRenderers;
    var _a = react_1.useReducer(reducer_1.mainStateReducer, __assign(__assign({}, reducer_1.initialState), { documents: documents || [], currentDocument: documents && documents.length ? documents[0] : undefined, config: config,
        pluginRenderers: pluginRenderers })), state = _a[0], dispatch = _a[1];
    // On inital load, and whenever they change,
    // replace documents with the new props passed in
    react_1.useEffect(function () {
        dispatch(actions_1.setAllDocuments(documents));
        config && dispatch(actions_1.setMainConfig(config));
    }, [documents]);
    return (react_1.default.createElement(DocViewerContext.Provider, { value: { state: state, dispatch: dispatch } }, children));
};
exports.AppProvider = AppProvider;
