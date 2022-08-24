var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React from "react";
import styled from "styled-components";
import { PresentationDrawer } from "./utils/presentation.util";
var Container = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  overflow: auto;\n  width: 100%;\n  gap: 10px;\n\n  canvas {\n    border-radius: 2px;\n  }\n"], ["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  overflow: auto;\n  width: 100%;\n  gap: 10px;\n\n  canvas {\n    border-radius: 2px;\n  }\n"])));
export default function PPTXRender(_a) {
    var presentation = _a.presentation, onRendered = _a.onRendered;
    React.useEffect(function () {
        if (!presentation)
            return;
        var drawer = new PresentationDrawer(presentation);
        var loadedSlides = 0;
        presentation.slides.forEach(function (slide, index) {
            var canvas = document.getElementById("pptx-canvas-slide#" + (index + 1));
            if (!canvas)
                return;
            canvas.width = presentation.size.width;
            canvas.height = presentation.size.height;
            drawer.drawSlide(canvas, index).then(function () {
                loadedSlides += 1;
                if (loadedSlides === presentation.slides.length) {
                    var canvasElements = Array.from(document.querySelectorAll(".canvas"));
                    var slides = canvasElements.map(function (a, index) { return ({
                        name: "Slide",
                        index: index,
                        loaded: true,
                        imageURL: a.toDataURL(),
                    }); });
                    onRendered(slides);
                }
            });
        });
    }, [presentation]);
    return (React.createElement(Container, { id: "pptx-container" }, presentation &&
        presentation.slides.map(function (item, index) { return (React.createElement("canvas", { key: ~~(Math.random() * 0xff), className: "canvas", id: "pptx-canvas-slide#" + (index + 1) })); })));
}
var templateObject_1;
