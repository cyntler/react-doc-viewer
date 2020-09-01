import React, { FC, useContext } from "react";
import { PDFContext } from "../../state";
import PDFSinglePage from "./PDFSinglePage";

interface Props {
  pageNum?: number;
}

export const PDFAllPages: FC<Props> = (props) => {
  const {
    state: { numPages },
  } = useContext(PDFContext);

  const PagesArray = [];
  for (let i = 0; i < numPages; i++) {
    PagesArray.push(<PDFSinglePage key={i + 1} pageNum={i + 1} />);
  }

  return <>{PagesArray}</>;
};
