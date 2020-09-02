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
