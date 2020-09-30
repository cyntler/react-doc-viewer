import React, { CSSProperties, FC } from "react";
import styled, { ThemeProvider } from "styled-components";
import { HeaderBar } from "./components/HeaderBar";
import { ProxyRenderer } from "./components/ProxyRenderer";
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
import { AppProvider } from "./state";
import { defaultTheme } from "./theme";
import { DocRenderer, IConfig, IDocument, ITheme } from "./types";

export interface DocViewerProps {
  documents: IDocument[];
  className?: string;
  style?: CSSProperties;
  config?: IConfig;
  theme?: ITheme;
  pluginRenderers?: DocRenderer[];
}

const DocViewer: FC<DocViewerProps> = (props) => {
  const { documents, theme } = props;

  if (!documents || documents === undefined) {
    throw new Error(
      "Please provide an array of documents to DocViewer.\ne.g. <DocViewer documents={[ { uri: 'https://mypdf.pdf' } ]} />"
    );
  }

  return (
    <AppProvider {...props}>
      <ThemeProvider
        theme={theme ? { ...defaultTheme, ...theme } : defaultTheme}
      >
        <Container
          id="react-doc-viewer"
          data-testid="react-doc-viewer"
          {...props}
        >
          <HeaderBar />
          <ProxyRenderer />
        </Container>
      </ThemeProvider>
    </AppProvider>
  );
};

export default DocViewer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #eee;
`;

export { DocViewerRenderers } from "./plugins";
export * from "./types";
export * from "./utils/fileLoaders";
export {
  BMPRenderer,
  HTMLRenderer,
  ImageProxyRenderer,
  JPGRenderer,
  MSDocRenderer,
  MSGRenderer,
  PDFRenderer,
  PNGRenderer,
  TIFFRenderer,
  TXTRenderer,
};
