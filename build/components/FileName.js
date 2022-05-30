var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React, { useContext } from "react";
import styled from "styled-components";
import { DocViewerContext } from "../state";
export var FileName = function () {
    var _a, _b;
    var _c = useContext(DocViewerContext).state, config = _c.config, currentDocument = _c.currentDocument;
    if (!currentDocument || ((_a = config === null || config === void 0 ? void 0 : config.header) === null || _a === void 0 ? void 0 : _a.disableFileName))
        return null;
    var fileName = "";
    if (currentDocument.fileName) {
        fileName = currentDocument.fileName;
    }
    else {
        fileName = currentDocument.uri || "";
        fileName = decodeURI(fileName);
        if (!((_b = config === null || config === void 0 ? void 0 : config.header) === null || _b === void 0 ? void 0 : _b.retainURLParams)) {
            fileName = fileName.split("?")[0];
        }
        var splitURL = fileName.split("/");
        if (splitURL.length) {
            fileName = splitURL[splitURL.length - 1];
        }
    }
    return (React.createElement(Container, { id: "file-name", "data-testid": "file-name" }, fileName));
};
var Container = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  flex: 1;\n  text-align: left;\n  color: ", ";\n  font-weight: bold;\n  margin: 0 10px;\n  overflow: hidden;\n"], ["\n  flex: 1;\n  text-align: left;\n  color: ", ";\n  font-weight: bold;\n  margin: 0 10px;\n  overflow: hidden;\n"])), function (props) { return props.theme.textPrimary; });
var templateObject_1;
