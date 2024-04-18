import HTMLRenderer from "./html";
import PDFRenderer from "./pdf";
import ImagesRenderer from "./images";
import TXTRenderer from "./txt";
import CSVRenderer from "./csv";
import VideoRenderer from "./video";

export const DocViewerRenderers = [
  HTMLRenderer,
  PDFRenderer,
  ImagesRenderer,
  TXTRenderer,
  CSVRenderer,
  VideoRenderer,
];

export {
  HTMLRenderer,
  PDFRenderer,
  ImagesRenderer,
  TXTRenderer,
  CSVRenderer,
  VideoRenderer,
};
