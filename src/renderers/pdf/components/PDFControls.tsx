import React, { FC, useContext } from "react";
import styled from "styled-components";
import { Button, LinkButton } from "../../../components/common";
import { IStyledProps } from "../../..";
import { PDFContext } from "../state";
import { setPDFPaginated, setZoomLevel } from "../state/actions";
import { useTranslation } from "../../../hooks/useTranslation";
import {
  DownloadPDFIcon,
  ResetZoomPDFIcon,
  TogglePaginationPDFIcon,
  ZoomInPDFIcon,
  ZoomOutPDFIcon,
} from "./icons";
import PDFPagination from "./PDFPagination";
import { DocViewerContext } from "../../../store/DocViewerProvider";

const PDFControls: FC = () => {
  const { t } = useTranslation();
  const { state: pdfState, dispatch } = useContext(PDFContext);

  const {
    mainState,
    paginated,
    zoomLevel,
    numPages,
    zoomJump,
    defaultZoomLevel,
  } = pdfState;

  const { state: viewerState } = useContext(DocViewerContext);
  const { config } = viewerState;

  const currentDocument = mainState?.currentDocument || null;

  const pdfZoomOut = () => dispatch(setZoomLevel(zoomLevel - zoomJump));
  const pdfZoomIn = () => dispatch(setZoomLevel(zoomLevel + zoomJump));
  const pdfZoomReset = () => dispatch(setZoomLevel(defaultZoomLevel));
  const pdfTogglePaginated = () => dispatch(setPDFPaginated(!paginated));

  const override = config?.pdfControls?.overrideComponent?.(
    pdfState,
    pdfZoomOut,
    pdfZoomIn,
    pdfZoomReset,
    pdfTogglePaginated,
  );

  if (override) {
    return override;
  } else {
    return (
      <Container id="pdf-controls">
        {paginated && numPages > 1 && <PDFPagination />}

        {currentDocument?.fileData && (
          <DownloadButton
            id="pdf-download"
            href={currentDocument?.fileData as string}
            download={currentDocument?.fileName || currentDocument?.uri}
            title={t("downloadButtonLabel")}
          >
            <DownloadPDFIcon color="#000" size="75%" />
          </DownloadButton>
        )}

        <ControlButton id="pdf-zoom-out" onMouseDown={pdfZoomOut}>
          <ZoomOutPDFIcon color="#000" size="80%" />
        </ControlButton>

        <ControlButton id="pdf-zoom-in" onMouseDown={pdfZoomIn}>
          <ZoomInPDFIcon color="#000" size="80%" />
        </ControlButton>

        <ControlButton
          id="pdf-zoom-reset"
          onMouseDown={pdfZoomReset}
          disabled={zoomLevel === defaultZoomLevel}
        >
          <ResetZoomPDFIcon color="#000" size="70%" />
        </ControlButton>

        {numPages > 1 && (
          <ControlButton
            id="pdf-toggle-pagination"
            onMouseDown={pdfTogglePaginated}
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
  }
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
