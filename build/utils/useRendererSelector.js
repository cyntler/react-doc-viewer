"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRendererSelector = void 0;
var react_1 = require("react");
var state_1 = require("../state");
/**
 * Custom Hook for loading the current document into context
 */
exports.useRendererSelector = function () {
    var _a = react_1.useContext(state_1.DocViewerContext).state, currentDocument = _a.currentDocument, pluginRenderers = _a.pluginRenderers;
    var _b = react_1.useState(), CurrentRenderer = _b[0], setCurrentRenderer = _b[1];
    react_1.useEffect(function () {
        if (!currentDocument)
            return;
        // Do not advance if the document does not yet have a fileType
        // This prevents prematurely showing 'no renderer' message
        if (!currentDocument.fileType) {
            setCurrentRenderer(undefined);
            return;
        }
        var matchingRenderers = [];
        pluginRenderers === null || pluginRenderers === void 0 ? void 0 : pluginRenderers.map(function (r) {
            if (currentDocument.fileType === undefined)
                return;
            if (r.fileTypes.indexOf(currentDocument.fileType) >= 0) {
                matchingRenderers.push(r);
            }
        });
        // Compute prefered Renderer based on weight
        var SelectedRenderer = matchingRenderers.sort(function (a, b) { return b.weight - a.weight; })[0];
        if (SelectedRenderer && SelectedRenderer !== undefined) {
            setCurrentRenderer(function () { return SelectedRenderer; });
        }
        else {
            setCurrentRenderer(null);
        }
    }, [currentDocument]);
    return { CurrentRenderer: CurrentRenderer };
};
