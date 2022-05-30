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
import React from "react";
import styled from "styled-components";
var ImageProxyRenderer = function (props) {
    var currentDocument = props.mainState.currentDocument, children = props.children;
    if (!currentDocument)
        return null;
    return (React.createElement(Container, __assign({ id: "image-renderer" }, props), children || (React.createElement(Img, { id: "image-img", src: currentDocument.fileData }))));
};
export default ImageProxyRenderer;
ImageProxyRenderer.fileTypes = [];
ImageProxyRenderer.weight = 0;
var Container = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex: 1;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n  background-color: #fff;\n"], ["\n  display: flex;\n  flex: 1;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n  background-color: #fff;\n"])));
var Img = styled.img(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  max-width: 95%;\n  max-height: 95%;\n"], ["\n  max-width: 95%;\n  max-height: 95%;\n"])));
var templateObject_1, templateObject_2;
