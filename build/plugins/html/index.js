var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React, { useEffect } from "react";
import styled from "styled-components";
import { dataURLFileLoader } from "../../utils/fileLoaders";
var HTMLRenderer = function (_a) {
    var currentDocument = _a.mainState.currentDocument;
    useEffect(function () {
        var b64String = currentDocument === null || currentDocument === void 0 ? void 0 : currentDocument.fileData;
        var bodyBase64 = (b64String === null || b64String === void 0 ? void 0 : b64String.replace("data:text/html;base64,", "")) || "";
        var body = window.atob(bodyBase64);
        var iframeCont = document.getElementById("html-body");
        var iframe = (iframeCont === null || iframeCont === void 0 ? void 0 : iframeCont.contentWindow) && iframeCont.contentWindow;
        if (!iframe)
            return;
        var iframeDoc = iframe.document;
        iframeDoc.open();
        iframeDoc.write("" + body);
        iframeDoc.close();
    }, [currentDocument]);
    return (React.createElement(Container, { id: "html-renderer" },
        React.createElement(BodyIFrame, { id: "html-body", sandbox: "allow-same-origin" })));
};
export default HTMLRenderer;
HTMLRenderer.fileTypes = ["htm", "html", "text/htm", "text/html"];
HTMLRenderer.weight = 0;
HTMLRenderer.fileLoader = dataURLFileLoader;
var Container = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  padding: 0 30px;\n"], ["\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  padding: 0 30px;\n"])));
var BodyIFrame = styled.iframe(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  height: 100%;\n  padding: 15px;\n  margin: 20px 0 20px 0;\n  border: 1px solid ", ";\n"], ["\n  height: 100%;\n  padding: 15px;\n  margin: 20px 0 20px 0;\n  border: 1px solid ", ";\n"])), function (props) { return props.theme.secondary; });
var templateObject_1, templateObject_2;
