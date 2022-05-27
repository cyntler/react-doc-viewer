import React, { FC, useContext } from "react";
import { RenderContext } from "../../../../state";
import PDFSinglePage from "./PDFSinglePage";

export const PDFAllPages: FC<any> = () => {
  const {
    state: { pagesCount },
  } = useContext(RenderContext);

  const PagesArray = [];
  for (let i = 0; i < pagesCount; i++) {
    PagesArray.push(<PDFSinglePage key={i + 1} pageNum={i + 1} />);
  }

  return <>{PagesArray}</>;
};
