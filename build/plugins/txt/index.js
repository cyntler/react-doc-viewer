var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React from "react";
import styled from "styled-components";
import { textFileLoader } from "../../utils/fileLoaders";
var TXTRenderer = function (_a) {
    var currentDocument = _a.mainState.currentDocument;
    return React.createElement(Container, { id: "txt-renderer" }, currentDocument === null || currentDocument === void 0 ? void 0 : currentDocument.fileData);
};
export default TXTRenderer;
TXTRenderer.fileTypes = ["txt", "text/plain"];
TXTRenderer.weight = 0;
TXTRenderer.fileLoader = textFileLoader;
var Container = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  padding: 30px;\n"], ["\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  padding: 30px;\n"])));
var templateObject_1;
