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
import ImageProxyRenderer from "../image";
var JPGRenderer = function (props) { return React.createElement(ImageProxyRenderer, __assign({}, props)); };
JPGRenderer.fileTypes = ["jpg", "jpeg", "image/jpg", "image/jpeg"];
JPGRenderer.weight = 0;
export default JPGRenderer;
