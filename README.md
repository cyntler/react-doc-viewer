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
// Don't forget to import included renderers / custom renderers
import "react-doc-viewer-plugins";

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
  documents={
    [
      // ...
    ]
  }
/>;
```

<br />
<br />

### Custom Renderer

To create a custom renderer, that will just exist for your project.
Follow Step 2 under [Contributing](#contributing)

And supply it to DocViewer > pluginRenderers inside an `Array`.

```tsx
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";

<DocViewer
  pluginRenderers={[MyCustomRenderer]}
  documents={
    [
      // ...
    ]
  }
/>;
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

**Step 1** - Create a new folder inside `src/plugins`.

> e.g. `src/plugins/jpg`

Inside this folder, create a Renderer React Typescript file.

> e.g. `index.tsx`

**Step 2** - Inside JPGRenderer, export a functional component of type `DocRenderer`

```tsx
import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { DocViewerState } from "../../state";
import { DocRenderer } from "../../types";

// Be sure that Renderer correctly uses type DocRenderer
const JPGRenderer: DocRenderer = () => {
  // Fetch the currentDocument loaded from main state
  const currentDocument = useRecoilValue(DocViewerState.currentDocument);

  if (!currentDocument) return null;

  return (
    <div id="jpg-renderer">
      <img id="jpg-img" src={currentDocument.base64Data} />
    </div>
  );
};

export default JPGRenderer;

// List the MIME types that this renderer will respond to
JPGRenderer.fileTypes = ["image/jpg", "image/jpeg"];

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

| name        | type                                                          |
| ----------- | ------------------------------------------------------------- |
| uri         | `string`                                                      |
| fileType?   | `string` - **Used Internally - Ignored if passed into props** |
| base64Data? | `string` - **Used Internally - Ignored if passed into props** |

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

| name      | type       |
| --------- | ---------- |
| fileTypes | `string[]` |
| weight    | `number`   |

---
