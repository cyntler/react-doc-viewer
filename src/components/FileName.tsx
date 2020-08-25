import React, { FC } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import DocViewerState from "../state";
import { IStyledProps } from "../types";

const FileName: FC<{}> = () => {
  const config = useRecoilValue(DocViewerState.config);
  const currentDocument = useRecoilValue(DocViewerState.currentDocument);

  if (!currentDocument || config?.header?.disableFileName) return null;

  let fileName = currentDocument.uri;
  const splitURL = fileName.split("/");
  if (splitURL.length) {
    fileName = splitURL[splitURL.length - 1];
  }

  return (
    <Container id="file-name" data-testid="file-name">
      {fileName}
    </Container>
  );
};

export default FileName;

const Container = styled.div`
  flex: 1;
  text-align: left;
  color: ${(props: IStyledProps) => props.theme.text_primary};
  font-weight: bold;
  margin: 0 10px;
  overflow: hidden;
`;
