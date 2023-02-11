import React, { useState } from "react";
import DocViewer from "./index";
import { DocViewerRenderers } from "./plugins";

import pdfFile from "./exampleFiles/pdf-file.pdf";
import pngFile from "./exampleFiles/png-image.png";
import csvFile from "./exampleFiles/csv-file.csv";

/* eslint-disable import/no-anonymous-default-export */
export default {
  title: "DocViewer",
};

export const Default = () => {
  const docs = [{ uri: pdfFile }, { uri: pngFile }, { uri: csvFile }];

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

export const WithPDFInput = () => {
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
        config={{
          defualtPDFPaginated : false,
        }}
        documents={selectedDocs.map((file) => ({
          uri: window.URL.createObjectURL(file),
          fileName: file.name,
        }))}
        pluginRenderers={DocViewerRenderers}
      />
    </>
  );
};
