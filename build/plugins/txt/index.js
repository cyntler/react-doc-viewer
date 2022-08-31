var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React from "react";
import styled from "styled-components";
import { textFileLoader } from "../../utils/fileLoaders";
var Container = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 100%;\n  height: 100%;\n  background: #fff;\n\n  pre {\n    max-width: 100%;\n    font-family: monospace;\n    font-size: 14px;\n    padding: 30px;\n    background: #fff;\n  }\n"], ["\n  width: 100%;\n  height: 100%;\n  background: #fff;\n\n  pre {\n    max-width: 100%;\n    font-family: monospace;\n    font-size: 14px;\n    padding: 30px;\n    background: #fff;\n  }\n"])));
var TXTRenderer = function (_a) {
    var currentDocument = _a.mainState.currentDocument;
    return (React.createElement(Container, { id: "txt-renderer" },
        React.createElement("pre", null, currentDocument === null || currentDocument === void 0 ? void 0 : currentDocument.fileData)));
};
export default TXTRenderer;
TXTRenderer.fileTypes = [
    "text/",
    "application/javascript",
    "application/ecmascript",
    "application/xhtml+xml",
    "application/rtf",
    "application/x-httpd-php",
    "application/json",
    "application/rls-services+xml",
];
TXTRenderer.weight = 0;
TXTRenderer.fileLoader = textFileLoader;
var templateObject_1;
