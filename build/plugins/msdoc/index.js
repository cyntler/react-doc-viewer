"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var styled_components_1 = __importDefault(require("styled-components"));
var MSDocRenderer = function (_a) {
    var currentDocument = _a.mainState.currentDocument;
    if (!currentDocument)
        return null;
    return (react_1.default.createElement(Container, { id: "msdoc-renderer" },
        react_1.default.createElement(IFrame, { id: "msdoc-iframe", title: "msdoc-iframe", src: "https://view.officeapps.live.com/op/embed.aspx?src=" + encodeURIComponent(currentDocument.uri), frameBorder: "0" })));
};
exports.default = MSDocRenderer;
var MSDocFTMaps = {
    doc: ["doc", "application/msword"],
    docx: [
        "docx",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
    xls: ["xls", "application/vnd.ms-excel"],
    xlsx: [
        "xlsx",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ],
    ppt: ["ppt", "application/vnd.ms-powerpoint"],
    pptx: [
        "pptx",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ],
};
MSDocRenderer.fileTypes = __spreadArrays(MSDocFTMaps.doc, MSDocFTMaps.docx, MSDocFTMaps.xls, MSDocFTMaps.xlsx, MSDocFTMaps.ppt, MSDocFTMaps.pptx);
MSDocRenderer.weight = 0;
MSDocRenderer.fileLoader = function (_a) {
    var fileLoaderComplete = _a.fileLoaderComplete;
    return fileLoaderComplete();
};
var Container = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 100%;\n"], ["\n  width: 100%;\n"])));
var IFrame = styled_components_1.default.iframe(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width: 100%;\n  height: 100%;\n  border: 0;\n"], ["\n  width: 100%;\n  height: 100%;\n  border: 0;\n"])));
var templateObject_1, templateObject_2;
