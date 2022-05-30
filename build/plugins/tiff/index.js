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
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { arrayBufferFileLoader } from "../../utils/fileLoaders";
import ImageProxyRenderer from "../image";
import { parseTIFF } from "./tiffToCanvas";
var TIFFRenderer = function (props) {
    var currentDocument = props.mainState.currentDocument;
    var _a = useState(false), loadedCanvas = _a[0], setLoadedCanvas = _a[1];
    var _b = useState(false), corruptedFile = _b[0], setCorruptedFile = _b[1];
    useEffect(function () {
        if (!currentDocument || loadedCanvas)
            return;
        var canvas = document.getElementById("tiff-img");
        try {
            canvas && parseTIFF(currentDocument.fileData, canvas);
            setLoadedCanvas(true);
        }
        catch (error) {
            setCorruptedFile(true);
        }
    }, [currentDocument, loadedCanvas]);
    if (corruptedFile) {
        return (React.createElement(ImageProxyRenderer, __assign({}, props),
            React.createElement("div", null, "Your file is corrupted. Please check it on your machine.")));
    }
    return (React.createElement(ImageProxyRenderer, __assign({}, props),
        React.createElement(Canvas, { id: "tiff-img" })));
};
TIFFRenderer.fileTypes = ["tif", "tiff", "image/tif", "image/tiff"];
TIFFRenderer.weight = 0;
TIFFRenderer.fileLoader = arrayBufferFileLoader;
export default TIFFRenderer;
var Canvas = styled.canvas(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  max-width: 95%;\n  max-height: 95%;\n"], ["\n  max-width: 95%;\n  max-height: 95%;\n"])));
var templateObject_1;
