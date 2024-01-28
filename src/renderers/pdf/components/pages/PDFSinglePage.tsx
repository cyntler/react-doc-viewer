import React, { FC, useContext, useEffect, useRef } from "react";
import { Page } from "react-pdf";
import styled from "styled-components";
import { IStyledProps } from "../../../..";
import { useTranslation } from "../../../../hooks/useTranslation";
import { PDFContext } from "../../state";

interface Props {
  pageNum?: number;
}

const PDFSinglePage: FC<Props> = ({ pageNum }) => {
  const {
    state: { mainState, paginated, zoomLevel, numPages, currentPage },
  } = useContext(PDFContext);
  const { t } = useTranslation();
  const pdfPageRef = useRef(null);

  const rendererRect = mainState?.rendererRect || null;

  const _pageNum = pageNum || currentPage;
  // call function to return page data for single
  useEffect(() => {
    if (!mainState?.config?.getPdfData) return;
    if (!numPages) return;
    if (!paginated) return;

    mainState?.config?.getPdfData({
      currentPage: _pageNum,
      totalPages: numPages,
    });
  }, [numPages, _pageNum]);

  // call function to return page data for multi page
  useEffect(() => {
    if (paginated) return;
    if (!mainState?.config?.getPdfData) return;
    if (!pdfPageRef?.current) return;
    if (!numPages) return;

    let observer = new IntersectionObserver((entries) => {
      if (!entries?.[0]?.isIntersecting) return;

      mainState?.config?.getPdfData({
        currentPage: _pageNum,
        totalPages: numPages,
      });
    });
    observer.observe(pdfPageRef?.current);
  }, [pdfPageRef?.current]);

  return (
    <PageWrapper
      id="pdf-page-wrapper"
      last={_pageNum >= numPages}
      ref={pdfPageRef}
    >
      {!paginated && (
        <PageTag id="pdf-page-info">
          {t("pdfPluginPageNumber", {
            currentPage: _pageNum,
            allPagesCount: numPages,
          })}
        </PageTag>
      )}
      <Page
        pageNumber={_pageNum || currentPage}
        scale={zoomLevel}
        height={(rendererRect?.height || 100) - 100}
        width={(rendererRect?.width || 100) - 100}
        loading={t("pdfPluginLoading")}
      />
    </PageWrapper>
  );
};

export default PDFSinglePage;

interface PageWrapperProps {
  last?: boolean;
}

const PageWrapper = styled.div<PageWrapperProps>`
  margin: 20px 0;
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
