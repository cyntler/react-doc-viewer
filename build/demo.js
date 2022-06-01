import React, { useState } from "react";
import { render } from "react-dom";
import DocViewer, { DocViewerRenderers } from ".";
var App = function () {
    var docs = [
        { uri: require("./examples/example-pdf.pdf") },
        { uri: require("./examples/gif-image.gif") },
        { uri: require("./examples/png-image.png") },
    ];
    var settings = useState({
        zoomLevel: 0.3,
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
