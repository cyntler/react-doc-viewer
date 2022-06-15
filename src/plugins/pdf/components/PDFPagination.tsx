import React, { FC, useContext } from "react";
import styled from "styled-components";
import { Button } from "../../../components/common";
import { RenderContext } from "../../../state";
import { setDocumentCurrentPage } from "../../../state/actions/render.actions";
import { IStyledProps } from "../../../types";
import { NextPDFNavIcon, PrevPDFNavIcon } from "./icons";

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
const Container = styled.div`
  display: flex;
  align-items: center;
`;

function PDFPagination() {
  const { state: renderSettings, dispatch } = useContext(RenderContext);

  return (
    <Container id="pdf-pagination">
      <PageNavButtonLeft
        id="pdf-pagination-prev"
        onClick={() =>
          dispatch(setDocumentCurrentPage(renderSettings.currentPage - 1))
        }
        disabled={renderSettings.currentPage === 1}
      >
        <PrevPDFNavIcon color="#000" size="50%" />
      </PageNavButtonLeft>

      <PageTag id="pdf-pagination-info">
        {`Page ${renderSettings.currentPage}/${renderSettings.pagesCount}`}
      </PageTag>

      <PageNavButtonRight
        id="pdf-pagination-next"
        onClick={() =>
          dispatch(setDocumentCurrentPage(renderSettings.currentPage + 1))
        }
        disabled={renderSettings.currentPage >= renderSettings.pagesCount}
      >
        <NextPDFNavIcon color="#000" size="50%" />
      </PageNavButtonRight>
    </Container>
  );
}

export default PDFPagination;
