import React, { useEffect, useState } from "react";
import { CsvToHtmlTable } from "react-csv-to-table";
import styled from "styled-components";
import { DocRenderer } from "../..";
import { textFileLoader } from "../../utils/fileLoaders";

const HTMLRenderer: DocRenderer = ({
  mainState: { currentDocument, config },
}) => {
  const [data, setData] = useState("");

  useEffect(() => {
    if (currentDocument?.fileData) {
      setData(currentDocument.fileData as string);
    }
  }, [currentDocument]);

  if (!data) return null;
  return (
    <Container>
      <CsvToHtmlTable
        data={data}
        csvDelimiter={config?.csvDelimiter ?? ","}
        tableClassName="table"
      />
    </Container>
  );
};

export default HTMLRenderer;

HTMLRenderer.fileTypes = ["csv", "text/csv"];
HTMLRenderer.weight = 0;
HTMLRenderer.fileLoader = textFileLoader;

const Container = styled.div`
  width: 100%;

  .table {
    width: 100%;
    text-align: left;

    th,
    td {
      padding: 5px 10px;
    }
  }
`;
