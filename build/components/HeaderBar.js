"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeaderBar = void 0;
var react_1 = __importStar(require("react"));
var styled_components_1 = __importDefault(require("styled-components"));
var state_1 = require("../state");
var actions_1 = require("../state/actions");
var DocumentNav_1 = require("./DocumentNav");
var FileName_1 = require("./FileName");
exports.HeaderBar = function () {
    var _a, _b, _c;
    var _d = react_1.useContext(state_1.DocViewerContext), state = _d.state, dispatch = _d.dispatch;
    var config = state.config;
    if ((_a = config === null || config === void 0 ? void 0 : config.header) === null || _a === void 0 ? void 0 : _a.disableHeader)
        return null;
    var override = (_c = (_b = config === null || config === void 0 ? void 0 : config.header) === null || _b === void 0 ? void 0 : _b.overrideComponent) === null || _c === void 0 ? void 0 : _c.call(_b, state, function () { return dispatch(actions_1.previousDocument()); }, function () { return dispatch(actions_1.nextDocument()); });
    if (override) {
        return override;
    }
    else {
        return (react_1.default.createElement(Container, { id: "header-bar", "data-testid": "header-bar" },
            react_1.default.createElement(FileName_1.FileName, null),
            react_1.default.createElement(DocumentNav_1.DocumentNav, null)));
    }
};
var Container = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  z-index: 1;\n  padding: 0 10px;\n  background-color: ", ";\n  font-size: 16px;\n  min-height: 50px;\n\n  @media (max-width: 768px) {\n    min-height: 30px;\n    padding: 5px;\n    font-size: 10px;\n  }\n"], ["\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  z-index: 1;\n  padding: 0 10px;\n  background-color: ", ";\n  font-size: 16px;\n  min-height: 50px;\n\n  @media (max-width: 768px) {\n    min-height: 30px;\n    padding: 5px;\n    font-size: 10px;\n  }\n"])), function (props) { return props.theme.primary; });
var templateObject_1;
