import React, { FC, useContext } from "react";
import styled from "styled-components";
import { Button, LinkButton } from "../../../components/common";
import { DocViewerContext, RenderContext } from "../../../state";
import { setDocumentPaginated, setDocumentZoomLevel } from "../../../state/actions/render.actions";
import { initialRenderSettingsState } from "../../../state/reducers/render.reducers";
import { IStyledProps } from "../../../types";
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
    state: { currentDocument },
  } = useContext(DocViewerContext);

  const {
    state: renderSettings,
    dispatch: renderDispatch,
  } = useContext(RenderContext);

  return (
    <Container id="pdf-controls">
      {renderSettings.paginated && renderSettings.pagesCount > 1 && <PDFPagination />}

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
        onMouseDown={() => renderDispatch(setDocumentZoomLevel(renderSettings.zoomLevel - 0.1))}
      >
        <ZoomOutPDFIcon color="#000" size="80%" />
      </ControlButton>

      <ControlButton
        id="pdf-zoom-in"
        onMouseDown={() => renderDispatch(setDocumentZoomLevel(renderSettings.zoomLevel + 0.1))}
      >
        <ZoomInPDFIcon color="#000" size="80%" />
      </ControlButton>

      <ControlButton
        id="pdf-zoom-reset"
        onMouseDown={() => renderDispatch(setDocumentZoomLevel(initialRenderSettingsState.zoomLevel))}
        disabled={initialRenderSettingsState.zoomLevel === renderSettings.zoomLevel}
      >
        <ResetZoomPDFIcon color="#000" size="70%" />
      </ControlButton>

      {renderSettings.pagesCount > 1 && (
        <ControlButton
          id="pdf-toggle-pagination"
          onMouseDown={() => renderDispatch(setDocumentPaginated(!renderSettings.paginated))}
        >
          <TogglePaginationPDFIcon
            color="#000"
            size="70%"
            reverse={renderSettings.paginated}
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
