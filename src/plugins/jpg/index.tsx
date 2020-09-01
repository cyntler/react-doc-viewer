import React, { useContext } from "react";
import styled from "styled-components";
import { MainContext } from "../../state";
import { DocRenderer } from "../../types";

const JPGRenderer: DocRenderer = () => {
  const {
    state: { currentDocument },
  } = useContext(MainContext);

  if (!currentDocument) return null;

  return (
    <Container id="jpg-renderer">
      <Img id="jpg-img" src={currentDocument.base64Data} />
    </Container>
  );
};

export default JPGRenderer;

JPGRenderer.fileTypes = ["image/jpg", "image/jpeg"];
JPGRenderer.weight = 0;

const Container = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #fff;
`;

const Img = styled.img`
  width: 50%;
`;
