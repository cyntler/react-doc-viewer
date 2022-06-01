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
import { AppProvider, RenderProvider } from "./state";
import { defaultTheme } from "./theme";
import { DocRenderer, IConfig, IDocument, IRenderSettings, ITheme } from "./types";
import onLoadCallback from "./utils/onLoadCallback";

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

const DocViewer: FC<DocViewerProps> = ({ onLoaded, ...props }) => {
  onLoadCallback(onLoaded);

  const { renderSettings, ...appProps } = props;
  const [appProviderProps,] = React.useState(appProps);

  if (!appProps.documents || appProps.documents === undefined) {
    throw new Error("Please provide an array of documents to DocViewer!");
  }

  return (
    <AppProvider {...appProviderProps}>
      <ThemeProvider
        theme={appProps.theme ? { ...defaultTheme, ...appProps.theme } : defaultTheme}
      >
        <RenderProvider renderSettings={renderSettings}>
          <Container
            id="react-doc-viewer"
            data-testid="react-doc-viewer"
            {...props}
          >
            <HeaderBar />
            <ProxyRenderer />
          </Container>
        </RenderProvider>
      </ThemeProvider>
    </AppProvider>
  );
};

export default DocViewer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
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
