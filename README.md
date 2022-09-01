[![npm-version](https://img.shields.io/npm/v/@cyntler/react-doc-viewer.svg)](https://www.npmjs.com/package/@cyntler/react-doc-viewer)
[![npm-download](https://img.shields.io/npm/dt/@cyntler/react-doc-viewer.svg)](https://www.npmjs.com/package/@cyntler/react-doc-viewer)

# react-doc-viewer

File viewer for React.

> This is a fork of https://github.com/Alcumus/react-doc-viewer (inactivity for a long time)

## Supported file types

| Extension | MIME Type                                                                          |
| --------- | ---------------------------------------------------------------------------------- |
| bmp       | image/bmp                                                                          |
| csv       | text/csv                                                                           |
| doc       | application/msword                                                                 |
| docx      | application/vnd.openxmlformats-officedocument.wordprocessingml.document            |
| htm       | text/htm                                                                           |
| html      | text/html                                                                          |
| jpg       | image/jpg                                                                          |
| jpeg      | image/jpeg                                                                         |
| pdf       | application/pdf                                                                    |
| png       | image/png                                                                          |
| ppt       | application/vnd.ms-powerpoint                                                      |
| pptx      | applicatiapplication/vnd.openxmlformats-officedocument.presentationml.presentation |
| tiff      | image/tiff                                                                         |
| txt       | text/plain                                                                         |
| xls       | application/vnd.ms-excel                                                           |
| xlsx      | application/vnd.openxmlformats-officedocument.spreadsheetml.sheet                  |

## Installation

Use one of the package managers for Node.js.

```bash
 npm i @cyntler/react-doc-viewer
 # or
 yarn add @cyntler/react-doc-viewer
```

## Usage

> **Warning:** _By default the component height will expand and contract to the current loaded file. The width will expand to fill the parent._

### Basic

DocViewer requires at least an array of document objects to function.
Each document object must have a uri to a file, either a url that returns a file or a local file.

```tsx
import DocViewer from "react-doc-viewer";

function App() {
  const docs = [
    { uri: "https://url-to-my-pdf.pdf" },
    { uri: require("./example-files/pdf.pdf") }, // Local File
  ];

  return <DocViewer documents={docs} />;
}
```

### Initial Active Document

By default, the first item in your `documents` array will be displayed after the component is rendered. However, there is a prop `initialActiveDocument` that you can point to the initial document that should be displayed.

```tsx
import DocViewer from "react-doc-viewer";

function App() {
  const docs = [
    { uri: "https://url-to-my-pdf.pdf" },
    { uri: require("./example-files/pdf.pdf") }, // Local File
  ];

  return <DocViewer documents={docs} initialActiveDocument={docs[1]} />;
}
```

### Included Renderers

To use the included renderers.
`DocViewerRenderers` is an Array of all the included renderers.

```tsx
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";

<DocViewer
  pluginRenderers={DocViewerRenderers}
  {/* ... */}
/>;
```

Or you can import individual renderers.

```tsx
import DocViewer, { PDFRenderer, PNGRenderer } from "react-doc-viewer";

<DocViewer
  pluginRenderers={[PDFRenderer, PNGRenderer]}
  {/* ... */}
/>;
```

### Custom Renderer

To create a custom renderer, that will just exist for your project.

```tsx
import React from "react";
import DocViewer from "react-doc-viewer";

const MyCustomPNGRenderer: DocRenderer = ({
  mainState: { currentDocument },
}) => {
  if (!currentDocument) return null;

  return (
    <div id="my-png-renderer">
      <img id="png-img" src={currentDocument.fileData as string} />
    </div>
  );
};

MyCustomPNGRenderer.fileTypes = ["png", "image/png"];
MyCustomPNGRenderer.weight = 1;
```

And supply it to DocViewer > pluginRenderers inside an `Array`.

```tsx
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";

<DocViewer
  pluginRenderers={[MyCustomPNGRenderer]}
  documents={
    [
      // ...
    ]
  }
/>;
```

### Custom File Loader

If you need to prevent the actual loading of the file by `react-doc-viewer`.<br>
You can decorate your custom renderer with a callback to do as you wish. e.g. Load the file yourself in an iFrame.

```tsx
MyCustomPNGRenderer.fileLoader = ({
  documentURI,
  signal,
  fileLoaderComplete,
}) => {
  myCustomFileLoaderCode().then(() => {
    // Whenever you have finished you must call fileLoaderComplete() to remove the loading animation
    fileLoaderComplete();
  });
};
```

## Themed

You can provide a theme object with one or all of the available properties.

```xml
<DocViewer
  documents={docs}
  theme={{
    primary: "#5296d8",
    secondary: "#ffffff",
    tertiary: "#5296d899",
    textPrimary: "#ffffff",
    textSecondary: "#5296d8",
    textTertiary: "#00000099",
    disableThemeScrollbar: false,
  }}
/>
```

## Custom pre-fetch HTTP Verb

Some services (such as AWS) provide URLs that works only for one pre-configured verb.
By default, `react-doc-viewer` fetches document metadata through a `HEAD` request in order to guess its `Content-Type`.
If you need to have a specific verb for the pre-fetching, use the `prefetchMethod` option on the DocViewer:

```tsx
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";

<DocViewer prefetchMethod="GET" />;
```

## Custom Request Headers

Provide request headers, i.e. for authenticating with an API etc.

```tsx
const headers = {
  "X-Access-Token": "1234567890",
  "My-Custom-Header": "my-custom-value",
};

<DocViewer documents={docs} prefetchMethod="GET" requestHeaders={headers} />;
```

## Styling

Any styling applied to the `<DocViewer>` component, is directly applied to the main `div` container.

#### CSS Class

```xml
<DocViewer documents={docs} className="my-doc-viewer-style" />
```

#### CSS Class Default Override

Each component / div already has a DOM id that can be used to style any part of the document viewer.

```css
#react-doc-viewer #header-bar {
  background-color: #faf;
}
```

#### React Inline

```xml
<DocViewer documents={docs} style={{ width: 500, height: 500 }} />
```

#### Styled Components

```tsx
import styled from "styled-components";

// ...

<MyDocViewer documents={docs} />;

// ...

const MyDocViewer = styled(DocViewer)`
  border-radius: 10px;
`;
```

## Config

You can provide a config object, which configures parts of the component as required.

```tsx
<DocViewer
  documents={docs}
  config={{
    header: {
      disableHeader: false,
      disableFileName: false,
      retainURLParams: false,
    },
    csvDelimiter: ",", // "," as default,
    pdfZoom: {
      defaultZoom: 1.1, // 1 as default,
      zoomJump: 0.2, // 0.1 as default,
    },
  }}
/>
```

## Overriding Header Component

You can pass a callback function to `config.header.overrideComponent` that returns a React Element. The function's parameters will be populated and usable, this function will also be re-called whenever the mainState updates.
Parameters include the state object from the main component, and document navigation functions for `previousDocument` and `nextDocument`.

Example:

```tsx
const MyHeader: IHeaderOverride = (state, previousDocument, nextDocument) => {
  if (!state.currentDocument || state.config?.header?.disableFileName) {
    return null;
  }

  return (
    <>
      <div>{state.currentDocument.uri || ""}</div>
      <div>
        <button onClick={previousDocument} disabled={state.currentFileNo === 0}>
          Previous Document
        </button>
        <button
          onClick={nextDocument}
          disabled={state.currentFileNo >= state.documents.length - 1}
        >
          Next Document
        </button>
      </div>
    </>
  );
};

<DocViewer
  pluginRenderers={DocViewerRenderers}
  documents={
    {
      // ...
    }
  }
  config={{
    header: {
      overrideComponent: MyHeader,
    },
  }}
/>;
```

## Overriding Loading Renderer

You can pass a callback function to `config.loadingRenderer.overrideComponent` that returns a React Element.

Example:

```tsx
const MyLoadingRenderer = ({ document, fileName }) => {
  const fileText = fileName || document?.fileType || "";

  if (fileText) {
    return <div>Loading Renderer ({fileText})...</div>;
  }

  return <div>Loading Renderer...</div>;
};

<DocViewer
  pluginRenderers={DocViewerRenderers}
  documents={
    {
      // ...
    }
  }
  config={{
    loadingRenderer: {
      overrideComponent: MyLoadingRenderer,
    },
  }}
/>;
```

By default, the loading component is rendered if document loading process takes more than 500 ms.

You can change this time value or disable this feature to make the component display immediately:

```tsx
const MyLoadingRenderer = ({ document, fileName }) => {
  ...
};

<DocViewer
  pluginRenderers={DocViewerRenderers}
  documents={
    {
      // ...
    }
  }
  config={{
    loadingRenderer: {
      overrideComponent: MyLoadingRenderer,
      showLoadingTimeout: false, // false if you want to disable or number to provide your own value (ms)
    },
  }}
/>;
```

## Overriding No Renderer (Error)

You can pass a callback function to `config.noRenderer.overrideComponent` that returns a React Element.

Example:

```tsx
const MyNoRenderer = ({ document, fileName }) => {
  const fileText = fileName || document?.fileType || "";

  if (fileText) {
    return <div>No Renderer Error! ({fileText})</div>;
  }

  return <div>No Renderer Error!</div>;
};

<DocViewer
  pluginRenderers={DocViewerRenderers}
  documents={
    {
      // ...
    }
  }
  config={{
    noRenderer: {
      overrideComponent: MyNoRenderer,
    },
  }}
/>;
```
