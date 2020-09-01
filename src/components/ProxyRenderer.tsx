import React, { FC, useCallback, useContext } from "react";
import styled from "styled-components";
import { DocViewerContext } from "../state";
import { setRendererRect } from "../state/actions";
import { useDocumentLoader } from "../utils/useDocumentLoader";
import { useWindowSize } from "../utils/useWindowSize";

export const ProxyRenderer: FC<{}> = () => {
  const { CurrentRenderer } = useDocumentLoader();

  const {
    state: { currentDocument, documentLoading, documents },
    dispatch,
  } = useContext(DocViewerContext);

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
      return (
        <div id="loading-renderer" data-testid="loading-renderer">
          {/*Loading*/}
        </div>
      );
    } else {
      if (CurrentRenderer) {
        return <CurrentRenderer />;
      } else {
        return (
          <div id="no-renderer" data-testid="no-renderer">
            No Renderer for file type {currentDocument?.fileType}
          </div>
        );
      }
    }
  };

  return (
    <Container id="proxy-renderer" ref={containerRef}>
      <Contents />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;
  overflow-y: auto;
`;
