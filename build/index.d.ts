import { CSSProperties, FC } from "react";
import BMPRenderer from "./plugins/bmp";
import HTMLRenderer from "./plugins/html";
import ImageProxyRenderer from "./plugins/image";
import JPGRenderer from "./plugins/jpg";
import MSDocRenderer from "./plugins/msdoc";
import MSGRenderer from "./plugins/msg";
import PDFRenderer from "./plugins/pdf";
import PNGRenderer from "./plugins/png";
import TIFFRenderer from "./plugins/tiff";
import TXTRenderer from "./plugins/txt";
import { DocRenderer, IConfig, IDocument, IRenderSettings, ITheme } from "./types";
export interface DocViewerProps {
    documents: IDocument[];
    renderSettings: IRenderSettings;
    className?: string;
    style?: CSSProperties;
    config?: IConfig;
    theme?: ITheme;
    prefetchMethod?: string;
    pluginRenderers?: DocRenderer[];
    onLoaded?: (data?: any) => void;
}
declare const DocViewer: FC<DocViewerProps>;
export default DocViewer;
export { DocViewerRenderers } from "./plugins";
export * from "./types";
export * from "./utils/fileLoaders";
export { BMPRenderer, HTMLRenderer, ImageProxyRenderer, JPGRenderer, MSDocRenderer, MSGRenderer, PDFRenderer, PNGRenderer, TIFFRenderer, TXTRenderer, };
