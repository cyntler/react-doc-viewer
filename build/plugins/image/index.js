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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from "react";
import styled from "styled-components";
import { RenderContext } from "../../state";
import { setDocumentRenderSettings } from "../../state/actions/render.actions";
var Container = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex: 1;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n"], ["\n  display: flex;\n  flex: 1;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n"])));
var Img = styled.img(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  max-width: 95%;\n  max-height: 95%;\n"], ["\n  max-width: 95%;\n  max-height: 95%;\n"])));
var ImageProxyRenderer = function (props) {
    var currentDocument = props.mainState.currentDocument, onLoaded = props.onLoaded, children = props.children, otherProps = __rest(props, ["mainState", "onLoaded", "children"]);
    var _a = React.useContext(RenderContext), state = _a.state, dispatch = _a.dispatch;
    if (!currentDocument)
        return null;
    var onImageLoad = function () {
        dispatch(setDocumentRenderSettings({
            paginated: false,
            pagesCount: 0,
            loaded: true,
            currentPage: 0,
            fitType: "page",
            zoomLevel: 1,
            rotationAngle: 0,
        }));
        onLoaded();
    };
    return (React.createElement(Container, __assign({ id: "image-renderer" }, otherProps), children || (React.createElement(Img, { id: "image-img", style: {
            transform: "scale(" + state.zoomLevel + ") rotate(" + state.rotationAngle + "deg)",
        }, src: currentDocument.fileData, onLoad: onImageLoad }))));
};
export default ImageProxyRenderer;
ImageProxyRenderer.fileTypes = [];
ImageProxyRenderer.weight = 0;
var templateObject_1, templateObject_2;
