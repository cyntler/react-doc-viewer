"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TXTRenderer = exports.TIFFRenderer = exports.PNGRenderer = exports.PDFRenderer = exports.MSGRenderer = exports.MSDocRenderer = exports.JPGRenderer = exports.ImageProxyRenderer = exports.HTMLRenderer = exports.BMPRenderer = void 0;
var react_1 = __importDefault(require("react"));
var styled_components_1 = __importStar(require("styled-components"));
var HeaderBar_1 = require("./components/HeaderBar");
var ProxyRenderer_1 = require("./components/ProxyRenderer");
var bmp_1 = __importDefault(require("./plugins/bmp"));
exports.BMPRenderer = bmp_1.default;
var html_1 = __importDefault(require("./plugins/html"));
exports.HTMLRenderer = html_1.default;
var image_1 = __importDefault(require("./plugins/image"));
exports.ImageProxyRenderer = image_1.default;
var jpg_1 = __importDefault(require("./plugins/jpg"));
exports.JPGRenderer = jpg_1.default;
var msdoc_1 = __importDefault(require("./plugins/msdoc"));
exports.MSDocRenderer = msdoc_1.default;
var msg_1 = __importDefault(require("./plugins/msg"));
exports.MSGRenderer = msg_1.default;
var pdf_1 = __importDefault(require("./plugins/pdf"));
exports.PDFRenderer = pdf_1.default;
var png_1 = __importDefault(require("./plugins/png"));
exports.PNGRenderer = png_1.default;
var tiff_1 = __importDefault(require("./plugins/tiff"));
exports.TIFFRenderer = tiff_1.default;
var txt_1 = __importDefault(require("./plugins/txt"));
exports.TXTRenderer = txt_1.default;
var state_1 = require("./state");
var theme_1 = require("./theme");
var DocViewer = function (props) {
    var documents = props.documents, theme = props.theme;
    if (!documents || documents === undefined) {
        throw new Error("Please provide an array of documents to DocViewer.\ne.g. <DocViewer documents={[ { uri: 'https://mypdf.pdf' } ]} />");
    }
    return (react_1.default.createElement(state_1.AppProvider, __assign({}, props),
        react_1.default.createElement(styled_components_1.ThemeProvider, { theme: theme ? __assign(__assign({}, theme_1.defaultTheme), theme) : theme_1.defaultTheme },
            react_1.default.createElement(Container, __assign({ id: "react-doc-viewer", "data-testid": "react-doc-viewer" }, props),
                react_1.default.createElement(HeaderBar_1.HeaderBar, null),
                react_1.default.createElement(ProxyRenderer_1.ProxyRenderer, null)))));
};
exports.default = DocViewer;
var Container = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  background: #eee;\n"], ["\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  background: #eee;\n"])));
var plugins_1 = require("./plugins");
Object.defineProperty(exports, "DocViewerRenderers", { enumerable: true, get: function () { return plugins_1.DocViewerRenderers; } });
__exportStar(require("./types"), exports);
__exportStar(require("./utils/fileLoaders"), exports);
var templateObject_1;
