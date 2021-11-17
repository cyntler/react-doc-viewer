"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
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
var wl_msg_reader_1 = require("wl-msg-reader");
var fileLoaders_1 = require("../../utils/fileLoaders");
var MSGRenderer = function (_a) {
    var _b;
    var currentDocument = _a.mainState.currentDocument;
    var _c = react_1.useState(), fileData = _c[0], setFileData = _c[1];
    react_1.useEffect(function () {
        if (!currentDocument || !currentDocument.fileData)
            return;
        var _fd = new wl_msg_reader_1.MSGReader(currentDocument.fileData).getFileData();
        setFileData(_fd);
    }, [currentDocument === null || currentDocument === void 0 ? void 0 : currentDocument.fileData]);
    react_1.useEffect(function () {
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
        return react_1.default.createElement("span", null, (_b = fileData) === null || _b === void 0 ? void 0 : _b.error);
    }
    var _d = fileData, recipients = _d.recipients, subject = _d.subject, senderEmail = _d.senderEmail, senderName = _d.senderName;
    return (react_1.default.createElement(Container, { id: "msg-renderer" },
        react_1.default.createElement("h2", { id: "msg-subject-title", style: { marginBottom: 0 } }, subject),
        react_1.default.createElement(Sender, { name: senderName, email: senderEmail }),
        react_1.default.createElement(RecipientContainer, { id: "msg-recipient" },
            react_1.default.createElement("h3", { id: "msg-recipient-title" }, "Recipients"),
            react_1.default.createElement("ul", { id: "msg-recipient-ul" }, recipients.map(function (r, i) { return (react_1.default.createElement("li", { key: i, id: "msg-recipient-li" },
                react_1.default.createElement("span", { id: "msg-recipient-name" }, r.name),
                r.hasOwnProperty("email") && (react_1.default.createElement("span", { id: "msg-recipient-email" },
                    " - ",
                    r.email)))); }))),
        react_1.default.createElement(BodyIFrame, { id: "msg-body", sandbox: "allow-same-origin" })));
};
var Sender = function (_a) {
    var name = _a.name, email = _a.email;
    if (!name && !email)
        return null;
    return (react_1.default.createElement(SenderContainer, { id: "msg-sender" },
        react_1.default.createElement("h3", { id: "msg-sender-title" }, "Sender"),
        name !== undefined && react_1.default.createElement("div", { id: "msg-sender-name" }, name),
        email !== undefined && react_1.default.createElement("div", { id: "msg-sender-email" }, email)));
};
exports.default = MSGRenderer;
MSGRenderer.fileTypes = ["msg", "application/vnd.ms-outlook"];
MSGRenderer.weight = 0;
MSGRenderer.fileLoader = fileLoaders_1.arrayBufferFileLoader;
var Container = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  padding: 0 30px;\n"], ["\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  padding: 0 30px;\n"])));
var SenderContainer = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  padding: 0 15px 15px 15px;\n  margin-top: 20px;\n  border: 1px solid ", ";\n"], ["\n  padding: 0 15px 15px 15px;\n  margin-top: 20px;\n  border: 1px solid ", ";\n"])), function (props) { return props.theme.secondary; });
var RecipientContainer = styled_components_1.default.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  padding: 0 15px;\n  margin-top: 20px;\n  border: 1px solid ", ";\n"], ["\n  padding: 0 15px;\n  margin-top: 20px;\n  border: 1px solid ", ";\n"])), function (props) { return props.theme.secondary; });
var BodyIFrame = styled_components_1.default.iframe(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  height: 100%;\n  padding: 15px;\n  margin: 20px 0 20px 0;\n  border: 1px solid ", ";\n"], ["\n  height: 100%;\n  padding: 15px;\n  margin: 20px 0 20px 0;\n  border: 1px solid ", ";\n"])), function (props) { return props.theme.secondary; });
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
