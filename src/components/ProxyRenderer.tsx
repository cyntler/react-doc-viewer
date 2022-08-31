import React, { FC, useCallback } from "react";
import styled, { keyframes } from "styled-components";
import { setRendererRect } from "../state/actions/main.actions";
import { IStyledProps } from "../types";
import { useDocumentLoader } from "../utils/useDocumentLoader";
import { useWindowSize } from "../utils/useWindowSize";
import { LinkButton } from "./common";
import DocumentPagesNav from "./DocumentPagesNav";
import ExternalStateAdapter from "./ExternalStateAdapter";
import { LoadingIcon } from "./icons";

const Container = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  overflow-y: auto;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex: 1;
  height: 75px;
  align-items: center;
  justify-content: center;
`;

const spinAnim = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoadingIconContainer = styled.div`
  animation-name: ${spinAnim};
  animation-duration: 4s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
`;

const DownloadButton = styled(LinkButton)`
  width: 130px;
  height: 30px;
  background-color: ${(props: IStyledProps) => props.theme.primary};
  @media (max-width: 768px) {
    width: 125px;
    height: 25px;
  }
`;

const RenderContent = ({ state, CurrentRenderer }: any) => {
  const { config, documents, currentDocument, documentLoading } = state;

  if (!documents.length) {
    return <div id="no-documents">{/* No Documents */}</div>;
  }

  if (documentLoading) {
    if (config && config?.loadingRenderer?.overrideComponent) {
      const OverrideComponent = config.loadingRenderer.overrideComponent;
      return <OverrideComponent />;
    }

    return (
      <LoadingContainer id="loading-renderer" data-testid="loading-renderer">
        <LoadingIconContainer>
          <LoadingIcon color="#444" size={40} />
        </LoadingIconContainer>
      </LoadingContainer>
    );
  }

  if (CurrentRenderer) {
    return (
      <CurrentRenderer
        mainState={state}
        loaded={!documentLoading}
        onLoaded={() => {}}
      />
    );
  }

  if (config && config?.noRenderer?.overrideComponent) {
    const OverrideComponent = config.noRenderer.overrideComponent;
    return <OverrideComponent />;
  }

  return (
    <div id="no-renderer" data-testid="no-renderer">
      No Renderer for file type
      {currentDocument?.fileType}
      <DownloadButton
        id="no-renderer-download"
        href={currentDocument?.uri}
        download={currentDocument?.uri}
      >
        Download File
      </DownloadButton>
    </div>
  );
};

export const ProxyRenderer: FC<{}> = () => {
  const { state, dispatch, CurrentRenderer } = useDocumentLoader();
  const { documentLoading } = state;
  const size = useWindowSize();

  const containerRef = useCallback(
    (node) => {
      if (node) {
        dispatch(setRendererRect(node.getBoundingClientRect()));
      }
    },
    [size]
  );

  return (
    <Container id="proxy-renderer" ref={containerRef}>
      {!documentLoading && <ExternalStateAdapter />}
      {!documentLoading && <DocumentPagesNav />}
      <RenderContent state={state} CurrentRenderer={CurrentRenderer} />
    </Container>
  );
};
