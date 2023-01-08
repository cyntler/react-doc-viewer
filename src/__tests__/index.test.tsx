import { render, screen } from "@testing-library/react";
import React from "react";
import DocViewer from "../index";

import pdfFile from "../exampleFiles/pdf-file.pdf";
import pngFile from "../exampleFiles/png-image.png";

test("renders component with no documents", () => {
  render(<DocViewer documents={[]} />);

  expect(screen.getByTestId("react-doc-viewer")).toBeDefined();
});

test("renders component with documents using uri", () => {
  const docs = [
    { fileSource: { uri: pdfFile } },
    { fileSource: { uri: pngFile } },
  ];
  render(<DocViewer documents={docs} />);

  expect(screen.getByTestId("react-doc-viewer")).toBeDefined();
  expect(screen.getByText(`Document 1 of ${docs.length}`)).toBeDefined();
});

test("renders doc viewer with initialActiveDocument prop", () => {
  const docs = [
    { fileSource: { uri: pdfFile } },
    { fileSource: { uri: pngFile } },
  ];
  render(<DocViewer documents={docs} initialActiveDocument={docs[1]} />);

  const proxyRenderer = screen.getByTestId("proxy-renderer");

  expect(screen.getByTestId("react-doc-viewer")).toBeDefined();
  expect(screen.getByText(`Document 2 of ${docs.length}`)).toBeDefined();
  expect(proxyRenderer).toBeDefined();
  expect(proxyRenderer.querySelector("img")).toBeDefined();
});
