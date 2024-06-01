import "core-js/proposals/promise-with-resolvers";
import React, { CSSProperties, forwardRef, memo } from "react";
import styled, { ThemeProvider } from "styled-components";
import { HeaderBar } from "./components/HeaderBar";
import { ProxyRenderer } from "./components/ProxyRenderer";
import { defaultTheme } from "./defaultTheme";
import { AvailableLanguages } from "./i18n";
import {
  DocRenderer,
  DocViewerRef,
  IConfig,
  IDocument,
  ITheme,
} from "./models";
import { DocViewerRenderers } from "./renderers";
import { DocViewerProvider } from "./store/DocViewerProvider";

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
  activeDocument?: IDocument;
  onDocumentChange?: (document: IDocument) => void;
}

const DocViewer = forwardRef<DocViewerRef, DocViewerProps>((props, ref) => {
  const { documents, theme } = props;

  if (!documents) {
    throw new Error("Please provide an array of documents to DocViewer!");
  }

  return (
    <DocViewerProvider
      ref={ref}
      pluginRenderers={DocViewerRenderers}
      {...props}
    >
      <ThemeProvider
        theme={theme ? { ...defaultTheme, ...theme } : defaultTheme}
      >
        <Container
          id="react-doc-viewer"
          data-testid="react-doc-viewer"
          className={props.className}
          style={props.style}
        >
          <HeaderBar />
          <ProxyRenderer />
        </Container>
      </ThemeProvider>
    </DocViewerProvider>
  );
});

export default memo(DocViewer);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  width: 100%;
  height: 100%;
`;
