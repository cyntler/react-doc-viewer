import React, { useEffect } from "react";
import styled from "styled-components";
import { DocRenderer, IStyledProps } from "../..";
import { dataURLFileLoader } from "../../utils/fileLoaders";

const HTMLRenderer: DocRenderer = ({ mainState: { currentDocument } }) => {
  useEffect(() => {
    const b64String = currentDocument?.fileData as string;

    let encoding = "";
    const bodyBase64 =
      b64String?.replace(
        /^data:text\/html;(?:charset=([^;]*);)?base64,/,
        (_, charset) => {
          encoding = charset;
          return "";
        },
      ) || "";
    let body: string = window.atob(bodyBase64);

    if (encoding) {
      // decode charset
      const buffer = new Uint8Array(body.length);
      for (let i = 0; i < body.length; i++) buffer[i] = body.charCodeAt(i);
      body = new TextDecoder(encoding).decode(buffer);
    }

    const iframeCont = document.getElementById(
      "html-body",
    ) as HTMLIFrameElement | null;

    const iframe = iframeCont?.contentWindow && iframeCont.contentWindow;
    if (!iframe) return;

    const iframeDoc = iframe.document;
    iframeDoc.open();
    iframeDoc.write(`${body}`);
    iframeDoc.close();
  }, [currentDocument]);

  return (
    <Container id="html-renderer">
      <BodyIFrame id="html-body" sandbox="allow-same-origin" />
    </Container>
  );
};

export default HTMLRenderer;

HTMLRenderer.fileTypes = ["htm", "html", "text/htm", "text/html"];
HTMLRenderer.weight = 0;
HTMLRenderer.fileLoader = dataURLFileLoader;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 30px;
`;

const BodyIFrame = styled.iframe`
  height: 100%;
  padding: 15px;
  margin: 20px 0 20px 0;
  border: 1px solid ${(props: IStyledProps) => props.theme.secondary};
`;
