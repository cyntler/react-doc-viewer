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
import React, { useState } from "react";
import { render } from "react-dom";
import styled from "styled-components";
import DocViewer, { DocViewerRenderers } from ".";
var Container = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: relative;\n\n  .dock-bar-container { \n    position: absolute;\n    bottom: 20px;\n    width: 100%;\n \n    .dock-bar { \n      margin: 0 auto;\n      max-width: 400px;\n      padding: 10px 20px;\n      border-radius: 3px;\n      color: #fff;\n      background: rgba(0, 0, 0, .5);\n\n      display: flex;\n      justify-content: center;\n      gap: 8px;\n\n      button { \n        border: none;\n        border-radius: 3px;\n        font-family: \"Roboto\", sans-serif;\n\n        &:hover { \n          background: #ccc;\n        }\n      }\n    }\n  }\n"], ["\n  position: relative;\n\n  .dock-bar-container { \n    position: absolute;\n    bottom: 20px;\n    width: 100%;\n \n    .dock-bar { \n      margin: 0 auto;\n      max-width: 400px;\n      padding: 10px 20px;\n      border-radius: 3px;\n      color: #fff;\n      background: rgba(0, 0, 0, .5);\n\n      display: flex;\n      justify-content: center;\n      gap: 8px;\n\n      button { \n        border: none;\n        border-radius: 3px;\n        font-family: \"Roboto\", sans-serif;\n\n        &:hover { \n          background: #ccc;\n        }\n      }\n    }\n  }\n"])));
var App = function () {
    var docs = [
        { uri: require("./examples/example-pdf.pdf") },
    ];
    var _a = useState(), controller = _a[0], setController = _a[1];
    var _b = useState(), settings = _b[0], setSettings = _b[1];
    React.useEffect(function () {
        if (!settings || !controller)
            return;
        controller.update(settings);
    }, [settings]);
    var changeSettings = function (key, value) {
        var _a;
        if (settings) {
            setSettings(__assign(__assign({}, settings), (_a = {}, _a[key] = value, _a)));
        }
    };
    return (React.createElement(Container, null,
        React.createElement(DocViewer, { documents: docs, pluginRenderers: DocViewerRenderers, onLoaded: function (data) {
                setSettings(data.state);
                setController(data.controller);
            }, onChange: function (state) {
                setSettings(state);
            }, config: {
                noRenderer: {
                    overrideComponent: function () { return React.createElement("div", null); },
                },
            } }),
        Boolean(settings && controller) && (React.createElement("div", { className: "dock-bar-container" },
            React.createElement("div", { className: "dock-bar" },
                React.createElement("div", { className: "dock-bar-item" },
                    React.createElement("button", { onClick: function () { return changeSettings("currentPage", settings.currentPage - 1); } }, "prev")),
                React.createElement("div", { className: "dock-bar-item" }, "Page " + settings.currentPage + "/" + settings.pagesCount),
                React.createElement("div", { className: "dock-bar-item" },
                    React.createElement("button", { onClick: function () { return changeSettings("currentPage", settings.currentPage + 1); } }, "next")),
                React.createElement("div", { className: "dock-bar-item" },
                    React.createElement("button", { onClick: function () { return changeSettings("zoomLevel", settings.zoomLevel - 0.1); } }, "-")),
                React.createElement("div", { className: "dock-bar-item" },
                    React.createElement("button", { onClick: function () { return changeSettings("zoomLevel", settings.zoomLevel + 0.1); } }, "+")),
                React.createElement("div", { className: "dock-bar-item" },
                    React.createElement("button", { onClick: function () { return changeSettings("rotationAngle", settings.rotationAngle - 90); } }, "rotate to left")),
                React.createElement("div", { className: "dock-bar-item" },
                    React.createElement("button", { onClick: function () { return changeSettings("rotationAngle", settings.rotationAngle + 90); } }, "rotate to right")))))));
};
render(React.createElement(App, null), document.getElementById("root"));
var templateObject_1;
