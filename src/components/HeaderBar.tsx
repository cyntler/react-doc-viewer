import React, { FC, useContext } from "react";
import styled from "styled-components";
import { DocViewerContext } from "../state";
import { IStyledProps } from "../types";
import { DocumentNav } from "./DocumentNav";
import { FileName } from "./FileName";

export const HeaderBar: FC<{}> = () => {
  const {
    state: { config },
  } = useContext(DocViewerContext);

  if (config?.header?.disableHeader) return null;

  return (
    <Container id="header-bar" data-testid="header-bar">
      <FileName />
      <DocumentNav />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  z-index: 1;
  padding: 0 10px;
  background-color: ${(props: IStyledProps) => props.theme.primary};
  font-size: 16px;
  min-height: 50px;

  @media (max-width: 768px) {
    min-height: 30px;
    padding: 5px;
    font-size: 10px;
  }
`;
