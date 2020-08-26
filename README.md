# react-doc-viewer

# Contents

- [Installation](#installation)
  - [Core](#core)
  - [Included Renderers](#included-renderers)
- [Usage](#usage)
  - [Basic](#basic)
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

## Installation

### Core

```bash
 npm i react-doc-viewer
 # or
 yarn add react-doc-viewer
```

### Included Renderers

[npmjs.com/package/react-doc-viewer-plugins](https://www.npmjs.com/package/react-doc-viewer-plugins)

> If you want to only create your own custom file renderers you can skip this step.

Otherwise, install `react-doc-viewer-plugins` to use the included renderers.<br />
You will still be able to create custom file renderers.

```bash
 npm i react-doc-viewer-plugins
 # or
 yarn add react-doc-viewer-plugins
```

<br />
<br />

## Usage

> **Warning** - _By default the component height will expand and contract to the current loaded file. The width will expand to fill the parent._

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

Please visit the plugins package for instructions on contributing to document renderers.<br />
[npmjs.com/package/react-doc-viewer-plugins#contributing](https://www.npmjs.com/package/react-doc-viewer-plugins#contributing)

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
| priority  | `number`   |

---

<br />
<br />

## Setup Demo

```bash
npm i && npm run start
# or
yarn && yarn start
```
