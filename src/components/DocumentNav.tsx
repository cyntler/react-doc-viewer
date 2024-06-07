"use client";

import { FC, useContext } from "react";
import styled from "styled-components";
import { DocViewerContext } from "../store/DocViewerProvider";
import { nextDocument, previousDocument } from "../store/actions";
import { IStyledProps } from "..";
import { ButtonSecondary } from "./common/Button";
import { NextDocIcon, PrevDocIcon } from "./icons";
import { useTranslation } from "../hooks/useTranslation";

export const DocumentNav: FC = () => {
  const {
    state: { currentDocument, currentFileNo, documents },
    dispatch,
  } = useContext(DocViewerContext);
  const { t } = useTranslation();

  if (documents.length <= 1 || !currentDocument) return null;

  let fileName = currentDocument.uri || "";
  const splitURL = fileName?.split("/");
  if (splitURL.length) {
    fileName = splitURL[splitURL.length - 1];
  }

  return (
    <Container id="doc-nav">
      <p id="doc-nav-info">
        {t("documentNavInfo", {
          currentFileNo: currentFileNo + 1,
          allFilesCount: documents.length,
        })}
      </p>

      <ButtonPrev
        id="doc-nav-prev"
        onClick={() => dispatch(previousDocument())}
        disabled={currentFileNo === 0}
      >
        <PrevDocIcon color="#fff" size="60%" />
      </ButtonPrev>

      <ButtonNext
        id="doc-nav-next"
        onClick={() => dispatch(nextDocument())}
        disabled={currentFileNo >= documents.length - 1}
      >
        <NextDocIcon color="#fff" size="60%" />
      </ButtonNext>
    </Container>
  );
};

const Container = styled.div`
  min-width: 150px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin: 0 10px;
  color: ${(props: IStyledProps) => props.theme.textPrimary};
`;

const ButtonPrev = styled(ButtonSecondary)`
  width: 30px;
  height: 30px;
  margin: 0 5px 0 10px;

  @media (max-width: 768px) {
    width: 25px;
    height: 25px;
  }
`;
const ButtonNext = styled(ButtonPrev)`
  margin: 0 5px;
`;
