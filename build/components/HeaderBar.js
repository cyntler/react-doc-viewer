var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React, { useContext } from "react";
import styled from "styled-components";
import { DocViewerContext } from "../state";
import { nextDocument, previousDocument } from "../state/actions/main.actions";
import { DocumentNav } from "./DocumentNav";
import { FileName } from "./FileName";
var Container = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  z-index: 1;\n  padding: 0 10px;\n  background-color: ", ";\n  font-size: 16px;\n  min-height: 50px;\n\n  @media (max-width: 768px) {\n    min-height: 30px;\n    padding: 5px;\n    font-size: 10px;\n  }\n"], ["\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  z-index: 1;\n  padding: 0 10px;\n  background-color: ", ";\n  font-size: 16px;\n  min-height: 50px;\n\n  @media (max-width: 768px) {\n    min-height: 30px;\n    padding: 5px;\n    font-size: 10px;\n  }\n"])), function (props) { return props.theme.primary; });
export var HeaderBar = function () {
    var _a, _b, _c;
    var _d = useContext(DocViewerContext), state = _d.state, dispatch = _d.dispatch;
    var config = state.config;
    if ((_a = config === null || config === void 0 ? void 0 : config.header) === null || _a === void 0 ? void 0 : _a.disableHeader)
        return null;
    var override = (_c = (_b = config === null || config === void 0 ? void 0 : config.header) === null || _b === void 0 ? void 0 : _b.overrideComponent) === null || _c === void 0 ? void 0 : _c.call(_b, state, function () { return dispatch(previousDocument()); }, function () { return dispatch(nextDocument()); });
    if (override) {
        return override;
    }
    return (React.createElement(Container, { id: "header-bar", "data-testid": "header-bar" },
        React.createElement(FileName, null),
        React.createElement(DocumentNav, null)));
};
var templateObject_1;
