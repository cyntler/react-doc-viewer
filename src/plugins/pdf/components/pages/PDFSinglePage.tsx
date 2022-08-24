import React, { FC, useContext } from "react";
import { Page } from "react-pdf";
import styled from "styled-components";
import { DocViewerContext, RenderContext } from "../../../../state";
import { IStyledProps } from "../../../../types";

interface Props {
  pageNum: number;
  visible: boolean;
  pageDimension: any;
  onRendered: Function;
}
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

const PageNotVisible = styled.div`
  background: #fff;
`;

const PDFSinglePage: FC<Props> = (props) => {
  const { pageNum: pageNumber, onRendered, visible } = props;
  const documentNavigationPages = document.querySelector("#document-pages-nav");
  const subtractWidth = documentNavigationPages
    ? documentNavigationPages.clientWidth + 10
    : 10;

  const {
    state: { rendererRect },
  } = useContext(DocViewerContext);
  const {
    state: { zoomLevel, pagesCount, currentPage, rotationAngle },
  } = useContext(RenderContext);

  const _pageNum = pageNumber || currentPage;
  const pageWidth = rendererRect!.width - subtractWidth;
  const [pageDimension, setPageDimension] = React.useState<any>(null);

  return (
    <PageWrapper id="pdf-page-wrapper" last={_pageNum >= pagesCount}>
      {visible ? (
        <Page
          pageNumber={_pageNum || currentPage}
          scale={zoomLevel}
          rotate={rotationAngle}
          width={pageWidth}
          onLoadSuccess={(page: any) =>
            setPageDimension({
              width: page.width,
              height: page.height,
            })
          }
          onRenderSuccess={() => {
            const canvas: HTMLCanvasElement | null = document.querySelector(
              `#pdf-page-wrapper [data-page-number="${pageNumber}"] canvas`
            );
            onRendered({
              number: pageNumber,
              dimension: pageDimension,
              canvas,
            });
          }}
          loading="loading..."
        />
      ) : (
        <PageNotVisible
          style={
            props.pageDimension
              ? {
                  width: props.pageDimension.width * zoomLevel,
                  height: props.pageDimension.height * zoomLevel,
                }
              : undefined
          }
        />
      )}
    </PageWrapper>
  );
};

export default React.memo(PDFSinglePage, (prev, current) => {
  if (prev.pageDimension !== current.pageDimension) return false;
  if (prev.pageNum !== current.pageNum) return false;
  if (prev.visible !== current.visible) return false;
  return true;
});
