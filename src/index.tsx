import React from "react";
import ReactDOM from "react-dom";
import DocViewer from "./DocViewer";
import "./index.css";
// import * as serviceWorker from "./serviceWorker";

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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
