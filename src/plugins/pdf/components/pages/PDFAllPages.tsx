import React, { FC, useContext } from "react";
import { RenderContext } from "../../../../state";
import PDFSinglePage from "./PDFSinglePage";

export const PDFAllPages: FC<any> = ({ onRendered = () => { } }) => {
  const {
    state: { pagesCount },
  } = useContext(RenderContext);

  const pages = [];

  for (let i = 0; i < pagesCount; i++) {
    pages.push(<PDFSinglePage key={i + 1} pageNum={i + 1} onRendered={onRendered} />);
  }

  return <>{pages}</>;
};
