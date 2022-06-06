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

export const ProxyRenderer: FC<{}> = () => {
  const { state, dispatch, CurrentRenderer } = useDocumentLoader();
  const { documents, documentLoading, config } = state;

  const [currentDocument, setCurrentDocument] = React.useState(state.currentDocument);
  const [documentLoaded, setDocumentLoaded] = React.useState(false);

  React.useEffect(() => {
    if (currentDocument?.uri !== state.currentDocument?.uri) {
      setDocumentLoaded(false);
      setCurrentDocument(state.currentDocument);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const size = useWindowSize();

  const containerRef = useCallback(
    (node) => {
      node && dispatch(setRendererRect(node?.getBoundingClientRect()));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [size]
  );

  const Contents = () => {
    if (!documents.length) {
      return <div id="no-documents">{/* No Documents */}</div>;
    } else if (documentLoading) {
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
    } else {
      if (CurrentRenderer) {
        return <CurrentRenderer mainState={state} loaded={documentLoaded} onLoaded={() => setDocumentLoaded(true)} />;
      } else if (CurrentRenderer === undefined) {
        return null;
      } else {
        if (config && config?.noRenderer?.overrideComponent) {
          const OverrideComponent = config.noRenderer.overrideComponent;
          return <OverrideComponent />;
        }

        return (
          <div id="no-renderer" data-testid="no-renderer">
            No Renderer for file type {currentDocument?.fileType}
            <DownloadButton
              id="no-renderer-download"
              href={currentDocument?.uri}
              download={currentDocument?.uri}
            >
              Download File
            </DownloadButton>
          </div>
        );
      }
    }
  };

  return (
    <Container id="proxy-renderer" ref={containerRef}>
      {!documentLoading && <ExternalStateAdapter />}
      {!documentLoading && <DocumentPagesNav />}
      <Contents />
    </Container>
  );
};

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
