import React, { useEffect } from "react";
import { DocRenderer } from "../../types";
import { textFileLoader } from "../../utils/fileLoaders";

const HTMLRenderer: DocRenderer = ({ mainState: { currentDocument } }) => {
  useEffect(() => {
    console.log(currentDocument?.fileData);
  }, [currentDocument]);

  return <div>asdasdasdasd</div>;
};

export default HTMLRenderer;

HTMLRenderer.fileTypes = ["csv", "text/csv"];
HTMLRenderer.weight = 0;
HTMLRenderer.fileLoader = textFileLoader;
