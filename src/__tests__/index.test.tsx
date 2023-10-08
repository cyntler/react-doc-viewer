import { render, screen } from "@testing-library/react";
import React from "react";
import DocViewer from "../index";

import pdfFile from "../exampleFiles/pdf-file.pdf";
import pngFile from "../exampleFiles/png-image.png";
import epsFile from "../exampleFiles/eps-file.eps";

test("renders component with no documents", () => {
  render(<DocViewer documents={[]} />);

  expect(screen.getByTestId("react-doc-viewer")).toBeDefined();
});

test("renders component with documents", () => {
  const docs = [{ uri: pdfFile }, { uri: pngFile }];
  render(<DocViewer documents={docs} />);

  expect(screen.getByTestId("react-doc-viewer")).toBeDefined();
  expect(screen.getByText(`Document 1 of ${docs.length}`)).toBeDefined();
});

test("renders component with unsupported file type", () => {
  const docs = [{ uri: epsFile, fileType: "application/postscript" }];
  render(<DocViewer documents={docs} />);

  expect(screen.getByTestId("react-doc-viewer")).toBeDefined();

  expect(
    screen.getByText("No renderer for file type: application/postscript"),
  ).toBeInTheDocument();
});

test("renders doc viewer with initialActiveDocument prop", () => {
  const docs = [{ uri: pdfFile }, { uri: pngFile }];
  render(<DocViewer documents={docs} initialActiveDocument={docs[1]} />);

  const proxyRenderer = screen.getByTestId("proxy-renderer");

  expect(screen.getByTestId("react-doc-viewer")).toBeDefined();
  expect(screen.getByText(`Document 2 of ${docs.length}`)).toBeDefined();
  expect(proxyRenderer).toBeDefined();
  expect(proxyRenderer.querySelector("img")).toBeDefined();
});
