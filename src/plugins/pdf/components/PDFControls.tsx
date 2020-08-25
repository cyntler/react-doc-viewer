import {
  faArrowsAltH,
  faArrowsAltV,
  faExpand,
  faFileDownload,
  faSearchMinus,
  faSearchPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import styled from "styled-components";
import Button from "../../../components/common/Button";
import DocViewerState from "../../../state";
import { IStyledProps } from "../../../types";
import { initialPDFState } from "../state";
import PDFRendererState from "../state";
import PDFPagination from "./PDFPagination";

const PDFControls: FC<{}> = () => {
  const [paginated, setPDFPaginated] = useRecoilState(
    PDFRendererState.paginated
  );
  const [zoomLevel, setZoomLevel] = useRecoilState(PDFRendererState.zoomLevel);
  const resetZoomLevel = useResetRecoilState(PDFRendererState.zoomLevel);
  const numPages = useRecoilValue(PDFRendererState.numPages);

  const currentDocument = useRecoilValue(DocViewerState.currentDocument);

  return (
    <Container id="pdf-controls">
      {paginated && numPages > 1 && <PDFPagination />}

      {currentDocument?.base64Data && (
        <Button
          id="pdf-download"
          href={currentDocument?.base64Data}
          download={currentDocument?.uri}
        >
          <FontAwesomeIcon icon={faFileDownload} />
        </Button>
      )}

      <Button
        id="pdf-zoom-out"
        onMouseDown={() => setZoomLevel(zoomLevel - 0.1)}
      >
        <FontAwesomeIcon icon={faSearchMinus} />
      </Button>

      <Button
        id="pdf-zoom-in"
        onMouseDown={() => setZoomLevel(zoomLevel + 0.1)}
      >
        <FontAwesomeIcon icon={faSearchPlus} />
      </Button>

      <Button
        id="pdf-zoom-reset"
        onMouseDown={() => resetZoomLevel()}
        disabled={zoomLevel === initialPDFState.zoomLevel}
      >
        <FontAwesomeIcon icon={faExpand} />
      </Button>

      {numPages > 1 && (
        <Button
          id="pdf-toggle-pagination"
          onMouseDown={() => setPDFPaginated(!paginated)}
        >
          <FontAwesomeIcon icon={paginated ? faArrowsAltV : faArrowsAltH} />
        </Button>
      )}
    </Container>
  );
};

export default PDFControls;

const Container = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1;
  justify-content: flex-end;
  padding: 8px;
  background-color: ${(props: IStyledProps) => props.theme.tertiary};
  box-shadow: 0px 2px 3px #00000033;

  @media (max-width: 768px) {
    padding: 6px;
  }
`;
