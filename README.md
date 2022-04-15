# react-doc-viewer

File viewer for React.

## Supported file types

| Extension | MIME Type                                                                          |
| --------- | ---------------------------------------------------------------------------------- |
| bmp       | image/bmp                                                                          |
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
    text_primary: "#ffffff",
    text_secondary: "#5296d8",
    text_tertiary: "#00000099",
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
<DocViewer documents={docs} style={{width: 500, height: 500}} />
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
  }}
/>
```

## Overriding Header Component

You can pass a callback function to `config.header.overrideComponent` that returns a React Element. The function's parameters will be populated and usable, this function will also be re-called whenever the mainState updates.
Parameters include the state object from the main component, and document navigation functions for `previousDocument` and `nextDocument`.

Example:

```tsx
const myHeader: IHeaderOverride = (state, previousDocument, nextDocument) => {
    if (!state.currentDocument || state.config?.header?.disableFileName) {
      return null;
    }

    return (
      <>
        <div>{state.currentDocument.uri || ""}</div>
        <div>
          <button
            onClick={previousDocument}
            disabled={state.currentFileNo === 0}
          >
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
      overrideComponent: myHeader
    }
  }}
/>
```
