import React, { useContext } from "react";
import styled from "styled-components";
import { DocViewerContext } from "../../state";
import { DocRenderer } from "../../types";

const PNGRenderer: DocRenderer = () => {
  const {
    state: { currentDocument },
  } = useContext(DocViewerContext);

  if (!currentDocument) return null;

  return (
    <Container id="png-renderer">
      <Img id="png-img" src={currentDocument.base64Data} />
    </Container>
  );
};

export default PNGRenderer;

PNGRenderer.fileTypes = ["image/png"];
PNGRenderer.weight = 0;

const Container = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: white;
  background-image: linear-gradient(45deg, #e0e0e0 25%, transparent 25%),
    linear-gradient(-45deg, #e0e0e0 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #e0e0e0 75%),
    linear-gradient(-45deg, transparent 75%, #e0e0e0 75%);
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
`;

const Img = styled.img`
  width: 50%;
`;
