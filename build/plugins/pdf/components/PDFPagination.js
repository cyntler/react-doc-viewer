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
var styled_components_1 = __importDefault(require("styled-components"));
var common_1 = require("../../../components/common");
var state_1 = require("../state");
var actions_1 = require("../state/actions");
var icons_1 = require("./icons");
var PDFPagination = function () {
    var _a = react_1.useContext(state_1.PDFContext), _b = _a.state, currentPage = _b.currentPage, numPages = _b.numPages, dispatch = _a.dispatch;
    return (react_1.default.createElement(Container, { id: "pdf-pagination" },
        react_1.default.createElement(PageNavButtonLeft, { id: "pdf-pagination-prev", onClick: function () { return dispatch(actions_1.setCurrentPage(currentPage - 1)); }, disabled: currentPage === 1 },
            react_1.default.createElement(icons_1.PrevPDFNavIcon, { color: "#000", size: "50%" })),
        react_1.default.createElement(PageTag, { id: "pdf-pagination-info" },
            "Page ",
            currentPage,
            "/",
            numPages),
        react_1.default.createElement(PageNavButtonRight, { id: "pdf-pagination-next", onClick: function () { return dispatch(actions_1.setCurrentPage(currentPage + 1)); }, disabled: currentPage >= numPages },
            react_1.default.createElement(icons_1.NextPDFNavIcon, { color: "#000", size: "50%" }))));
};
exports.default = PDFPagination;
var Container = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n"], ["\n  display: flex;\n  align-items: center;\n"])));
var PageNavButtonLeft = styled_components_1.default(common_1.Button)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width: 30px;\n  height: 30px;\n  margin: 0 5px;\n\n  @media (max-width: 768px) {\n    width: 25px;\n    height: 25px;\n  }\n"], ["\n  width: 30px;\n  height: 30px;\n  margin: 0 5px;\n\n  @media (max-width: 768px) {\n    width: 25px;\n    height: 25px;\n  }\n"])));
var PageNavButtonRight = styled_components_1.default(PageNavButtonLeft)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  margin: 0 20px 0 5px;\n"], ["\n  margin: 0 20px 0 5px;\n"])));
var PageTag = styled_components_1.default.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  color: ", ";\n  font-size: 14px;\n  text-align: left;\n\n  @media (max-width: 768px) {\n    font-size: 10px;\n  }\n"], ["\n  color: ", ";\n  font-size: 14px;\n  text-align: left;\n\n  @media (max-width: 768px) {\n    font-size: 10px;\n  }\n"])), function (props) { return props.theme.text_primary; });
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
