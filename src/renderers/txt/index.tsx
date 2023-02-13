import React, { ReactNode } from "react";
import styled from "styled-components";
import { DocRenderer } from "../..";
import { textFileLoader } from "../../utils/fileLoaders";

const TXTRenderer: DocRenderer = ({ mainState: { currentDocument } }) => {
  return (
    <Container id="txt-renderer">
      {currentDocument?.fileData as ReactNode}
    </Container>
  );
};

export default TXTRenderer;

TXTRenderer.fileTypes = ["txt", "text/plain"];
TXTRenderer.weight = 0;
TXTRenderer.fileLoader = textFileLoader;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 30px;
`;
