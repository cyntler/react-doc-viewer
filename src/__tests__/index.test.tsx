import { render, screen } from "@testing-library/react";
import React from "react";
import DocViewer from "../index";

test("renders component with no documents", () => {
  render(<DocViewer documents={[]} />);

  expect(screen.getByTestId("react-doc-viewer")).toBeDefined();
});

test("renders component with documents", () => {
  const docs = [
    { uri: require("../demoapp/exampleFiles/pdf-file.pdf") },
    { uri: require("../demoapp/exampleFiles/png-image.png") },
  ];

  render(<DocViewer documents={docs} />);

  expect(screen.getByTestId("react-doc-viewer")).toBeDefined();
  expect(screen.getByText(`Doc 1 of ${docs.length}`)).toBeDefined();
});

test("renders doc viewer with initialActiveDocument prop", () => {
  const docs = [
    { uri: require("../demoapp/exampleFiles/pdf-file.pdf") },
    { uri: require("../demoapp/exampleFiles/png-image.png") },
  ];

  render(<DocViewer documents={docs} initialActiveDocument={docs[1]} />);

  const proxyRenderer = screen.getByTestId("proxy-renderer");

  expect(screen.getByTestId("react-doc-viewer")).toBeDefined();
  expect(screen.getByText(`Doc 2 of ${docs.length}`)).toBeDefined();
  expect(proxyRenderer).toBeDefined();
  expect(proxyRenderer.querySelector("img")).toBeDefined();
});
