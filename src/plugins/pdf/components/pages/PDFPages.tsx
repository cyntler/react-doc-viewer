/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable consistent-return */
import React, { useContext, useEffect, useState } from "react";
import { Document } from "react-pdf";
import styled from "styled-components";
import { DocViewerContext, RenderContext } from "../../../../state";
import {
  setDocumentCurrentPage,
  setDocumentPagesCount,
  setDocumentRenderSettings,
} from "../../../../state/actions/render.actions";
import { initialRenderSettingsState } from "../../../../state/reducers/render.reducers";
import { createEvent, emitEvent } from "../../../../utils/events";
import getVisibleIndexRangeByParent from "../../../../utils/getVisibleIndexRangeByParent";
import getVisiblePageIndex from "../../../../utils/getVisiblePageIndex";
import makeScrollListener from "../../../../utils/makeScrollListener";
import { PDFAllPages } from "./PDFAllPages";

const DOCUMENT_PAGES_MARGIN = 8;

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

const PDFPages = () => {
  const {
    state: { currentDocument },
  } = useContext(DocViewerContext);
  const { state: renderSettings, dispatch } = useContext(RenderContext);

  const [pageDimension, setPageDimension] = useState<any>(null);
  const [requestPagesRange, setRequestPagesRange] = useState<any[]>([
    { min: 0, max: 5, main: true },
  ]);
  const scrollElement = document.querySelector("#pdf-renderer") as HTMLElement;

  useEffect(() => {
    if (!scrollElement || !pageDimension) return;

    const clearScrollListener = makeScrollListener(
      scrollElement,
      () => {},
      () => {
        const currentPageIndex = getVisiblePageIndex({
          scrollElement,
          pageHeight: pageDimension.height * renderSettings.zoomLevel,
          pageMargin: DOCUMENT_PAGES_MARGIN,
          pagesCount: renderSettings.pagesCount,
        });

        if (
          currentPageIndex !== -1 &&
          currentPageIndex + 1 !== renderSettings.currentPage
        ) {
          const currentPage = currentPageIndex + 1;

          dispatch(
            setDocumentCurrentPage(
              currentPage > renderSettings.pagesCount
                ? renderSettings.pagesCount
                : currentPage
            )
          );
        }

        const visibleRange = getVisibleIndexRangeByParent(scrollElement, {
          width: pageDimension.width * renderSettings.zoomLevel,
          height: pageDimension.height * renderSettings.zoomLevel,
        });

        const alreadyExists = requestPagesRange.find(
          (range) =>
            range.min <= visibleRange.min && range.max >= visibleRange.max
        );

        if (!alreadyExists) {
          setRequestPagesRange(
            requestPagesRange.map((requestRange) =>
              requestRange.main ? { main: true, ...visibleRange } : requestRange
            )
          );
        }
      },
      200
    );

    const deleteRequestRangeListener = createEvent(
      "onPageRequestRange",
      (visibleRange) => {
        const alreadyExists = requestPagesRange.find(
          (range) =>
            range.min <= visibleRange.min && range.max >= visibleRange.max
        );

        if (!alreadyExists) {
          setRequestPagesRange([
            ...requestPagesRange.filter((a) => a.main),
            visibleRange,
          ]);
        }
      }
    );

    return () => {
      deleteRequestRangeListener();
      clearScrollListener();
    };
  }, [
    scrollElement,
    pageDimension,
    requestPagesRange,
    renderSettings.currentPage,
    renderSettings.zoomLevel,
  ]);

  // Scrolling to the current page and setting the current page by the visible page index
  useEffect(() => {
    if (!scrollElement || !pageDimension) return;

    const pageHeight = pageDimension.height * renderSettings.zoomLevel;
    const currentPageIndex = getVisiblePageIndex({
      scrollElement,
      pageHeight,
      pageMargin: DOCUMENT_PAGES_MARGIN,
      pagesCount: renderSettings.pagesCount,
    });

    if (currentPageIndex + 1 !== renderSettings.currentPage) {
      scrollElement.scrollTo({
        left: 0,
        top:
          (renderSettings.currentPage - 1) * pageHeight + DOCUMENT_PAGES_MARGIN,
      });
    }
  }, [
    pageDimension,
    scrollElement,
    renderSettings.currentPage,
    renderSettings.pagesCount,
  ]);

  useEffect(() => {
    dispatch(setDocumentPagesCount(initialRenderSettingsState.pagesCount));
  }, [currentDocument]);

  if (!currentDocument || currentDocument?.fileData === undefined) return <></>;

  return (
    <DocumentPDF
      file={currentDocument.fileData}
      onLoadSuccess={(payload) => {
        dispatch(
          setDocumentRenderSettings({
            currentPage: 1,
            zoomLevel: 1,
            fitType: "width",
            loaded: true,
            pagesCount: payload.numPages,
            paginated: true,
            rotationAngle: 0,
          })
        );

        const pages = new Array(payload.numPages).fill(0);
        emitEvent(
          "onPaginationDocumentLoaded",
          pages.map((page, index) => ({
            index,
            loaded: false,
          }))
        );
      }}
      loading={<span>Loading...</span>}
    >
      <div className="document-content">
        <PDFAllPages
          pageRanges={requestPagesRange}
          pageDimension={pageDimension}
          onRendered={(page: any): any => {
            if (!pageDimension) {
              setPageDimension(page.dimension);
            }

            emitEvent("onPaginationDocumentPagesLoaded", [
              {
                index: page.number - 1,
                imageURL: page.canvas.toDataURL(),
              },
            ]);
          }}
        />
      </div>
    </DocumentPDF>
  );
};

export default PDFPages;
