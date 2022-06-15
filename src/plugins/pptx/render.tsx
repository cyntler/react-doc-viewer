import React from "react";
import styled from "styled-components";
import { PresentationDrawer } from "./utils/presentation.util";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  width: 100%;
  gap: 10px;

  canvas {
    border-radius: 2px;
  }
`;

export default function PPTXRender({ presentation, onRendered }: any) {
  React.useEffect(() => {
    if (!presentation) return;

    const drawer = new PresentationDrawer(presentation);

    let loadedSlides = 0;
    presentation.slides.forEach((slide: any, index: number) => {
      const canvas = document.getElementById(
        `pptx-canvas-slide#${index + 1}`
      ) as HTMLCanvasElement;
      if (!canvas) return;
      canvas.width = presentation.size.width;
      canvas.height = presentation.size.height;
      drawer.drawSlide(canvas, index).then(() => {
        loadedSlides += 1;
        if (loadedSlides === presentation.slides.length) {
          const canvasElements = Array.from(
            document.querySelectorAll(".canvas")
          );
          const slides = canvasElements.map((a: any, index) => ({
            name: "Slide",
            index,
            imageURL: a.toDataURL(),
          }));

          onRendered(slides);
        }
      });
    });
  }, [presentation]);

  return (
    <Container id="pptx-container">
      {presentation &&
        presentation.slides.map((item: any, index: number) => (
          <canvas
            key={~~(Math.random() * 0xff)}
            className="canvas"
            id={`pptx-canvas-slide#${index + 1}`}
          />
        ))}
    </Container>
  );
}
