var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React from "react";
import styled from "styled-components";
var MSDocRenderer = function (_a) {
    var currentDocument = _a.mainState.currentDocument;
    if (!currentDocument)
        return null;
    return (React.createElement(Container, { id: "msdoc-renderer" },
        React.createElement(IFrame, { id: "msdoc-iframe", title: "msdoc-iframe", src: "https://view.officeapps.live.com/op/embed.aspx?src=" + encodeURIComponent(currentDocument.uri), frameBorder: "0" })));
};
export default MSDocRenderer;
var MSDocFTMaps = {
    doc: ["application/msword"],
    docx: [
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/octet-stream",
    ],
    xls: ["application/vnd.ms-excel"],
    xlsx: ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
};
MSDocRenderer.fileTypes = __spreadArrays(MSDocFTMaps.doc, MSDocFTMaps.docx, MSDocFTMaps.xls, MSDocFTMaps.xlsx);
MSDocRenderer.weight = 0;
MSDocRenderer.fileLoader = function (_a) {
    var fileLoaderComplete = _a.fileLoaderComplete;
    return fileLoaderComplete();
};
var Container = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 100%;\n"], ["\n  width: 100%;\n"])));
var IFrame = styled.iframe(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width: 100%;\n  height: 100%;\n  border: 0;\n"], ["\n  width: 100%;\n  height: 100%;\n  border: 0;\n"])));
var templateObject_1, templateObject_2;
