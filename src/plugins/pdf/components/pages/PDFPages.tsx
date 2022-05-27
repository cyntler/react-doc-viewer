/* eslint-disable */
import React, { FC, useContext, useEffect, useState } from "react";
import { Document } from "react-pdf";
import styled from "styled-components";
import { DocViewerContext, RenderContext } from "../../../../state";
import { setDocumentPagesCount } from "../../../../state/actions/render.actions";
import { initialState } from "../../../../state/reducers/main.reducers";
import { initialRenderSettingsState } from "../../../../state/reducers/render.reducers";
import onLoadCallback from "../../../../utils/onLoadCallback";
import { PDFAllPages } from "./PDFAllPages";
import PDFSinglePage from "./PDFSinglePage";

const PDFPages: FC<{}> = () => {
  const {
    state: { currentDocument }
  } = useContext(DocViewerContext);
  const {
    state: { paginated },
    dispatch
  } = useContext(RenderContext)
  const callback = onLoadCallback();

  useEffect(() => {
    dispatch(setDocumentPagesCount(initialRenderSettingsState.pagesCount));
  }, [currentDocument]);

  if (!currentDocument || currentDocument?.fileData === undefined) return null;

  return (
    <DocumentPDF
      file={currentDocument.fileData}
      onLoadSuccess={(payload) => {
        dispatch(setDocumentPagesCount(payload.numPages));
        callback(payload);
      }}
      loading={<span>Loading...</span>}
    >
      {paginated ? <PDFSinglePage /> : <PDFAllPages />}
    </DocumentPDF>
  );
};

const DocumentPDF = styled(Document)`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

export default PDFPages;
