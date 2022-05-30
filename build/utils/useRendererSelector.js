import { useContext, useEffect, useState } from "react";
import { DocViewerContext } from "../state";
export var useRendererSelector = function () {
    var _a = useContext(DocViewerContext).state, currentDocument = _a.currentDocument, pluginRenderers = _a.pluginRenderers;
    var _b = useState(), CurrentRenderer = _b[0], setCurrentRenderer = _b[1];
    useEffect(function () {
        if (!currentDocument)
            return;
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
        var SelectedRenderer = matchingRenderers.sort(function (a, b) { return b.weight - a.weight; })[0];
        if (SelectedRenderer && SelectedRenderer !== undefined) {
            setCurrentRenderer(function () { return SelectedRenderer; });
        }
        else {
            setCurrentRenderer(null);
        }
    }, [currentDocument, pluginRenderers]);
    return { CurrentRenderer: CurrentRenderer };
};
