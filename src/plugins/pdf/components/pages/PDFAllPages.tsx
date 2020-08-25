import React, { FC } from "react";
import { useRecoilValue } from "recoil";
import PDFRendererState from "../../state";
import PDFSinglePage from "./PDFSinglePage";

interface Props {
  pageNum?: number;
}

export const PDFAllPages: FC<Props> = (props) => {
  const numPages = useRecoilValue(PDFRendererState.numPages);

  const PagesArray = [];
  for (let i = 0; i < numPages; i++) {
    PagesArray.push(<PDFSinglePage key={i + 1} pageNum={i + 1} />);
  }

  return <>{PagesArray}</>;
};
