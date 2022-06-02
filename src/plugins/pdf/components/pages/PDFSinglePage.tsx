import React, { FC, useContext } from "react";
import { Page } from "react-pdf";
import styled from "styled-components";
import { DocViewerContext, RenderContext } from "../../../../state";
import { IStyledProps } from "../../../../types";

interface Props {
  pageNum?: number;
  onRendered: Function;
}

const PDFSinglePage: FC<Props> = (props) => {
  const { pageNum, onRendered } = props;
  const documentNavigationPages = document.querySelector("#document-pages-nav");
  const subtractWidth = documentNavigationPages ? documentNavigationPages.clientWidth + 10 : 10;
  
  const {
    state: { rendererRect },
  } = useContext(DocViewerContext);
  const {
    state: {
      zoomLevel, pagesCount, currentPage, rotationAngle
    },
  } = useContext(RenderContext);

  const _pageNum = pageNum || currentPage;

  return (
    <PageWrapper id="pdf-page-wrapper" last={_pageNum >= pagesCount}>
      <Page
        pageNumber={_pageNum || currentPage}
        scale={zoomLevel}
        rotate={rotationAngle}
        height={(rendererRect?.height || 100) - subtractWidth}
        width={(rendererRect?.width || 100) - subtractWidth}
        onRenderSuccess={() => onRendered()}
      />
    </PageWrapper>
  );
};

export default PDFSinglePage;

interface PageWrapperProps {
  last?: boolean;
}
const PageWrapper = styled.div<PageWrapperProps>`
  /* margin: 20px 0; */
`;
const PageTag = styled.div`
  padding: 0 0 10px 10px;
  color: ${(props: IStyledProps) => props.theme.textTertiary};
  font-size: 14px;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 10px;
  }
`;
