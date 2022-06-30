import React from "react";
import { createRoot } from "react-dom/client";
import DocViewer from ".";
import { DocViewerRenderers } from "./plugins";

const App = () => {
  const docs = [
    { uri: require("./examples/pdf-file.pdf") },
    { uri: require("./examples/png-image.png") },
  ];

  return (
    <DocViewer
      documents={docs}
      initialActiveDocument={docs[1]}
      pluginRenderers={DocViewerRenderers}
      config={{
        noRenderer: {
          overrideComponent: ({ document, fileName }) => {
            const fileText = fileName || document?.fileType || "";
            if (fileText) {
              return <div>no renderer for {fileText}</div>;
            }
            return <div>no renderer</div>;
          },
        },
        loadingRenderer: {
          overrideComponent: ({ document, fileName }) => {
            const fileText = fileName || document?.fileType || "";
            if (fileText) {
              return <div>loading ({fileText})</div>;
            }
            return <div>loading</div>;
          },
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
