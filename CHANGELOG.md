#### 0.1.5 (2020-10-29)

##### Bug Fixes

* **TIFFRenderer file Corrupt:**  Don't crash if parseTIFF fails because of corrupted file. ([30755e57](https://github.com/Alcumus/react-doc-viewer/commit/30755e57ec0bef8a665ce1c6f9e8f93c4ada55dc))

#### 0.1.4 (2020-10-29)

##### Bug Fixes

* **TIFFRenderer crash:**  If parseTiff is supplied with an undefined tiffArrayBuffer. Return out. ([eedeac1e](https://github.com/Alcumus/react-doc-viewer/commit/eedeac1e0deada4126e77058d5c52b1ed92f200f))

#### 0.1.3 (2020-10-29)

##### New Features

* **TIF:**  Added .tif as an option to render within TIFFRenderer. ([a32f9b0f](https://github.com/Alcumus/react-doc-viewer/commit/a32f9b0ffff1a0a37d14a6dd948e1d0f52ffe6c6))

##### Other Changes

* fix/pptx ([60c27812](https://github.com/Alcumus/react-doc-viewer/commit/60c27812f658d4edf4a7cc1673c26a95b838eca1))

#### 0.1.2 (2020-10-26)

##### Bug Fixes

*  Added github url to npm package ([b713957f](https://github.com/Alcumus/react-doc-viewer/commit/b713957fef42e896ab45d99a3127a59e98a11e60))

#### 0.1.1 (2020-10-26)

##### New Features

* **FileName Header:**
  *  decodeURI when rendering fileName in header title (79c0da83)
  *  When rendering fileName in header, remove url params unless requested to keep (109da8d7)

#### 0.0.43 (2020-09-30)

##### New Features

* **Combine File Loaders:**  File Loaders duplicate code combined, also base64 and arrayBuffer combined into fileData (#47) (f3fd9952)

#### 0.0.42 (2020-09-30)

##### Documentation Changes

*  README - styled component example is missing a closing bracket after DocViewer Fixes #31 (da0a40ee)

##### New Features

*  BMP Image renderer added (2e8578b1)
*  Internal ImageProxyRenderer created, that can be used by all other Image renderers, and styled by them (dc2afb71)

##### Other Changes

* Alcumus/react-doc-viewer into develop (2184d46c)
* mattmogford-alcumus/40_Create-HTMLRenderer (9eff64e2)

#### 0.0.41 (2020-09-25)

#### 0.0.40 (2020-09-24)

##### Documentation Changes

*  README - styled component example is missing a closing bracket after DocViewer Fixes #31 (7964c0b9)

##### New Features

*  BMP Image renderer added (2cb03e4c)
*  Internal ImageProxyRenderer created, that can be used by all other Image renderers, and styled by them (90e575da)

#### 0.0.39 (2020-09-23)

##### Documentation Changes

*  README updated (819acb5b)

#### 0.0.38 (2020-09-23)

##### New Features

*  Added renderer for .msg file extension (b4cf7bf4)
*  useDocumentLoader hook now allows use of custom fileLoaders. e.g. bse64, ArrayBuffer (ebc9a454)

#### 0.0.37 (2020-09-18)

##### Other Changes

* mattmogford-alcumus/issue29 (35ea44eb)

#### 0.0.36 (2020-09-17)

#### 0.0.35 (2020-09-17)

#### 0.0.34 (2020-09-16)

##### Bug Fixes

*  Document fetches header even if file type is supplied (b5296d0f)

#### 0.0.33 (2020-09-16)

##### Other Changes

* develop (66cd5676)
* mattmogford-alcumus/issue19 (f8f16bc1)

#### 0.0.32 (2020-09-03)

##### Chores

*  Added default height to loading container (e5570741)

##### New Features

*  pluginRenderers are now passed directly to the main state context, and the correct renderer is retrieved from there depending on it's fileType associations (4c7abfd3)

##### Bug Fixes

*  Changed Button to actual <button> from <a> to prevent annoying text selection bug (25dc93eb)
*  Abort fetch of file when new file is selected mid fetch. Also display loading spinner (db440e66)

##### Tests

*  Updated test snapshot (7660907f)

#### 0.0.31 (2020-09-02)

##### Chores

*  Removed unused css file (485f15b3)

##### New Features

*  Removed FontAwesome and included replacement svgs, which are resizable and colourable (7c7c3fca)

##### Bug Fixes

*  IIconProps import type fixed (1e1b00c5)

##### Tests

*  Updated snapshots for tests (f40a5447)

#### 0.0.30 (2020-09-02)

##### New Features

*  implemented ability to fully replace the contents of the header, but also retain access to the state and document navigation actions (2c1e3d0d)

#### 0.0.29 (2020-09-01)

##### Chores

*  No longer require public folder (2a639dcc)

#### 0.0.28 (2020-09-01)

##### Bug Fixes

*  Removed necessity for 2 context calls (1e9886ca)

#### 0.0.27 (2020-09-01)

##### Documentation Changes

*  Removed Setup Demo from contents at top of README (8a8db314)

#### 0.0.26 (2020-09-01)

##### Bug Fixes

*  Pass mainState context to CurrentRenderer for ease of use/access to loaded data, and other mainState props (98efa91c)

#### 0.0.25 (2020-09-01)

##### Chores

*  Renamed MainContext to DocViewerContext for external plugins to import it with a less generic name (c433d438)

##### Documentation Changes

*  Added README info for importing and using the included individual renderers (3a87cf87)

##### Refactors

*  Reverting from Recoil to react state, context and reducers (ff26a49b)

#### 0.0.24 (2020-08-28)

#### 0.0.23 (2020-08-28)

#### 0.0.22 (2020-08-28)

##### New Features

* **Merge Default Plugins:**  Plugins have been pulled back into the component package, Updated README to inform on updated and better way to use included and custom plugins (34bed0c7)

##### Bug Fixes

*  If user passes in a bad file / url and uri ends up not being useful, (ae99034f)

#### 0.0.21 (2020-08-27)

##### Chores

*  Removed old pdf plugin dependencies (3baa9355)

#### 0.0.20 (2020-08-27)

#### 0.0.19 (2020-08-26)

##### Documentation Changes

*  README updated (39fd2b93)

##### Bug Fixes

*  FileType removed, as the component needs to be ambiguous to plugin renderers (fcf9e1c0)

#### 0.0.18 (2020-08-26)

#### 0.0.17 (2020-08-25)

#### 0.0.16 (2020-08-25)

#### 0.0.15 (2020-08-25)

#### 0.0.14 (2020-08-25)

#### 0.0.13 (2020-08-25)

#### 0.0.12 (2020-08-25)

##### Chores

*  Tidied state atoms etc. (fbb5ede2)

##### Bug Fixes

* **PDFRenderer Reset Zoom Broken:**  resetZoomLevel function wasn't being called (4b3b9918)

#### 0.0.12 (2020-08-25)

##### Bug Fixes

* **PDFRenderer Reset Zoom Broken:**  resetZoomLevel function wasn't being called (4b3b9918)

#### 0.0.11 (2020-08-25)

##### Bug Fixes

*  sever was incorrect for build-release options (2ebe713b)

##### Tests

*  Added example png for testing purposes (9c3c6cf6)

#### 0.0.10 (2020-08-24)

#### 0.0.9 (2020-08-24)

#### 0.0.8 (2020-08-24)

##### Bug Fixes

*  ignore index on building package, point main and types to main component file DocViewer.tsx (96f1a12f)

#### 0.0.4 (2020-08-24)

##### New Features

* **Versioning:**  Added scripts for auto update CHANGELOG with versioning (31c31d1c)

##### Bug Fixes

*  config is optional and so could be undefined (596d611d)

#### 0.0.3 (2020-08-24)

##### New Features

- **Versioning:** Added scripts for auto update CHANGELOG with versioning (48536a0c)

##### Bug Fixes

- config is optional and so could be undefined (596d611d)

#### 0.0.3 (2020-08-24)

##### Bug Fixes

- config is optional and so could be undefined (596d611d)
