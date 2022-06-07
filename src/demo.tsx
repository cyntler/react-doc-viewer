import React from "react";
import { createRoot } from "react-dom/client";
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
          overrideComponent: () => <div>no renderer</div>,
        },
        loadingRenderer: {
          overrideComponent: () => <div>loading</div>,
        },
      }}
    />
  );
};

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}
