import React from "react";
import ReactDOM from "react-dom";
import DocViewer from "./DocViewer";
import "./index.css";

// This is only imported for testing purposes. It will warn about a fatal error.
import "react-doc-viewer-plugins";

ReactDOM.render(
  <React.StrictMode>
    <DocViewer
      documents={[
        {
          uri:
            "https://file-examples-com.github.io/uploads/2017/10/file-sample_150kB.pdf",
        },
        { uri: require("./_example-files_/pdf.pdf") },
        { uri: require("./_example-files_/png.png") },
        { uri: require("./_example-files_/gif.gif") },
      ]}
    />
  </React.StrictMode>,
  document.getElementById("root")
);
