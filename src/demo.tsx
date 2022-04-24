import React from "react";
import { render } from "react-dom";
import DocViewer from ".";
import { DocViewerRenderers } from "./plugins";

const App = () => {
  const docs = [{ uri: require("./examples/pdf-file.pdf") }];

  return (
    <DocViewer
      documents={docs}
      pluginRenderers={DocViewerRenderers}
      config={{
        noRenderer: {
          overrideComponent: () => <div />,
        },
      }}
    />
  );
};

render(<App />, document.getElementById("root"));
