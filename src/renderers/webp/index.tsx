import React from "react";
import { DocRenderer } from "../..";
import ImageProxyRenderer from "../image";

const WebPRenderer: DocRenderer = (props) => <ImageProxyRenderer {...props} />;

WebPRenderer.fileTypes = ["webp", "image/webp"];
WebPRenderer.weight = 0;

export default WebPRenderer;
