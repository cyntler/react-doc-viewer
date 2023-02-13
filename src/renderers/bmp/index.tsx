import React from "react";
import { DocRenderer } from "../..";
import ImageProxyRenderer from "../image";

const BMPRenderer: DocRenderer = (props) => <ImageProxyRenderer {...props} />;
BMPRenderer.fileTypes = ["bmp", "image/bmp"];
BMPRenderer.weight = 0;

export default BMPRenderer;
