var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React, { useCallback } from "react";
import styled, { keyframes } from "styled-components";
import { setRendererRect } from "../state/actions/main.actions";
import { useDocumentLoader } from "../utils/useDocumentLoader";
import { useWindowSize } from "../utils/useWindowSize";
import { LinkButton } from "./common";
import DocumentPagesNav from "./DocumentPagesNav";
import ExternalStateAdapter from "./ExternalStateAdapter";
import { LoadingIcon } from "./icons";
var Container = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex: 1;\n  height: 100%;\n  overflow-y: auto;\n"], ["\n  display: flex;\n  flex: 1;\n  height: 100%;\n  overflow-y: auto;\n"])));
var LoadingContainer = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  flex: 1;\n  height: 75px;\n  align-items: center;\n  justify-content: center;\n"], ["\n  display: flex;\n  flex: 1;\n  height: 75px;\n  align-items: center;\n  justify-content: center;\n"])));
var spinAnim = keyframes(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n"], ["\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n"])));
var LoadingIconContainer = styled.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  animation-name: ", ";\n  animation-duration: 4s;\n  animation-timing-function: linear;\n  animation-iteration-count: infinite;\n"], ["\n  animation-name: ", ";\n  animation-duration: 4s;\n  animation-timing-function: linear;\n  animation-iteration-count: infinite;\n"])), spinAnim);
var DownloadButton = styled(LinkButton)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  width: 130px;\n  height: 30px;\n  background-color: ", ";\n  @media (max-width: 768px) {\n    width: 125px;\n    height: 25px;\n  }\n"], ["\n  width: 130px;\n  height: 30px;\n  background-color: ", ";\n  @media (max-width: 768px) {\n    width: 125px;\n    height: 25px;\n  }\n"])), function (props) { return props.theme.primary; });
var RenderContent = function (_a) {
    var _b, _c;
    var state = _a.state, CurrentRenderer = _a.CurrentRenderer;
    var config = state.config, documents = state.documents, currentDocument = state.currentDocument, documentLoading = state.documentLoading;
    if (!documents.length) {
        return React.createElement("div", { id: "no-documents" });
    }
    if (documentLoading) {
        if (config && ((_b = config === null || config === void 0 ? void 0 : config.loadingRenderer) === null || _b === void 0 ? void 0 : _b.overrideComponent)) {
            var OverrideComponent = config.loadingRenderer.overrideComponent;
            return React.createElement(OverrideComponent, null);
        }
        return (React.createElement(LoadingContainer, { id: "loading-renderer", "data-testid": "loading-renderer" },
            React.createElement(LoadingIconContainer, null,
                React.createElement(LoadingIcon, { color: "#444", size: 40 }))));
    }
    if (CurrentRenderer) {
        return (React.createElement(CurrentRenderer, { mainState: state, loaded: !documentLoading, onLoaded: function () { } }));
    }
    if (config && ((_c = config === null || config === void 0 ? void 0 : config.noRenderer) === null || _c === void 0 ? void 0 : _c.overrideComponent)) {
        var OverrideComponent = config.noRenderer.overrideComponent;
        return React.createElement(OverrideComponent, null);
    }
    return (React.createElement("div", { id: "no-renderer", "data-testid": "no-renderer" },
        "No Renderer for file type", currentDocument === null || currentDocument === void 0 ? void 0 :
        currentDocument.fileType,
        React.createElement(DownloadButton, { id: "no-renderer-download", href: currentDocument === null || currentDocument === void 0 ? void 0 : currentDocument.uri, download: currentDocument === null || currentDocument === void 0 ? void 0 : currentDocument.uri }, "Download File")));
};
export var ProxyRenderer = function () {
    var _a = useDocumentLoader(), state = _a.state, dispatch = _a.dispatch, CurrentRenderer = _a.CurrentRenderer;
    var documentLoading = state.documentLoading;
    // const [currentDocument, setCurrentDocument] = React.useState(
    //   state.currentDocument
    // );
    // React.useEffect(() => {
    //   if (currentDocument?.uri !== state.currentDocument?.uri) {
    //     setDocumentLoaded(false);
    //     setCurrentDocument(state.currentDocument);
    //   }
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [state]);
    var size = useWindowSize();
    var containerRef = useCallback(function (node) {
        if (node) {
            dispatch(setRendererRect(node.getBoundingClientRect()));
        }
    }, [size]);
    return (React.createElement(Container, { id: "proxy-renderer", ref: containerRef },
        !documentLoading && React.createElement(ExternalStateAdapter, null),
        !documentLoading && React.createElement(DocumentPagesNav, null),
        React.createElement(RenderContent, { state: state, CurrentRenderer: CurrentRenderer })));
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
