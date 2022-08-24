var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React, { useContext } from "react";
import styled from "styled-components";
import { DocViewerContext } from "../state";
import { nextDocument, previousDocument } from "../state/actions/main.actions";
import { ButtonSecondary } from "./common/Button";
import { NextDocIcon, PrevDocIcon } from "./icons";
var Container = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  min-width: 150px;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: flex-end;\n  margin: 0 10px;\n  color: ", ";\n"], ["\n  min-width: 150px;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: flex-end;\n  margin: 0 10px;\n  color: ", ";\n"])), function (props) { return props.theme.textPrimary; });
var ButtonPrev = styled(ButtonSecondary)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width: 30px;\n  height: 30px;\n  margin: 0 5px 0 10px;\n\n  @media (max-width: 768px) {\n    width: 25px;\n    height: 25px;\n  }\n"], ["\n  width: 30px;\n  height: 30px;\n  margin: 0 5px 0 10px;\n\n  @media (max-width: 768px) {\n    width: 25px;\n    height: 25px;\n  }\n"])));
var ButtonNext = styled(ButtonPrev)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  margin: 0 5px;\n"], ["\n  margin: 0 5px;\n"])));
export var DocumentNav = function () {
    var _a = useContext(DocViewerContext), _b = _a.state, currentDocument = _b.currentDocument, currentFileNo = _b.currentFileNo, documents = _b.documents, dispatch = _a.dispatch;
    if (documents.length <= 1 || !currentDocument)
        return null;
    var fileName = currentDocument.uri;
    var splitURL = fileName.split("/");
    if (splitURL.length) {
        fileName = splitURL[splitURL.length - 1];
    }
    return (React.createElement(Container, { id: "doc-nav" },
        React.createElement("p", { id: "doc-nav-info" },
            "Doc ",
            currentFileNo + 1,
            " of ",
            documents.length),
        React.createElement(ButtonPrev, { id: "doc-nav-prev", onClick: function () { return dispatch(previousDocument()); }, disabled: currentFileNo === 0 },
            React.createElement(PrevDocIcon, { color: "#fff", size: "60%" })),
        React.createElement(ButtonNext, { id: "doc-nav-next", onClick: function () { return dispatch(nextDocument()); }, disabled: currentFileNo >= documents.length - 1 },
            React.createElement(NextDocIcon, { color: "#fff", size: "60%" }))));
};
var templateObject_1, templateObject_2, templateObject_3;
