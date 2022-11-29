import React, { CSSProperties, FC, memo } from "react";
import styled, { ThemeProvider } from "styled-components";
import { HeaderBar } from "./components/HeaderBar";
import { ProxyRenderer } from "./components/ProxyRenderer";
import { DocViewerProvider } from "./store/DocViewerProvider";
import { defaultTheme } from "./defaultTheme";
import { DocRenderer, IConfig, IDocument, ITheme } from "./models";
import { AvailableLanguages } from "./utils/i18n";

export interface DocViewerProps {
  documents: IDocument[];
  className?: string;
  style?: CSSProperties;
  config?: IConfig;
  theme?: ITheme;
  pluginRenderers?: DocRenderer[];
  prefetchMethod?: string;
  requestHeaders?: Record<string, string>;
  initialActiveDocument?: IDocument;
  language?: AvailableLanguages;
}

const DocViewer: FC<DocViewerProps> = (props) => {
  const { documents, theme } = props;

  if (!documents) {
    throw new Error("Please provide an array of documents to DocViewer!");
  }

  return (
    <DocViewerProvider {...props}>
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
    </DocViewerProvider>
  );
};

export default memo(DocViewer);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #ffffff;
  width: 100%;
  height: 100%;
`;

export { DocViewerRenderers } from "./plugins";
export * from "./models";
export * from "./utils/fileLoaders";
export { type AvailableLanguages } from "./utils/i18n";
export * from "./plugins";
