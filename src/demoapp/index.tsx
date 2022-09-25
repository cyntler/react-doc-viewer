import React from "react";
import { createRoot } from "react-dom/client";

// import DocViewerApp from "./DocViewerApp";
import DocViewerWithInputApp from "./DocViewerWithInputApp";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<DocViewerWithInputApp />);
}
