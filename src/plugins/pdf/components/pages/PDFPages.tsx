/* eslint-disable */
import React, { FC, useContext, useEffect, useState } from "react";
import { Document } from "react-pdf";
import styled from "styled-components";
import { DocViewerContext, RenderContext } from "../../../../state";
import { setDocumentCurrentPage, setDocumentPagesCount, setDocumentRenderLoaded } from "../../../../state/actions/render.actions";
import { initialRenderSettingsState } from "../../../../state/reducers/render.reducers";
import { emitEvent } from "../../../../utils/events";
import getVisiblePageIndex from "../../../../utils/getVisiblePageIndex";
import onLoadCallback from "../../../../utils/onLoadCallback";
import { PDFAllPages } from "./PDFAllPages";

const DOCUMENT_PAGES_MARGIN = 8;

const PDFPages: FC<{}> = () => {
  const {
    state: { currentDocument }
  } = useContext(DocViewerContext);
  const {
    state: renderSettings,
    dispatch
  } = useContext(RenderContext)

  const [loadedPageCount, setLoadedPageCount] = useState<number>(0);
  const scrollElement = document.querySelector("#pdf-renderer") as HTMLElement;
  const canvas: HTMLCanvasElement | null = document.querySelector("#pdf-page-wrapper canvas");

  // Scrolling to the current page and setting the current page by the visible page index
  useEffect(() => {
    if (!scrollElement || !canvas) return;

    const currentPageIndex = getVisiblePageIndex({
      scrollElement,
      pageHeight: canvas.clientHeight,
      pageMargin: DOCUMENT_PAGES_MARGIN,
      pagesCount: renderSettings.pagesCount
    });

    if (currentPageIndex + 1 !== renderSettings.currentPage) {
      scrollElement.scrollTo({
        left: 0,
        top: (renderSettings.currentPage - 1) * canvas.clientHeight + DOCUMENT_PAGES_MARGIN * renderSettings.pagesCount
      })
    }

    let endScrollTimerId: any = null;

    const onScrollEnd = () => {
      if (canvas) {
        const currentPageIndex = getVisiblePageIndex({
          scrollElement,
          pageHeight: canvas.clientHeight,
          pageMargin: DOCUMENT_PAGES_MARGIN,
          pagesCount: renderSettings.pagesCount
        });

        if (currentPageIndex === -1) return;
        const currentPage = currentPageIndex + 1;

        dispatch(setDocumentCurrentPage(currentPage > renderSettings.pagesCount ? renderSettings.pagesCount : currentPage));
      };
    }

    const onScroll = () => {
      if (endScrollTimerId) {
        clearTimeout(endScrollTimerId);
      }

      endScrollTimerId = setTimeout(onScrollEnd, 100);
    }

    scrollElement.onscroll = onScroll;
  }, [canvas, scrollElement, renderSettings.currentPage]);

  // Reset the render settings after the document is changed
  useEffect(() => {
    dispatch(setDocumentPagesCount(initialRenderSettingsState.pagesCount));
    setLoadedPageCount(0);
  }, [currentDocument]);

  // Set the loaded page count
  useEffect(() => {
    if (loadedPageCount !== renderSettings.pagesCount) return;

    const elements = Array.from(
      document.querySelectorAll("#pdf-page-wrapper canvas")
    );

    const payload = elements.map(
      (el: any, index) => ({
        index,
        imageURL: el.toDataURL()
      })
    );

    emitEvent("onPaginationDocumentLoaded", payload);
  }, [loadedPageCount]);

  if (!currentDocument || currentDocument?.fileData === undefined) return null;

  return (
    <DocumentPDF
      file={currentDocument.fileData}
      onLoadSuccess={(payload) => {
        dispatch(setDocumentPagesCount(payload.numPages));
        dispatch(setDocumentRenderLoaded(true));
      }}
      loading={<span>Loading...</span>}
    >
      <div className="document-content">
        <PDFAllPages onRendered={() => setLoadedPageCount(loadedPageCount + 1)} />
      </div>
    </DocumentPDF>
  );
};

const DocumentPDF = styled(Document)`
  width: 100%;
  display: flex;

  .document-content { 
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    gap: ${DOCUMENT_PAGES_MARGIN}px;
  }
`;

export default PDFPages;
