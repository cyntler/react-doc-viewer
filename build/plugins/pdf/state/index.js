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
exports.PDFProvider = exports.PDFContext = void 0;
var react_1 = __importStar(require("react"));
var reducer_1 = require("./reducer");
var PDFContext = react_1.createContext({ state: reducer_1.initialPDFState, dispatch: function () { return null; } });
exports.PDFContext = PDFContext;
var PDFProvider = function (_a) {
    var children = _a.children, mainState = _a.mainState;
    var _b = react_1.useReducer(reducer_1.reducer, __assign(__assign({}, reducer_1.initialPDFState), { mainState: mainState })), state = _b[0], dispatch = _b[1];
    return (react_1.default.createElement(PDFContext.Provider, { value: { state: state, dispatch: dispatch } }, children));
};
exports.PDFProvider = PDFProvider;
