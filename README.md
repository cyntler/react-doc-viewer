# react-doc-viewer

# Contents

- [Current Renderable File Types](#current-renderable-file-types)
- [Installation](#installation)
- [Usage](#usage) <br />
  - [Basic](#basic)
  - [Themed](#themed)
  - [Styling](#styling)
    - [CSS Class](#css-class)
    - [React Inline](#react-inline)
    - [StyledComponent](#styledcomponent)
  - [Config](#config)
- [Contributing](#contributing)
  - [Creating a Renderer Plugin](#creating-a-renderer-plugin)
- [API](#api)
- [Setup Demo](#setup-demo)

<br />
<br />

## Current Renderable File Types

| MIME Type             | Available |
| --------------------- | --------- |
| application/pdf       | `✓`       |
| image/png             | `✓`       |
| image/jpg, image/jpeg | `✓`       |

<br />
<br />

## Installation

```bash
 npm i react-doc-viewer
 # or
 yarn add react-doc-viewer
```

<br />
<br />

## Usage

- **Warning** - _By default the component height will expand and contract to the current loaded file. The width will expand to fill the parent._

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

#### - React Inline

```xml
<DocViewer documents={docs} style={{width: 500, height: 500}} />
```

#### - StyledComponent

```tsx
import styled from "styled-components";
//...
<MyDocViewer documents={docs}/>
//...
const MyDocViewer = styled(DocViewer`
 border-radius: 10px;
`
```

### Config

You can provide a config object, which configures parts of the component as required.

```xml
<DocViewer documents={docs} config={{
 header: {
  disableHeader: false,
  disableFileName: false
 }
}} />
```

<br />
<br />

## Contributing

### Creating a Renderer Plugin

Create a new folder inside `src/plugins`.

> e.g. `src/plugins/jpg`

Inside this folder, create a Renderer React Typescript file.

> e.g. `JPGRenderer.tsx`

Inside JPGRenderer, export a functional component of type `DocRenderer`

```tsx
import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import DocViewerState from "../../state";
import { DocRenderer } from "../../types";
import linkRenderResponder from "../../utils/linkRenderResponder";

// Be sure that Renderer correctly uses type DocRenderer
const JPGRenderer: DocRenderer = () => {
  // Fetch the currentDocument loaded from main component state
  const currentDocument = useRecoilValue(DocViewerState.currentDocument);

  if (!currentDocument) return null;

  return (
    <Container id="jpg-renderer">
      <Img id="jpg-img" src={currentDocument.base64Data} />
    </Container>
  );
};

export default JPGRenderer;

// List the MIME types that this renderer will respond to
JPGRenderer.fileTypes = ["image/jpg", "image/jpeg"];

// If you have more than one renderer for the same MIME type, use priority. 1 is more preferable.
JPGRenderer.priority = 1;

// Add the renderer to an event listener for 'request-document-renderer' from "alcumus-local-events"
linkRenderResponder(JPGRenderer);
```

If you are creating a renderer for a new MIME type, also update the following files.

Update `src/plugins/index.ts` with a direct import to your new renderer file.
This ensures that the linked event listener is running from the start of component use.

```typescript
import "./jpg/JPGRenderer";
```

Update `src/types/index.ts` with your new MIME type.
This should match the array from JPGRenderer.filetypes.

```typescript
export type FileType =
  | "application/pdf"
  | "image/png"
  | "image/jpg"
  | "image/jpeg";
```

<br />
<br />

## API

---

### `DocViewer props`

| name       | type                        |
| ---------- | --------------------------- |
| documents  | [`IDocument[]`](#idocument) |
| className? | `string`                    |
| style?     | `React.CSSProperties`       |
| config?    | [`IConfig`](#iconfig)       |
| theme?     | [`ITheme`](#itheme)         |

---

### `IDocument`

| name        | type                                                               |
| ----------- | ------------------------------------------------------------------ |
| uri         | `string`                                                           |
| fileType?   | [`FileType`](#current-renderable-file-types) - **Used Internally** |
| base64Data? | `string` - **Used Internally**                                     |

---

### `IConfig`

| name    | type                              |
| ------- | --------------------------------- |
| header? | [`IHeaderConfig`](#iheaderconfig) |

---

### `IHeaderConfig`

| name             | type      |
| ---------------- | --------- |
| disableHeader?   | `boolean` |
| disableFileName? | `boolean` |

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

### `DocRenderer`

| name      | type                                           |
| --------- | ---------------------------------------------- |
| fileTypes | [`FileType[]`](#current-renderable-file-types) |
| priority  | `number`                                       |

---

<br />
<br />

## Setup Demo

`npm i && npm run start`
