import React from "react";
import styled from "styled-components";
import { DocRenderer } from "../..";

const VideoRenderer: DocRenderer = ({ mainState: { currentDocument } }) => {
  if (!currentDocument) return null;

  return (
    <Container id="video-renderer">
      <Video controls src={currentDocument.uri} />
    </Container>
  );
};

export default VideoRenderer;

VideoRenderer.fileTypes = ["video/mp4", "video/quicktime", "video/x-msvideo"];
VideoRenderer.weight = 0;

const Container = styled.div`
  width: 100%;
`;
const Video = styled.video`
  width: 100%;
  height: 100%;
  border: 0;
`;
