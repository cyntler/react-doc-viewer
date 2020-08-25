import React, { CSSProperties, FC } from "react";
import { RecoilRoot } from "recoil";
import styled, { ThemeProvider } from "styled-components";
import { HeaderBar } from "./components/HeaderBar";
import { ProxyRenderer } from "./components/ProxyRenderer";
import "./plugins";
import { initializeRecoilRoot } from "./state";
import { defaultTheme } from "./theme";
import { IConfig, IDocument, ITheme } from "./types";

export interface DocViewerProps {
  documents: IDocument[];
  className?: string;
  style?: CSSProperties;
  config?: IConfig;
  theme?: ITheme;
}

const DocViewer: FC<DocViewerProps> = (props) => {
  if (!props.documents || props.documents === undefined) {
    throw new Error(
      "Please provide an array of documents to DocViewer.\ne.g. <DocViewer documents={[ { uri: 'https://mypdf.pdf' } ]} />"
    );
  }

  return (
    <RecoilRoot initializeState={initializeRecoilRoot(props)}>
      <ThemeProvider
        theme={props.theme ? { ...defaultTheme, ...props.theme } : defaultTheme}
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
    </RecoilRoot>
  );
};

export default DocViewer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #eee;
`;

export * from "./components/common";
export * from "./state";
export * from "./types";
export * from "./utils/linkRenderResponder";
