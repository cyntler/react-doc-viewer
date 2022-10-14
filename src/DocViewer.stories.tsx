import React, { useState } from "react";
import DocViewer from "./index";
import { DocViewerRenderers } from "./plugins";

/* eslint-disable import/no-anonymous-default-export */
export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "DocViewer",
};

export const Default = () => {
  const docs = [
    { uri: require("./exampleFiles/pdf-file.pdf") },
    { uri: require("./exampleFiles/png-image.png") },
    { uri: require("./exampleFiles/csv-file.csv") },
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

export const DocViewerWithInpu = () => {
  const [selectedDocs, setSelectedDocs] = useState<File[]>([]);

  return (
    <>
      <input
        type="file"
        accept=".pdf"
        multiple
        onChange={(el) =>
          el.target.files?.length &&
          setSelectedDocs(Array.from(el.target.files))
        }
      />
      <DocViewer
        documents={selectedDocs.map((file) => ({
          uri: window.URL.createObjectURL(file),
          fileName: file.name,
        }))}
        pluginRenderers={DocViewerRenderers}
      />
    </>
  );
};
