import React from "react";
import { DocViewerContext, RenderContext } from "../../state";
import {
  setDocumentCurrentPage,
  setDocumentRenderSettings,
} from "../../state/actions/render.actions";
import { emitEvent } from "../../utils/events";
import getVisiblePageIndex from "../../utils/getVisiblePageIndex";
import PPTXRender from "./render";
import { parsePresentation } from "./utils/presentation.util";

const MemorizedRender = React.memo<any>(
  (args: any) => <PPTXRender {...args} />,
  (prev, current) => {
    if (prev.presentation) return true;
    return false;
  }
);

const DOCUMENT_PAGES_MARGIN = 8;

function PPTXRenderer(props: any) {
  const [presentation, setPresentation] = React.useState<any>(null);
  const scrollElement = document.querySelector("#pptx-container") as any;
  const { state: mainState } = React.useContext(DocViewerContext);
  const { state: renderSettings, dispatch } = React.useContext(RenderContext);

  React.useEffect(() => {
    if (!presentation) return;
    scrollElement.style.zoom = `${renderSettings.zoomLevel * 100}%`;

    const currentPageIndex = getVisiblePageIndex({
      scrollElement,
      pageHeight: presentation.size.height,
      pageMargin: DOCUMENT_PAGES_MARGIN,
      pagesCount: renderSettings.pagesCount,
    });

    if (currentPageIndex + 1 !== renderSettings.currentPage) {
      scrollElement.scrollTo({
        left: 0,
        top:
          (renderSettings.currentPage - 1) * presentation.size.height +
          DOCUMENT_PAGES_MARGIN * renderSettings.pagesCount,
      });
    }

    let endScrollTimerId: any = null;

    const onScrollEnd = () => {
      const currentPageIndex = getVisiblePageIndex({
        scrollElement,
        pageHeight: presentation.size.height,
        pageMargin: DOCUMENT_PAGES_MARGIN,
        pagesCount: renderSettings.pagesCount,
      });

      if (currentPageIndex === -1) return;
      const currentPage = currentPageIndex + 1;

      dispatch(
        setDocumentCurrentPage(
          currentPage > renderSettings.pagesCount
            ? renderSettings.pagesCount
            : currentPage
        )
      );
    };

    const onScroll = () => {
      if (endScrollTimerId) {
        clearTimeout(endScrollTimerId);
      }

      endScrollTimerId = setTimeout(onScrollEnd, 100);
    };

    scrollElement.onscroll = onScroll;
  }, [renderSettings]);

  React.useEffect(() => {
    if (!mainState.currentDocument) return;

    const thenableObject = parsePresentation(
      mainState.currentDocument.fileData!
    );

    thenableObject
      .then((presentation) => setPresentation(presentation))
      .catch((error) => console.error(error));
  }, []);

  const onRendered = React.useCallback(
    (slides) => {
      props.onLoaded(presentation);
      dispatch(
        setDocumentRenderSettings({
          currentPage: 1,
          zoomLevel: 1,
          fitType: "width",
          loaded: true,
          pagesCount: slides.length,
          paginated: true,
          rotationAngle: 0,
        })
      );
      emitEvent("onPaginationDocumentLoaded", slides);
    },
    [presentation]
  );

  return (
    <MemorizedRender presentation={presentation} onRendered={onRendered} />
  );
}

PPTXRenderer.fileTypes = [
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.ms-powerpoint",
];
PPTXRenderer.weight = 0;

export default PPTXRenderer;
