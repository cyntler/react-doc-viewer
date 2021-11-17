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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var styled_components_1 = __importDefault(require("styled-components"));
var fileLoaders_1 = require("../../utils/fileLoaders");
var image_1 = __importDefault(require("../image"));
var tiffToCanvas_1 = require("./tiffToCanvas");
var TIFFRenderer = function (props) {
    var currentDocument = props.mainState.currentDocument;
    var _a = react_1.useState(false), loadedCanvas = _a[0], setLoadedCanvas = _a[1];
    var _b = react_1.useState(false), corruptedFile = _b[0], setCorruptedFile = _b[1];
    react_1.useEffect(function () {
        if (!currentDocument || loadedCanvas)
            return;
        var canvas = document.getElementById("tiff-img");
        try {
            canvas && tiffToCanvas_1.parseTIFF(currentDocument.fileData, canvas);
            setLoadedCanvas(true);
        }
        catch (error) {
            setCorruptedFile(true);
        }
    }, []);
    if (corruptedFile) {
        return (react_1.default.createElement(image_1.default, __assign({}, props),
            react_1.default.createElement("div", null, "Your file is corrupted. Please check it on your machine.")));
    }
    return (react_1.default.createElement(image_1.default, __assign({}, props),
        react_1.default.createElement(Canvas, { id: "tiff-img" })));
};
TIFFRenderer.fileTypes = ["tif", "tiff", "image/tif", "image/tiff"];
TIFFRenderer.weight = 0;
TIFFRenderer.fileLoader = fileLoaders_1.arrayBufferFileLoader;
exports.default = TIFFRenderer;
var Canvas = styled_components_1.default.canvas(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  max-width: 95%;\n  max-height: 95%;\n"], ["\n  max-width: 95%;\n  max-height: 95%;\n"])));
var templateObject_1;
