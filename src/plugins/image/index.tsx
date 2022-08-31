import React from "react";
import styled from "styled-components";
import { RenderContext } from "../../state";
import { setDocumentRenderSettings } from "../../state/actions/render.actions";
import { DocRenderer } from "../../types";

const Container = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const Img = styled.img`
  max-width: 95%;
  max-height: 95%;
`;

const ImageProxyRenderer: DocRenderer = (props) => {
  const {
    mainState: { currentDocument },
    onLoaded,
    children,
    ...otherProps
  } = props;

  const { state, dispatch } = React.useContext(RenderContext);

  if (!currentDocument) return null;

  const onImageLoad = () => {
    dispatch(
      setDocumentRenderSettings({
        paginated: false,
        pagesCount: 0,
        loaded: true,
        currentPage: 0,
        fitType: "page",
        zoomLevel: 1,
        rotationAngle: 0,
      })
    );

    onLoaded();
  };

  return (
    <Container id="image-renderer" {...otherProps}>
      {children || (
        <Img
          id="image-img"
          style={{
            transform: `scale(${state.zoomLevel}) rotate(${state.rotationAngle}deg)`,
          }}
          src={currentDocument.fileData as string}
          onLoad={onImageLoad}
        />
      )}
    </Container>
  );
};

export default ImageProxyRenderer;

ImageProxyRenderer.fileTypes = [];
ImageProxyRenderer.weight = 0;
