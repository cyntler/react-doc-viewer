"use client";
import DocViewer, { IDocument } from "../../../../";

import gifFile from "../../../../src/exampleFiles/gif-image.gif";
import pngFile from "../../../../src/exampleFiles/png-image.png";

const documents: IDocument[] = [{ uri: gifFile.src }, { uri: pngFile.src }];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <DocViewer documents={documents} />
    </main>
  );
}
