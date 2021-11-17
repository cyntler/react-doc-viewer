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
var react_1 = __importStar(require("react"));
var react_pdf_1 = require("react-pdf");
var styled_components_1 = __importDefault(require("styled-components"));
var state_1 = require("../../state");
var actions_1 = require("../../state/actions");
var reducer_1 = require("../../state/reducer");
var PDFAllPages_1 = require("./PDFAllPages");
var PDFSinglePage_1 = __importDefault(require("./PDFSinglePage"));
var PDFPages = function () {
    var _a = react_1.useContext(state_1.PDFContext), _b = _a.state, mainState = _b.mainState, paginated = _b.paginated, dispatch = _a.dispatch;
    var currentDocument = (mainState === null || mainState === void 0 ? void 0 : mainState.currentDocument) || null;
    react_1.useEffect(function () {
        dispatch(actions_1.setNumPages(reducer_1.initialPDFState.numPages));
    }, [currentDocument]);
    if (!currentDocument || currentDocument.fileData === undefined)
        return null;
    return (react_1.default.createElement(DocumentPDF, { file: currentDocument.fileData, onLoadSuccess: function (_a) {
            var numPages = _a.numPages;
            return dispatch(actions_1.setNumPages(numPages));
        }, loading: react_1.default.createElement("span", null, "Loading...") }, paginated ? react_1.default.createElement(PDFSinglePage_1.default, null) : react_1.default.createElement(PDFAllPages_1.PDFAllPages, null)));
};
var DocumentPDF = styled_components_1.default(react_pdf_1.Document)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  margin: 0 auto;\n"], ["\n  display: flex;\n  flex-direction: column;\n  margin: 0 auto;\n"])));
exports.default = PDFPages;
var templateObject_1;
