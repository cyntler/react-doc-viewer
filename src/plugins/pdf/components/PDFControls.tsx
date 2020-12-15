import React, { FC, useContext } from "react";
import styled from "styled-components";
import { Button, LinkButton } from "../../../components/common";
import { IStyledProps } from "../../../types";
import { PDFContext } from "../state";
import { setPDFPaginated, setZoomLevel } from "../state/actions";
import { initialPDFState } from "../state/reducer";
import {
  DownloadPDFIcon,
  ResetZoomPDFIcon,
  TogglePaginationPDFIcon,
  ZoomInPDFIcon,
  ZoomOutPDFIcon,
} from "./icons";
import PDFPagination from "./PDFPagination";

const PDFControls: FC<{}> = () => {
  const {
    state: { mainState, paginated, zoomLevel, numPages },
    dispatch,
  } = useContext(PDFContext);

  const currentDocument = mainState?.currentDocument || null;

  return (
    <Container id="pdf-controls">
      {paginated && numPages > 1 && <PDFPagination />}

      {currentDocument?.fileData && (
        <DownloadButton
          id="pdf-download"
          href={currentDocument?.fileData as string}
          download={currentDocument?.fileName || currentDocument?.uri}
        >
          <DownloadPDFIcon color="#000" size="75%" />
        </DownloadButton>
      )}

      <ControlButton
        id="pdf-zoom-out"
        onMouseDown={() => dispatch(setZoomLevel(zoomLevel - 0.1))}
      >
        <ZoomOutPDFIcon color="#000" size="80%" />
      </ControlButton>

      <ControlButton
        id="pdf-zoom-in"
        onMouseDown={() => dispatch(setZoomLevel(zoomLevel + 0.1))}
      >
        <ZoomInPDFIcon color="#000" size="80%" />
      </ControlButton>

      <ControlButton
        id="pdf-zoom-reset"
        onMouseDown={() => dispatch(setZoomLevel(initialPDFState.zoomLevel))}
        disabled={zoomLevel === initialPDFState.zoomLevel}
      >
        <ResetZoomPDFIcon color="#000" size="70%" />
      </ControlButton>

      {numPages > 1 && (
        <ControlButton
          id="pdf-toggle-pagination"
          onMouseDown={() => dispatch(setPDFPaginated(!paginated))}
        >
          <TogglePaginationPDFIcon
            color="#000"
            size="70%"
            reverse={paginated}
          />
        </ControlButton>
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

const ControlButton = styled(Button)`
  width: 30px;
  height: 30px;
  @media (max-width: 768px) {
    width: 25px;
    height: 25px;
  }
`;

const DownloadButton = styled(LinkButton)`
  width: 30px;
  height: 30px;
  @media (max-width: 768px) {
    width: 25px;
    height: 25px;
  }
`;
