import React from "react";
import { createRoot } from "react-dom/client";
import DocViewer from ".";
import { DocViewerRenderers } from "./plugins";

const App = () => {
  const docs = [
    { uri: require("./examples/pdf-file.pdf") },
    { uri: require("./examples/png-image.png") },
    { uri: require("./examples/csv-file.csv") },
  ];

  return (
    <DocViewer
      documents={docs}
      pluginRenderers={DocViewerRenderers}
      initialActiveDocument={docs[1]}
      config={{
        noRenderer: {
          overrideComponent: ({ document, fileName }) => {
            const fileText = fileName || document?.fileType || "";
            console.log(document);
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
        csvDelimiter: ",",
      }}
    />
  );
};

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}
