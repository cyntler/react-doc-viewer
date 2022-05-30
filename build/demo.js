import React, { useState } from "react";
import { render } from "react-dom";
import DocViewer, { DocViewerRenderers } from ".";
var App = function () {
    var docs = [{ uri: require("./examples/example-pdf.pdf") }];
    var settings = useState({
        zoomLevel: 1,
        currentPage: 1,
        pagesCount: 1,
        paginated: true,
        fitType: "width",
        rotationAngle: 0,
    })[0];
    return (React.createElement("div", null,
        React.createElement(DocViewer, { documents: docs, pluginRenderers: DocViewerRenderers, renderSettings: settings, onLoaded: function (data) { return console.log("Preview is ready:", data); }, config: {
                noRenderer: {
                    overrideComponent: function () { return React.createElement("div", null); },
                },
            } })));
};
render(React.createElement(App, null), document.getElementById("root"));
