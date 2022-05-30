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
import styled, { ThemeProvider } from "styled-components";
import { HeaderBar } from "./components/HeaderBar";
import { ProxyRenderer } from "./components/ProxyRenderer";
import BMPRenderer from "./plugins/bmp";
import HTMLRenderer from "./plugins/html";
import ImageProxyRenderer from "./plugins/image";
import JPGRenderer from "./plugins/jpg";
import MSDocRenderer from "./plugins/msdoc";
import MSGRenderer from "./plugins/msg";
import PDFRenderer from "./plugins/pdf";
import PNGRenderer from "./plugins/png";
import TIFFRenderer from "./plugins/tiff";
import TXTRenderer from "./plugins/txt";
import { AppProvider, RenderProvider } from "./state";
import { defaultTheme } from "./theme";
import onLoadCallback from "./utils/onLoadCallback";
var DocViewer = function (_a) {
    var onLoaded = _a.onLoaded, props = __rest(_a, ["onLoaded"]);
    onLoadCallback(onLoaded);
    var renderSettings = props.renderSettings, appProps = __rest(props, ["renderSettings"]);
    var appProviderProps = React.useState(appProps)[0];
    if (!appProps.documents || appProps.documents === undefined) {
        throw new Error("Please provide an array of documents to DocViewer!");
    }
    return (React.createElement(AppProvider, __assign({}, appProviderProps),
        React.createElement(ThemeProvider, { theme: appProps.theme ? __assign(__assign({}, defaultTheme), appProps.theme) : defaultTheme },
            React.createElement(RenderProvider, { renderSettings: renderSettings },
                React.createElement(Container, __assign({ id: "react-doc-viewer", "data-testid": "react-doc-viewer" }, props),
                    React.createElement(HeaderBar, null),
                    React.createElement(ProxyRenderer, null))))));
};
export default DocViewer;
var Container = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  background: #ffffff;\n"], ["\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  background: #ffffff;\n"])));
export { DocViewerRenderers } from "./plugins";
export * from "./types";
export * from "./utils/fileLoaders";
export { BMPRenderer, HTMLRenderer, ImageProxyRenderer, JPGRenderer, MSDocRenderer, MSGRenderer, PDFRenderer, PNGRenderer, TIFFRenderer, TXTRenderer, };
var templateObject_1;
