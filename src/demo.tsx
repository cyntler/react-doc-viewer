import React from "react";
import { createRoot } from "react-dom/client";
import DocViewer, { IDocument, fromArrayBuffer } from ".";
import { DocViewerRenderers } from "./plugins";

const App = () => {
  const content = new Uint8Array([
    137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 5, 0,
    0, 0, 5, 8, 6, 0, 0, 0, 141, 111, 38, 229, 0, 0, 0, 28, 73, 68, 65, 84, 8,
    215, 99, 248, 255, 255, 63, 195, 127, 6, 32, 5, 195, 32, 18, 132, 208, 49,
    241, 130, 88, 205, 4, 0, 14, 245, 53, 203, 209, 142, 14, 31, 0, 0, 0, 0, 73,
    69, 78, 68, 174, 66, 96, 130,
  ]);

  const docs: IDocument[] = [
    { uri: require("./examples/pdf-file.pdf") },
    fromArrayBuffer(content.buffer, "image/png"),
  ];

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
