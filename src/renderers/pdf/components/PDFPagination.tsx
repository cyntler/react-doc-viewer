import React, { FC, useContext } from "react";
import styled from "styled-components";
import { Button } from "../../../components/common";
import { IStyledProps } from "../../..";
import { PDFContext } from "../state";
import { setCurrentPage } from "../state/actions";
import { NextPDFNavIcon, PrevPDFNavIcon } from "./icons";
import { useTranslation } from "../../../hooks/useTranslation";

const PDFPagination: FC = () => {
  const {
    state: { currentPage, numPages },
    dispatch,
  } = useContext(PDFContext);
  const { t } = useTranslation();

  return (
    <Container id="pdf-pagination">
      <PageNavButtonLeft
        id="pdf-pagination-prev"
        onClick={() => dispatch(setCurrentPage(currentPage - 1))}
        disabled={currentPage === 1}
      >
        <PrevPDFNavIcon color="#000" size="50%" />
      </PageNavButtonLeft>

      <PageTag id="pdf-pagination-info">
        {t("pdfPluginPageNumber", {
          currentPage,
          allPagesCount: numPages,
        })}
      </PageTag>

      <PageNavButtonRight
        id="pdf-pagination-next"
        onClick={() => dispatch(setCurrentPage(currentPage + 1))}
        disabled={currentPage >= numPages}
      >
        <NextPDFNavIcon color="#000" size="50%" />
      </PageNavButtonRight>
    </Container>
  );
};

export default PDFPagination;

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const PageNavButtonLeft = styled(Button)`
  width: 30px;
  height: 30px;
  margin: 0 5px;

  @media (max-width: 768px) {
    width: 25px;
    height: 25px;
  }
`;
const PageNavButtonRight = styled(PageNavButtonLeft)`
  margin: 0 20px 0 5px;
`;

const PageTag = styled.div`
  color: ${(props: IStyledProps) => props.theme.textPrimary};
  font-size: 14px;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 10px;
  }
`;
