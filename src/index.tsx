import React, { CSSProperties, FC, useEffect } from "react";
import { RecoilRoot } from "recoil";
import styled, { ThemeProvider } from "styled-components";
import { HeaderBar } from "./components/HeaderBar";
import { ProxyRenderer } from "./components/ProxyRenderer";
import JPGRenderer from "./plugins/jpg";
import PDFRenderer from "./plugins/pdf";
import PNGRenderer from "./plugins/png";
import { initializeRecoilRoot } from "./state";
import { defaultTheme } from "./theme";
import { DocRenderer, IConfig, IDocument, ITheme } from "./types";
import { linkRenderResponder } from "./utils/linkRenderResponder";

export interface DocViewerProps {
  documents: IDocument[];
  className?: string;
  style?: CSSProperties;
  config?: IConfig;
  theme?: ITheme;
  pluginRenderers?: DocRenderer[];
}

const DocViewer: FC<DocViewerProps> = (props) => {
  useEffect(() => {
    props.pluginRenderers?.map((r) => linkRenderResponder(r));
  }, []);

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

export { DocViewerRenderers } from "./plugins";
export * from "./types";
export { JPGRenderer, PDFRenderer, PNGRenderer };
