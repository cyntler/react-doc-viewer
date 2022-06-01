import React, { useState } from "react";
import { render } from "react-dom";
import DocViewer, { DocViewerRenderers, IRenderSettings } from ".";

const App = () => {
  const docs = [
    { uri: require("./examples/example-pdf.pdf") },
    { uri: require("./examples/gif-image.gif") },
    { uri: require("./examples/png-image.png") },
  ];
  const [settings] = useState({
    zoomLevel: 0.3,
    currentPage: 1,
    pagesCount: 1,
    paginated: true,
    fitType: "width",
    rotationAngle: 0,
  } as IRenderSettings);

  return (
    <div>
      <DocViewer
        documents={docs}
        pluginRenderers={DocViewerRenderers}
        renderSettings={settings}
        onLoaded={(data) => console.log("Preview is ready:", data)}
        config={{
          noRenderer: {
            overrideComponent: () => <div />,
          },
        }}
      />
    </div>
  );
};

render(<App />, document.getElementById("root"));
