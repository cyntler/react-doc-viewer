import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { DocRenderer } from "../../types";
import { arrayBufferFileLoader } from "../../utils/fileLoaders";
import ImageProxyRenderer from "../image";
import { parseTIFF } from "./tiffToCanvas";

const TIFFRenderer: DocRenderer = (props) => {
  const {
    mainState: { currentDocument },
  } = props;

  const [loadedCanvas, setLoadedCanvas] = useState(false);
  const [corruptedFile, setCorruptedFile] = useState(false);

  useEffect(() => {
    if (!currentDocument || loadedCanvas) return;

    var canvas = document.getElementById("tiff-img");
    try {
      canvas && parseTIFF(currentDocument.fileData as ArrayBuffer, canvas);
      setLoadedCanvas(true);
    } catch (error) {
      setCorruptedFile(true);
    }
  }, []);

  if (corruptedFile) {
    return (
      <ImageProxyRenderer {...props}>
        <div>Your file is corrupted. Please check it on your machine.</div>
      </ImageProxyRenderer>
    );
  }

  return (
    <ImageProxyRenderer {...props}>
      <Canvas id="tiff-img" />
    </ImageProxyRenderer>
  );
};
TIFFRenderer.fileTypes = ["tif", "tiff", "image/tif", "image/tiff"];
TIFFRenderer.weight = 0;
TIFFRenderer.fileLoader = arrayBufferFileLoader;

export default TIFFRenderer;

const Canvas = styled.canvas`
  max-width: 95%;
  max-height: 95%;
`;
