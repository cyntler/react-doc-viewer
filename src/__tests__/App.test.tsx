import { render, screen } from "@testing-library/react";
import React from "react";
import DocViewer from "../index";

test("renders component with no documents", () => {
  render(<DocViewer documents={[]} />);

  expect(screen.getByTestId("react-doc-viewer")).toBeDefined();
});
