var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React, { useContext } from "react";
import styled from "styled-components";
import { Button } from "../../../components/common";
import { RenderContext } from "../../../state";
import { setDocumentCurrentPage } from "../../../state/actions/render.actions";
import { NextPDFNavIcon, PrevPDFNavIcon } from "./icons";
var PDFPagination = function () {
    var _a = useContext(RenderContext), renderSettings = _a.state, dispatch = _a.dispatch;
    return (React.createElement(Container, { id: "pdf-pagination" },
        React.createElement(PageNavButtonLeft, { id: "pdf-pagination-prev", onClick: function () { return dispatch(setDocumentCurrentPage(renderSettings.currentPage - 1)); }, disabled: renderSettings.currentPage === 1 },
            React.createElement(PrevPDFNavIcon, { color: "#000", size: "50%" })),
        React.createElement(PageTag, { id: "pdf-pagination-info" },
            "Page ",
            renderSettings.currentPage,
            "/",
            renderSettings.pagesCount),
        React.createElement(PageNavButtonRight, { id: "pdf-pagination-next", onClick: function () { return dispatch(setDocumentCurrentPage(renderSettings.currentPage + 1)); }, disabled: renderSettings.currentPage >= renderSettings.pagesCount },
            React.createElement(NextPDFNavIcon, { color: "#000", size: "50%" }))));
};
export default PDFPagination;
var Container = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n"], ["\n  display: flex;\n  align-items: center;\n"])));
var PageNavButtonLeft = styled(Button)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width: 30px;\n  height: 30px;\n  margin: 0 5px;\n\n  @media (max-width: 768px) {\n    width: 25px;\n    height: 25px;\n  }\n"], ["\n  width: 30px;\n  height: 30px;\n  margin: 0 5px;\n\n  @media (max-width: 768px) {\n    width: 25px;\n    height: 25px;\n  }\n"])));
var PageNavButtonRight = styled(PageNavButtonLeft)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  margin: 0 20px 0 5px;\n"], ["\n  margin: 0 20px 0 5px;\n"])));
var PageTag = styled.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  color: ", ";\n  font-size: 14px;\n  text-align: left;\n\n  @media (max-width: 768px) {\n    font-size: 10px;\n  }\n"], ["\n  color: ", ";\n  font-size: 14px;\n  text-align: left;\n\n  @media (max-width: 768px) {\n    font-size: 10px;\n  }\n"])), function (props) { return props.theme.textPrimary; });
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
