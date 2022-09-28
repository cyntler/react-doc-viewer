import React from "react";
import { Link, Navigate } from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DocViewerApp from "./demos/DocViewerApp";
import DocViewerWithInputApp from "./demos/DocViewerWithInputApp";

const App = () => (
  <BrowserRouter>
    <h1>@cyntler/react-doc-viewer</h1>
    <main>
      <nav className="demo-app-nav">
        <ul>
          <li>
            <Link to="/doc-viewer">Default</Link>
          </li>
          <li>
            <Link to="/doc-viewer-with-input">With Input</Link>
          </li>
        </ul>
      </nav>
      <div className="demo-app-wrapper">
        <Routes>
          <Route path="/doc-viewer" element={<DocViewerApp />} />
          <Route
            path="/doc-viewer-with-input"
            element={<DocViewerWithInputApp />}
          />
          <Route path="*" element={<Navigate to="/doc-viewer" replace />} />
        </Routes>
      </div>
    </main>
  </BrowserRouter>
);

export default App;
