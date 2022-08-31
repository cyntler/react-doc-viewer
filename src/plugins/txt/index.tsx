import React from "react";
import styled from "styled-components";
import { DocRenderer } from "../../types";
import { textFileLoader } from "../../utils/fileLoaders";

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: #fff;

  pre {
    max-width: 100%;
    font-family: monospace;
    font-size: 14px;
    padding: 30px;
    background: #fff;
  }
`;

const TXTRenderer: DocRenderer = ({ mainState: { currentDocument } }) => (
  <Container id="txt-renderer">
    <pre>{currentDocument?.fileData}</pre>
  </Container>
);

export default TXTRenderer;

TXTRenderer.fileTypes = [
  "text/",
  "application/javascript",
  "application/ecmascript",
  "application/xhtml+xml",
  "application/rtf",
  "application/x-httpd-php",
  "application/json",
  "application/rls-services+xml",
];
TXTRenderer.weight = 0;
TXTRenderer.fileLoader = textFileLoader;
