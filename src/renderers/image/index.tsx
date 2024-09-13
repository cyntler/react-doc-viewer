import React from "react";
import styled from "styled-components";
import { DocRenderer } from "../..";

const ImageProxyRenderer: DocRenderer = ({
  mainState: { currentDocument },
  children,
  ...props
}) => {
  if (!currentDocument) return null;

  return (
    <Container id="image-renderer" {...props}>
      {children || (
        <Img id="image-img" src={currentDocument.fileData as string} />
      )}
    </Container>
  );
};

export default ImageProxyRenderer;

ImageProxyRenderer.fileTypes = [];
ImageProxyRenderer.weight = 0;

const Container = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #fff;
`;

const Img = styled.img`
  max-width: 95%;
  max-height: 95%;
`;
