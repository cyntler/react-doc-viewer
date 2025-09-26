[![npm-version](https://img.shields.io/npm/v/@cyntler/react-doc-viewer.svg)](https://www.npmjs.com/package/@cyntler/react-doc-viewer)
[![npm-download](https://img.shields.io/npm/dt/@cyntler/react-doc-viewer.svg)](https://www.npmjs.com/package/@cyntler/react-doc-viewer)

## I am stopping work on this library

> [!WARNING]
**Due to lack of free time to develop this library, I am stopping work on this library.<br>
> It will not be developed in the near future.**

# @cyntler/react-doc-viewer

File viewer for **React v17+**.

> This project is a fork of [cyntler/react-doc-viewer](https://github.com/cyntler/react-doc-viewer).  
> Unlike the original, this fork adds support for custom PDF controls.

## Important note!

> [!IMPORTANT]
> This library uses the official MS Office online document viewing service. This means it works on an iframe basis and only supports public file URLs! Therefore, it may not be compatible with all projects. Currently, there is no way to natively render MS Office documents in the browser.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [Supported file types](#supported-file-types)
- [Storybook Demo](#storybook-demo)
- [Installation](#installation)
- [Usage](#usage)
  - [Required styles](#required-styles)
  - [Basic](#basic)
  - [Initial Active Document](#initial-active-document)
  - [Control over the displayed document](#control-over-the-displayed-document)
  - [Displaying blob/uploaded documents](#displaying-blobuploaded-documents)
  - [Included Renderers](#included-renderers)
  - [Custom Renderer](#custom-renderer)
  - [Custom File Loader](#custom-file-loader)
- [Theme](#theme)
- [Custom pre-fetch HTTP Verb](#custom-pre-fetch-http-verb)
- [Custom Request Headers](#custom-request-headers)
- [Internationalization (i18n)](#internationalization-i18n)
- [Styling](#styling)
  - [CSS Class](#css-class)
  - [CSS Class Default Override](#css-class-default-override)
  - [React Inline](#react-inline)
  - [Styled Components](#styled-components)
- [Using DocViewerRef](#using-docviewerref)
- [Config](#config)
  - [Overriding Header Component](#overriding-header-component)
  - [Overriding Loading Renderer](#overriding-loading-renderer)
  - [Overriding No Renderer (Error)](#overriding-no-renderer-error)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Supported file types

| Extension | MIME Type                                                                 | Comments |
| --------- | ------------------------------------------------------------------------- | ------------- |
| bmp       | image/bmp                                                                 | |
| csv       | text/csv                                                                  | |
| odt       | application/vnd.oasis.opendocument.text                                   | |
| doc       | application/msword                                                        | Public URLs only! |
| docx      | application/vnd.openxmlformats-officedocument.wordprocessingml.document   | Public URLs only! |
| gif       | image/gif                                                                 | |
| htm       | text/htm                                                                  | |
| html      | text/html                                                                 | |
| jpg       | image/jpg                                                                 | |
| jpeg      | image/jpeg                                                                | |
| pdf       | application/pdf                                                           | |
| png       | image/png                                                                 | |
| ppt       | application/vnd.ms-powerpoint                                             | Public URLs only! |
| pptx      | application/vnd.openxmlformats-officedocument.presentationml.presentation | Public URLs only! |
| tiff      | image/tiff                                                                | |
| txt       | text/plain                                                                | |
| xls       | application/vnd.ms-excel                                                  | Public URLs only! |
| xlsx      | application/vnd.openxmlformats-officedocument.spreadsheetml.sheet         | Public URLs only! |
| mp4       | video/mp4                                                                 | |
| webp      | image/webp                                                                | |

## Storybook Demo

https://cyntler.github.io/react-doc-viewer

## Installation

Use one of the package managers for Node.js.

```bash
 npm i @cyntler/react-doc-viewer
 # or
 yarn add @cyntler/react-doc-viewer
```

## Usage

> **Warning:** _By default the component height will expand and contract to the current loaded file. The width will expand to fill the parent._

### Required styles

The library exports a CSS file containing classes needed for correct rendering of e.g. PDF files. It is best to include it at the beginning of the application or in the place where you use this library.

```tsx
import "@cyntler/react-doc-viewer/dist/index.css";
```

### Basic

DocViewer requires at least an array of document objects to function.
Each document object must have a uri to a file, either a url that returns a file or a local file.

```tsx
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";

function App() {
  const docs = [
    { uri: "https://url-to-my-pdf.pdf" }, // Remote file
    { uri: require("./example-files/pdf.pdf") }, // Local File
  ];

  return <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />;
}
```

### Initial Active Document

By default, the first item in your `documents` array will be displayed after the component is rendered. However, there is a prop `initialActiveDocument` that you can point to the initial document that should be displayed.

```tsx
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";

const App = () => {
  const docs = [
    { uri: "https://url-to-my-pdf.pdf" }, // Remote file
    { uri: require("./example-files/pdf.pdf") }, // Local File
  ];

  return (
    <DocViewer
      documents={docs}
      initialActiveDocument={docs[1]}
      pluginRenderers={DocViewerRenderers}
    />
  );
};
```

### Control over the displayed document

From version **1.11.0** you can control the displayed document through two props: `activeDocument` and `onDocumentChange`.

```jsx
const DocViewerControlOverDisplayedDocument = () => {
  const docs = [
    { uri: "https://url-to-my-pdf.pdf" }, // Remote file
    { uri: require("./example-files/pdf.pdf") }, // Local File
  ];
  const [activeDocument, setActiveDocument] = useState(docs[0]);

  const handleDocumentChange = (document) => {
    setActiveDocument(document);
  };

  return (
    <>
      <DocViewer
        documents={docs}
        activeDocument={activeDocument}
        onDocumentChange={handleDocumentChange}
      />
    </>
  );
};
```

### Displaying blob/uploaded documents

Since **v1.6.2** you can use documents in the form of blobs, which allows you to e.g. display uploaded files.

```jsx
const DocViewerWithInputApp = () => {
  const [selectedDocs, setSelectedDocs] = useState<File[]>([]);

  return (
    <>
      <input
        type="file"
        accept=".pdf"
        multiple
        onChange={(el) =>
          el.target.files?.length &&
          setSelectedDocs(Array.from(el.target.files))
        }
      />
      <DocViewer
        documents={selectedDocs.map((file) => ({
          uri: window.URL.createObjectURL(file),
          fileName: file.name,
        }))}
        pluginRenderers={DocViewerRenderers}
      />
    </>
  );
};
```

### Included Renderers

To use the included renderers.
`DocViewerRenderers` is an Array of all the included renderers.

```tsx
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";

<DocViewer
  pluginRenderers={DocViewerRenderers}
  {/* ... */}
/>;
```

Or you can import individual renderers.

```tsx
import DocViewer, { PDFRenderer, PNGRenderer } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";

<DocViewer
  pluginRenderers={[PDFRenderer, PNGRenderer]}
  {/* ... */}
/>;
```

### Custom Renderer

To create a custom renderer, that will just exist for your project.

```tsx
import React from "react";
import DocViewer from "@cyntler/react-doc-viewer";

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

And supply it to `pluginRenderers` inside an `Array`.

```tsx
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";

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

If you need to prevent the actual loading of the file by `@cyntler/react-doc-viewer`.<br>
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

## Theme

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
By default, `@cyntler/react-doc-viewer` fetches document metadata through a `HEAD` request in order to guess its `Content-Type`.
If you need to have a specific verb for the pre-fetching, use the `prefetchMethod` option on the DocViewer:

```tsx
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

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

## Internationalization (i18n)

From **v1.6.0** you can pass the `language` prop to the `DocViewer` component to get translated sentences and words that can be displayed by this library.

```xml
<DocViewer documents={docs} language="pl" />
```

The translations are based on the `.json` files that can be found in the `src/locales` directory.

## Styling

Any styling applied to the `<DocViewer>` component, is directly applied to the main `div` container.

### CSS Class

```xml
<DocViewer documents={docs} className="my-doc-viewer-style" />
```

### CSS Class Default Override

Each component / div already has a DOM id that can be used to style any part of the document viewer.

```css
#react-doc-viewer #header-bar {
  background-color: #faf;
}
```

### React Inline

```xml
<DocViewer documents={docs} style={{ width: 500, height: 500 }} />
```

### Styled Components

```tsx
import styled from "styled-components";

// ...

<MyDocViewer documents={docs} />;

// ...

const MyDocViewer = styled(DocViewer)`
  border-radius: 10px;
`;
```

## Using DocViewerRef

Since **v1.13.0** you can control the display of the document with `reference`.

```tsx
import DocViewer, { DocViewerRef } from "@cyntler/react-doc-viewer";

export const UsingRef = () => {
  const docViewerRef = useRef<DocViewerRef>(null);

  return (
    <>
      <div>
        <button onClick={() => docViewerRef?.current?.prev()}>
          Prev Document By Ref
        </button>
        <button onClick={() => docViewerRef?.current?.next()}>
          Next Document By Ref
        </button>
      </div>
      <DocViewer
        ref={docViewerRef}
        documents={docs}
        config={{ header: { disableHeader: true } }}
      />
    </>
  );
};
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
    pdfVerticalScrollByDefault: true, // false as default
  }}
/>
```

### Overriding Header Component

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

### Overriding Loading Renderer

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
### Overriding PDF Controls

You can override the default PDF controls by passing a callback function to `config.pdfControls.overrideComponent`. This function receives several parameters: the current PDF state, the pdfControls config, and handler functions for zooming in, zooming out, resetting zoom, and toggling pagination. Your function should return a React element to render custom controls.

Example:

```tsx
const MyPDFControls = (
  pdfState,
  pdfControlsConfig,
  pdfZoomOut,
  pdfZoomIn,
  pdfZoomReset,
  pdfTogglePaginated
) => {
  // Example: Only show a custom zoom in/out
  return (
    <div>
      <button onClick={pdfZoomOut}>-</button>
      <span>{pdfState.zoomLevel.toFixed(2)}</span>
      <button onClick={pdfZoomIn}>+</button>
      <button onClick={pdfZoomReset} disabled={pdfState.zoomLevel === pdfState.defaultZoomLevel}>
        Reset
      </button>
      <button onClick={pdfTogglePaginated}>
        {pdfState.paginated ? "Single Page" : "Paginated"}
      </button>
    </div>
  );
};

<DocViewer
  pluginRenderers={DocViewerRenderers}
  documents={docs}
  config={{
    pdfControls: {
      overrideComponent: MyPDFControls,
    },
  }}
/>
```

The parameters provided to your override function are:

- `pdfState`: The current PDF renderer state (e.g., `zoomLevel`, `paginated`, `numPages`, etc.)
- `pdfControlsConfig`: The current pdfControls config object.
- `pdfZoomOut`: Function to decrease zoom.
- `pdfZoomIn`: Function to increase zoom.
- `pdfZoomReset`: Function to reset zoom to default.
- `pdfTogglePaginated`: Function to toggle between paginated and continuous scroll.

If your override returns a React element, it will replace the default PDF controls UI.

### Overriding No Renderer (Error)

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
