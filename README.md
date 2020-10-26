# react-doc-viewer

# Contents

- [Current Renderable File Types](#current-renderable-file-types)
- [Installation](#installation)
  - [Core](#core)
- [Usage](#usage)
  - [Basic](#basic)
  - [Included Renderers](#included-renderers)
  - [Custom Renderer](#custom-renderer)
  - [Themed](#themed)
  - [Styling](#styling)
    - [CSS Class](#css-class)
    - [CSS Class Default Override](#css-class-default-override)
    - [React Inline](#react-inline)
    - [StyledComponent](#styledcomponent)
  - [Config](#config)
- [Contributing](#contributing)
  - [Creating a Renderer Plugin](#creating-a-renderer-plugin)
- [Overriding Header Component](#overriding-header-component)
- [API](#api)

<br />
<br />

## Current Renderable File Types

| Extension | MIME Type                                                                          | Available |
| --------- | ---------------------------------------------------------------------------------- | --------- |
| bmp       | image/bmp                                                                          | `✓`       |
| doc       | application/msword                                                                 | `✓`       |
| docx      | application/vnd.openxmlformats-officedocument.wordprocessingml.document            | `✓`       |
| htm       | text/htm                                                                           | `✓`       |
| html      | text/html                                                                          | `✓`       |
| jpg       | image/jpg                                                                          | `✓`       |
| jpeg      | image/jpeg                                                                         | `✓`       |
| pdf       | application/pdf                                                                    | `✓`       |
| png       | image/png                                                                          | `✓`       |
| ppt       | application/vnd.ms-powerpoint                                                      | `✓`       |
| pptx      | applicatiapplication/vnd.openxmlformats-officedocument.presentationml.presentation | `✓`       |
| tiff      | image/tiff                                                                         | `✓`       |
| txt       | text/plain                                                                         | `✓`       |
| xls       | application/vnd.ms-excel                                                           | `✓`       |
| xlsx      | application/vnd.openxmlformats-officedocument.spreadsheetml.sheet                  | `✓`       |

<br />
<br />

## Installation

### Core

```bash
 npm i react-doc-viewer
 # or
 yarn add react-doc-viewer
```

## Usage

> **Warning** - _By default the component height will expand and contract to the current loaded file. The width will expand to fill the parent._

<br />
<br />

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

<br />
<br />

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

<br />
<br />

### Custom File Loader

If you need to prevent the actual loading of the file by `react-doc-viewer`.
you can decorate your custom renderer with a callback to do as you wish. e.g. Load the file yourself in an iFrame.

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

<br />
<br />

### Themed

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

### Styling

Any styling applied to the `<DocViewer>` component, is directly applied to the main `div` container.

#### - CSS Class

```xml
<DocViewer documents={docs} className="my-doc-viewer-style" />
```

#### - CSS Class Default Override

Each component / div already has a DOM id that can be used to style any part of the document viewer.

```css
#react-doc-viewer #header-bar {
  background-color: #faf;
}
```

#### - React Inline

```xml
<DocViewer documents={docs} style={{width: 500, height: 500}} />
```

#### - StyledComponent

```tsx
import styled from "styled-components";
//...
<MyDocViewer documents={docs} />;
//...
const MyDocViewer = styled(DocViewer)`
  border-radius: 10px;
`;
```

### Config

You can provide a config object, which configures parts of the component as required.

```xml
<DocViewer documents={docs} config={{
 header: {
  disableHeader: false,
  disableFileName: false,
  retainURLParams: false
 }
}} />
```

<br />
<br />

## Contributing

### Creating a Renderer Plugin

**Step 1** - Create a new folder inside `src/plugins`.

> e.g. `src/plugins/jpg`

Inside this folder, create a Renderer React Typescript file.

> e.g. `index.tsx`

**Step 2** - Inside JPGRenderer, export a functional component of type `DocRenderer`

```tsx
import React from "react";
import { DocRenderer } from "../../types";

// Be sure that Renderer correctly uses type DocRenderer
const JPGRenderer: DocRenderer = ({ mainState: { currentDocument } }) => {
  if (!currentDocument) return null;

  return (
    <div id="jpg-renderer">
      <img id="jpg-img" src={currentDocument.fileData as string} />
    </div>
  );
};

export default JPGRenderer;

// List the MIME types that this renderer will respond to
JPGRenderer.fileTypes = ["jpg", "jpeg", "image/jpg", "image/jpeg"];

// If you have more than one renderer for the same MIME type, use weight. higher is more preferable.
// Included renderers have a weight of zero
JPGRenderer.weight = 1;
```

<br />

If you are creating a new renderer, also update `src/plugins/index.ts` with an import to your new renderer file, and Export it as part of the DocViewerRenderers `Array`.

```typescript
// ...
import JPGRenderer from "./jpg";

export const DocViewerRenderers = [
  // ...
  JPGRenderer,
];
```

<br />
<br />

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

<DocViewer
  pluginRenderers={DocViewerRenderers}
  documents={
    {
      /**/
    }
  }
  config={{
    header: {
      overrideComponent: myHeader;
      },
    },
  }
/>
```

## API

---

### `DocViewer props`

| name             | type                            |
| ---------------- | ------------------------------- |
| documents        | [`IDocument[]`](#idocument)     |
| className?       | `string`                        |
| style?           | `React.CSSProperties`           |
| config?          | [`IConfig`](#iconfig)           |
| theme?           | [`ITheme`](#itheme)             |
| pluginRenderers? | [`DocRenderer[]`](#docrenderer) |

---

### `IDocument`

| name      | type     |
| --------- | -------- |
| uri       | `string` |
| fileType? | `string` |
| fileData? | `string  | ArrayBuffer` - **Used Internally - Ignored if passed into props** |

---

### `IConfig`

| name    | type                              |
| ------- | --------------------------------- |
| header? | [`IHeaderConfig`](#iheaderconfig) |

---

### `IHeaderConfig`

| name               | type                                  |
| ------------------ | ------------------------------------- |
| disableHeader?     | `boolean`                             |
| disableFileName?   | `boolean`                             |
| retainURLParams?   | `boolean`                             |
| overrideComponent? | [`IHeaderOverride`](#iheaderoverride) |

---

### `IHeaderOverride` () => `ReactElement<any, any> | null`

| name             | type                        |
| ---------------- | --------------------------- |
| state            | [`IMainState`](#imainstate) |
| previousDocument | `() => void`                |
| nextDocument     | `() => void`                |
| `returns`        | `ReactElement<any, any>     | null` |

---

### `ITheme`

| name                   | type      |
| ---------------------- | --------- |
| primary?               | `string`  |
| secondary?             | `string`  |
| tertiary?              | `string`  |
| text_primary?          | `string`  |
| text_secondary?        | `string`  |
| text_tertiary?         | `string`  |
| disableThemeScrollbar? | `boolean` |

---

### `DocRenderer` extends React.FC\<[`DocRendererProps`](#docrendererprops)\>

| name        | type                                          |
| ----------- | --------------------------------------------- |
| fileTypes   | `string[]`                                    |
| weight      | `number`                                      |
| fileLoader? | [`FileLoaderFunction`](#fileloaderfunction) ` | null | undefined` |

---

### `FileLoaderFunction`

(props: [`FileLoaderFuncProps`](#fileloaderfuncprops)) => void

---

### `FileLoaderFuncProps`

| name               | type                                        |
| ------------------ | ------------------------------------------- |
| documentURI        | `string`                                    |
| signal             | `AbortSignal`                               |
| fileLoaderComplete | [`FileLoaderComplete`](#fileloadercomplete) |

---

### `FileLoaderComplete`

| name       | type         |
| ---------- | ------------ |
| fileReader | `FileReader` |

---

### `DocRendererProps`

| name      | type                        |
| --------- | --------------------------- |
| mainState | [`IMainState`](#imainstate) |

---

### `IMainState`

| name             | type                        |
| ---------------- | --------------------------- |
| currentFileNo    | number                      |
| documents        | [`IDocument[]`](#idocument) |
| documentLoading? | boolean                     |
| currentDocument? | [`IDocument`](#idocument)   |
| rendererRect?    | DOMRect                     |
| config?          | [`IConfig`](#iconfig)       |

---
