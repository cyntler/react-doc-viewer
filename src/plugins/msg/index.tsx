import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { MSGErrorResult, MSGFileData, MSGReader } from "wl-msg-reader";
import { DocRenderer, IStyledProps } from "../../types";
import { arrayBufferFileLoader } from "../../utils/fileLoaders";

const MSGRenderer: DocRenderer = ({ mainState: { currentDocument } }) => {
  const [fileData, setFileData] = useState<MSGFileData | MSGErrorResult>();

  useEffect(() => {
    if (!currentDocument || !currentDocument.fileData) return;

    const _fd = new MSGReader(
      currentDocument.fileData as ArrayBuffer
    ).getFileData();
    setFileData(_fd);
  }, [currentDocument?.fileData]);

  useEffect(() => {
    if (!fileData || fileData.hasOwnProperty("error")) return;

    let iframeCont = document.getElementById(
      "msg-body"
    ) as HTMLIFrameElement | null;
    let iframe = iframeCont?.contentWindow && iframeCont.contentWindow;
    if (!iframe) return;

    const iframeDoc = iframe.document;

    let body = (fileData as MSGFileData).body.replace(
      /(\r\n|\n|\r)/gm,
      "<br />"
    );

    iframeDoc.open();
    iframeDoc.write(`${body}`);
    iframeDoc.close();
  }, [fileData]);

  if (!fileData || fileData.hasOwnProperty("error")) {
    return <span>{(fileData as MSGErrorResult)?.error}</span>;
  }

  let {
    recipients,
    subject,
    senderEmail,
    senderName,
  } = fileData as MSGFileData;

  return (
    <Container id="msg-renderer">
      <h2 id="msg-subject-title" style={{ marginBottom: 0 }}>
        {subject}
      </h2>

      <Sender name={senderName} email={senderEmail} />

      <RecipientContainer id="msg-recipient">
        <h3 id="msg-recipient-title">Recipients</h3>
        <ul id="msg-recipient-ul">
          {recipients.map((r, i) => (
            <li key={i} id="msg-recipient-li">
              <span id="msg-recipient-name">{r.name}</span>
              {r.hasOwnProperty("email") && (
                <span id="msg-recipient-email"> - {r.email}</span>
              )}
            </li>
          ))}
        </ul>
      </RecipientContainer>

      <BodyIFrame id="msg-body" sandbox="allow-same-origin" />
    </Container>
  );
};

const Sender: FC<{ name: string; email: string }> = ({ name, email }) => {
  if (!name && !email) return null;

  return (
    <SenderContainer id="msg-sender">
      <h3 id="msg-sender-title">Sender</h3>
      {name !== undefined && <div id="msg-sender-name">{name}</div>}
      {email !== undefined && <div id="msg-sender-email">{email}</div>}
    </SenderContainer>
  );
};

export default MSGRenderer;

MSGRenderer.fileTypes = ["msg", "application/vnd.ms-outlook"];
MSGRenderer.weight = 0;
MSGRenderer.fileLoader = arrayBufferFileLoader;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 30px;
`;

const SenderContainer = styled.div`
  padding: 0 15px 15px 15px;
  margin-top: 20px;
  border: 1px solid ${(props: IStyledProps) => props.theme.secondary};
`;

const RecipientContainer = styled.div`
  padding: 0 15px;
  margin-top: 20px;
  border: 1px solid ${(props: IStyledProps) => props.theme.secondary};
`;

const BodyIFrame = styled.iframe`
  height: 100%;
  padding: 15px;
  margin: 20px 0 20px 0;
  border: 1px solid ${(props: IStyledProps) => props.theme.secondary};
`;
