import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import DocViewerState from "../../state";
import { DocRenderer } from "../../types";
import linkRenderResponder from "../../utils/linkRenderResponder";

const JPGRenderer: DocRenderer = () => {
  const currentDocument = useRecoilValue(DocViewerState.currentDocument);

  if (!currentDocument) return null;

  return (
    <Container id="jpg-renderer">
      <Img id="jpg-img" src={currentDocument.base64Data} />
    </Container>
  );
};

export default JPGRenderer;

JPGRenderer.fileTypes = ["image/jpg", "image/jpeg"];
JPGRenderer.priority = 1;
linkRenderResponder(JPGRenderer);

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
