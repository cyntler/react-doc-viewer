import { act, render } from "@testing-library/react";
import React from "react";
import DocViewer from "../DocViewer";

test("renders component with no documents", () => {
  const comp = render(<DocViewer documents={[]} />);
  expect(comp?.getByTestId("react-doc-viewer")).toMatchSnapshot();
});

test("renders component with no file name", async () => {
  let comp = render(
    <DocViewer
      documents={[{ uri: require("../_example-files_/pdf.pdf") }]}
      config={{ header: { disableFileName: true } }}
    />
  );

  act(async () => {
    await comp?.findByTestId("file-name");
  });

  expect(comp?.getByTestId("react-doc-viewer")).toMatchSnapshot();
});

test("renders component with no header", async () => {
  let comp = render(
    <DocViewer
      documents={[{ uri: require("../_example-files_/pdf.pdf") }]}
      config={{ header: { disableHeader: true } }}
    />
  );

  act(async () => {
    await comp?.findByTestId("header-bar");
  });

  expect(comp?.getByTestId("react-doc-viewer")).toMatchSnapshot();
});
