var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
/* eslint-disable */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MSGReader } from "wl-msg-reader";
import { arrayBufferFileLoader } from "../../utils/fileLoaders";
var MSGRenderer = function (_a) {
    var _b;
    var currentDocument = _a.mainState.currentDocument;
    var _c = useState(), fileData = _c[0], setFileData = _c[1];
    useEffect(function () {
        if (!currentDocument || !currentDocument.fileData)
            return;
        var _fd = new MSGReader(currentDocument.fileData).getFileData();
        setFileData(_fd);
    }, [currentDocument === null || currentDocument === void 0 ? void 0 : currentDocument.fileData]);
    useEffect(function () {
        if (!fileData || fileData.hasOwnProperty("error"))
            return;
        var iframeCont = document.getElementById("msg-body");
        var iframe = (iframeCont === null || iframeCont === void 0 ? void 0 : iframeCont.contentWindow) && iframeCont.contentWindow;
        if (!iframe)
            return;
        var iframeDoc = iframe.document;
        var body = fileData.body.replace(/(\r\n|\n|\r)/gm, "<br />");
        iframeDoc.open();
        iframeDoc.write("" + body);
        iframeDoc.close();
    }, [fileData]);
    if (!fileData || fileData.hasOwnProperty("error")) {
        return React.createElement("span", null, (_b = fileData) === null || _b === void 0 ? void 0 : _b.error);
    }
    var _d = fileData, recipients = _d.recipients, subject = _d.subject, senderEmail = _d.senderEmail, senderName = _d.senderName;
    return (React.createElement(Container, { id: "msg-renderer" },
        React.createElement("h2", { id: "msg-subject-title", style: { marginBottom: 0 } }, subject),
        React.createElement(Sender, { name: senderName, email: senderEmail }),
        React.createElement(RecipientContainer, { id: "msg-recipient" },
            React.createElement("h3", { id: "msg-recipient-title" }, "Recipients"),
            React.createElement("ul", { id: "msg-recipient-ul" }, recipients.map(function (r, i) { return (React.createElement("li", { key: i, id: "msg-recipient-li" },
                React.createElement("span", { id: "msg-recipient-name" }, r.name),
                r.hasOwnProperty("email") && (React.createElement("span", { id: "msg-recipient-email" },
                    " - ",
                    r.email)))); }))),
        React.createElement(BodyIFrame, { id: "msg-body", sandbox: "allow-same-origin" })));
};
var Sender = function (_a) {
    var name = _a.name, email = _a.email;
    if (!name && !email)
        return null;
    return (React.createElement(SenderContainer, { id: "msg-sender" },
        React.createElement("h3", { id: "msg-sender-title" }, "Sender"),
        name !== undefined && React.createElement("div", { id: "msg-sender-name" }, name),
        email !== undefined && React.createElement("div", { id: "msg-sender-email" }, email)));
};
export default MSGRenderer;
MSGRenderer.fileTypes = ["msg", "application/vnd.ms-outlook"];
MSGRenderer.weight = 0;
MSGRenderer.fileLoader = arrayBufferFileLoader;
var Container = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  padding: 0 30px;\n"], ["\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  padding: 0 30px;\n"])));
var SenderContainer = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  padding: 0 15px 15px 15px;\n  margin-top: 20px;\n  border: 1px solid ", ";\n"], ["\n  padding: 0 15px 15px 15px;\n  margin-top: 20px;\n  border: 1px solid ", ";\n"])), function (props) { return props.theme.secondary; });
var RecipientContainer = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  padding: 0 15px;\n  margin-top: 20px;\n  border: 1px solid ", ";\n"], ["\n  padding: 0 15px;\n  margin-top: 20px;\n  border: 1px solid ", ";\n"])), function (props) { return props.theme.secondary; });
var BodyIFrame = styled.iframe(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  height: 100%;\n  padding: 15px;\n  margin: 20px 0 20px 0;\n  border: 1px solid ", ";\n"], ["\n  height: 100%;\n  padding: 15px;\n  margin: 20px 0 20px 0;\n  border: 1px solid ", ";\n"])), function (props) { return props.theme.secondary; });
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
