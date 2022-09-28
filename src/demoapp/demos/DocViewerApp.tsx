import React from "react";
import DocViewer from "../../index";
import { DocViewerRenderers } from "../../plugins";

const DocViewerApp = () => {
  const docs = [
    { uri: require("../exampleFiles/pdf-file.pdf") },
    { uri: require("../exampleFiles/png-image.png") },
    { uri: require("../exampleFiles/csv-file.csv") },
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
        pdfZoom: {
          defaultZoom: 1.1,
          zoomJump: 0.2,
        },
      }}
      language="pl"
    />
  );
};

export default DocViewerApp;
