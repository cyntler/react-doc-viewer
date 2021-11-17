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
var fileLoaders_1 = require("../../utils/fileLoaders");
var HTMLRenderer = function (_a) {
    var currentDocument = _a.mainState.currentDocument;
    react_1.useEffect(function () {
        var b64String = currentDocument === null || currentDocument === void 0 ? void 0 : currentDocument.fileData;
        var bodyBase64 = (b64String === null || b64String === void 0 ? void 0 : b64String.replace("data:text/html;base64,", "")) || "";
        var body = window.atob(bodyBase64);
        var iframeCont = document.getElementById("html-body");
        var iframe = (iframeCont === null || iframeCont === void 0 ? void 0 : iframeCont.contentWindow) && iframeCont.contentWindow;
        if (!iframe)
            return;
        var iframeDoc = iframe.document;
        iframeDoc.open();
        iframeDoc.write("" + body);
        iframeDoc.close();
    }, []);
    return (react_1.default.createElement(Container, { id: "html-renderer" },
        react_1.default.createElement(BodyIFrame, { id: "html-body", sandbox: "allow-same-origin" })));
};
exports.default = HTMLRenderer;
HTMLRenderer.fileTypes = ["htm", "html", "text/htm", "text/html"];
HTMLRenderer.weight = 0;
HTMLRenderer.fileLoader = fileLoaders_1.dataURLFileLoader;
var Container = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  padding: 0 30px;\n"], ["\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  padding: 0 30px;\n"])));
var BodyIFrame = styled_components_1.default.iframe(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  height: 100%;\n  padding: 15px;\n  margin: 20px 0 20px 0;\n  border: 1px solid ", ";\n"], ["\n  height: 100%;\n  padding: 15px;\n  margin: 20px 0 20px 0;\n  border: 1px solid ", ";\n"])), function (props) { return props.theme.secondary; });
var templateObject_1, templateObject_2;
