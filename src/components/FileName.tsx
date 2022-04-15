import React, { FC, useContext } from "react";
import styled from "styled-components";
import { DocViewerContext } from "../state";
import { IStyledProps } from "../types";

export const FileName: FC<{}> = () => {
  const {
    state: { config, currentDocument },
  } = useContext(DocViewerContext);

  if (!currentDocument || config?.header?.disableFileName) return null;

  let fileName = "";

  if (currentDocument.fileName) {
    fileName = currentDocument.fileName;
  } else {
    fileName = currentDocument.uri || "";
    fileName = decodeURI(fileName);

    if (!config?.header?.retainURLParams) {
      fileName = fileName.split("?")[0];
    }

    const splitURL = fileName.split("/");
    if (splitURL.length) {
      fileName = splitURL[splitURL.length - 1];
    }
  }

  return (
    <Container id="file-name" data-testid="file-name">
      {fileName}
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  text-align: left;
  color: ${(props: IStyledProps) => props.theme.text_primary};
  font-weight: bold;
  margin: 0 10px;
  overflow: hidden;
`;
