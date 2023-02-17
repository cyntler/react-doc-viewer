/* eslint-disable */
import React, { FC, useContext, useEffect } from "react";
import { Document } from "react-pdf";
import styled from "styled-components";
import { useTranslation } from "../../../../hooks/useTranslation";
import { PDFContext } from "../../state";
import { setNumPages } from "../../state/actions";
import { initialPDFState } from "../../state/reducer";
import { PDFAllPages } from "./PDFAllPages";
import PDFSinglePage from "./PDFSinglePage";

const PDFPages: FC<{}> = () => {
  const {
    state: { mainState, paginated },
    dispatch,
  } = useContext(PDFContext);
  const { t } = useTranslation();

  const currentDocument = mainState?.currentDocument || null;

  useEffect(() => {
    dispatch(setNumPages(initialPDFState.numPages));
  }, [currentDocument]);

  if (!currentDocument || currentDocument.fileData === undefined) return null;

  return (
    <DocumentPDF
      file={currentDocument.fileData}
      onLoadSuccess={({ numPages }) => dispatch(setNumPages(numPages))}
      loading={<span>{t("pdfPluginLoading")}</span>}
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
