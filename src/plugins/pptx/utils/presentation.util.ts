/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-expressions */
import { AirParser } from "airppt-parser";
import loadBinaryImage from "./loadImage.util";

const getFillColor = async (
  context: CanvasRenderingContext2D,
  colorLikeObject: any,
  shape: any
) => {
  if (colorLikeObject.type === "SOLID") {
    return colorLikeObject.value;
  }
  if (colorLikeObject.type === "GRADIENT") {
    if (colorLikeObject.value.gradientType === "GradientLinear") {
      const radians = ((colorLikeObject.value.angle || 0) * Math.PI) / 180;
      const length = Math.sqrt(
        (shape.boundingBox.width - shape.boundingBox.x) ** 2 +
          (shape.boundingBox.height - shape.boundingBox.y) ** 2
      );

      const gradient = context.createLinearGradient(
        shape.boundingBox.x + Math.sin(radians) * length,
        shape.boundingBox.y + Math.cos(radians) * length,
        shape.boundingBox.width - Math.sin(radians) * length,
        shape.boundingBox.height - Math.cos(radians) * length
      );

      colorLikeObject.value.points.forEach((point: any) => {
        gradient.addColorStop(point.position, point.color);
      });

      return gradient;
    }

    if (colorLikeObject.value.gradientType === "GradientPath") {
      if (colorLikeObject.value.path === "rect") {
        const gradient = context.createLinearGradient(
          shape.boundingBox.x,
          shape.boundingBox.y,
          shape.boundingBox.width,
          shape.boundingBox.height
        );

        colorLikeObject.value.points.forEach((stop: any) => {
          gradient.addColorStop(stop.position, stop.color);
        });

        return gradient;
      }

      if (colorLikeObject.value.path === "circle") {
        const radius = shape.boundingBox.width * 0.05;

        const gradient = context.createRadialGradient(
          shape.boundingBox.x + shape.boundingBox.width / 2,
          shape.boundingBox.y + shape.boundingBox.height / 2,
          radius,
          shape.boundingBox.x + shape.boundingBox.width / 2,
          shape.boundingBox.y + shape.boundingBox.height / 2,
          shape.boundingBox.width / 2
        );

        colorLikeObject.value.points.forEach((stop: any) => {
          gradient.addColorStop(stop.position, stop.color);
        });

        return gradient;
      }
    }
  }

  if (colorLikeObject.type === "BLIP") {
    const image = await loadBinaryImage(colorLikeObject.value.binary);
    context.drawImage(
      image,
      shape.boundingBox.x,
      shape.boundingBox.y,
      shape.boundingBox.width,
      shape.boundingBox.height
    );

    return "transparent";
  }
  if (colorLikeObject.type === "NO_FILL") {
    return "transparent";
  }

  console.log("Unknown shape fill type:", colorLikeObject);

  return "#000";
};

class PresentationDrawer {
  public presentation: any;

  constructor(presentation: any) {
    this.presentation = presentation;
  }

  public async drawSlide(canvas: HTMLCanvasElement, slideIndex: number) {
    const context = canvas.getContext("2d");

    if (!context) return;

    const slide = this.presentation.slides[slideIndex];

    await this.drawSlideBackgrounds(context, slide.backgrounds);
    await Promise.all(
      slide.layers.map((layer: any) => this.renderSlideLayer(context, layer))
    );
  }

  private async drawSlideBackgrounds(
    context: CanvasRenderingContext2D,
    backgrounds: any[]
  ) {
    return Promise.all(
      backgrounds.map(async (background: any) => {
        context.save();
        if (background.type === "SOLID") {
          context.fillStyle = background.color;
          context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        } else if (background.type === "GRADIENT") {
          const radians = (background.value.angle * Math.PI) / 180;
          const gradient = context.createLinearGradient(
            0,
            0,
            Math.cos(radians) * context.canvas.width,
            Math.sin(radians) * context.canvas.height
          );

          background.value.points.forEach((point: any) => {
            gradient.addColorStop(point.position, point.color);
          });

          context.fillStyle = gradient;
          context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        } else if (background.type === "BLIP") {
          const image = await loadBinaryImage(background.value.binary);
          context.drawImage(
            image,
            0,
            0,
            context.canvas.width,
            context.canvas.height
          );
        } else {
          console.log("Unrecognized background:", background);
        }

        context.restore();
      })
    );
  }

  private async renderSlideLayer(
    context: CanvasRenderingContext2D,
    layer: any
  ) {
    return Promise.all(
      layer.map(async (shape: any) => {
        if (shape.geometry.type === "custom") {
          await this.renderCustom(context, shape);
        }

        if (shape.geometry.type === "rect") {
          await this.renderRect(context, shape);
        }

        if (shape.geometry.type === "ellipse") {
          await this.renderEllipse(context, shape);
        }

        if (shape.text) {
          await this.renderText(context, shape);
        }
      })
    );
  }

  private async renderCustom(context: CanvasRenderingContext2D, shape: any) {
    context.save();
    context.beginPath();

    context.fillStyle = shape.style.fill.value;
    context.strokeStyle = shape.style.border
      ? shape.style.border.fill.value
      : "transparent";
    context.globalAlpha = shape.style.opacity;
    context.lineWidth = shape.style.border ? shape.style.border.thickness : 1;
    context.moveTo(
      shape.boundingBox.x + shape.geometry.path.moveTo.x / 2,
      shape.boundingBox.y + shape.geometry.path.moveTo.y / 2
    );
    shape.geometry.path.points.forEach((point: any) => {
      context.lineTo(
        shape.boundingBox.x + point.x / 2,
        shape.boundingBox.y + point.y / 2
      );
    });

    context.fill();
    context.stroke();
    context.closePath();
    context.restore();
  }

  private async renderRect(context: CanvasRenderingContext2D, shape: any) {
    context.save();
    const fillColor = await getFillColor(context, shape.style.fill, shape);

    context.beginPath();
    context.rect(
      shape.boundingBox.x,
      shape.boundingBox.y,
      shape.boundingBox.width,
      shape.boundingBox.height
    );

    context.globalAlpha = shape.style.opacity;
    context.fillStyle = fillColor;

    if (shape.style.border && shape.style.border.thickness > 0) {
      context.strokeStyle = shape.style.border.fill.value;
      context.lineWidth = shape.style.border.thickness;
      context.stroke();
    }

    context.fill();
    context.closePath();
    context.restore();
  }

  private async renderText(context: CanvasRenderingContext2D, element: any) {
    if (!element.text) return;
    if (!element.text.paragraphs.length) return;

    context.save();
    element.text.paragraphs.forEach(
      (paragraph: any, paragraphIndex: number) => {
        if (paragraph.type !== "PARAGRAPH") return;
        const fontAttributes = paragraph.style.attributes
          .filter(
            (attribute: any) =>
              attribute.type === "BOLD" || attribute.type === "ITALIC"
          )
          .map((attribute: any) => attribute.toLowerCase().trim())
          .join(" ");
        context.globalAlpha = paragraph.style.opacity;
        context.fillStyle = paragraph.style.color;
        context.textAlign = paragraph.style.alignment.toLowerCase();
        context.font = `${fontAttributes} ${paragraph.style.fontSize}px ${paragraph.style.fontFamily}`;

        let textPositionX = element.boundingBox.x;
        let textPositionY = element.boundingBox.y;

        switch (paragraph.style.alignment) {
          case "CENTER":
            textPositionX += element.boundingBox.width / 2;
            break;
          case "RIGHT":
            textPositionX += element.boundingBox.width;
            break;
          default: {
            textPositionX += 0;
          }
        }

        const lines = this.splitTextByLines(
          context,
          paragraph.text,
          element.boundingBox.width
        );

        switch (element.text.style.verticalAlign) {
          case "TOP":
            textPositionY += 0;
            break;
          case "CENTER":
            context.textBaseline = "middle";
            textPositionY += element.boundingBox.height / 2;
            if (element.text.paragraphs.length > 1) {
              textPositionY -=
                (element.text.paragraphs.length - paragraphIndex) *
                paragraph.style.fontSize;
            }
            break;
          case "BOTTOM":
            context.textBaseline = "bottom";
            textPositionY += element.boundingBox.height;
            break;
          default: {
            textPositionY += 0;
          }
        }

        lines.forEach((line) => {
          const shiftY =
            paragraphIndex *
            (paragraph.style.fontSize + paragraph.style.spaceAfter);
          context.fillText(line, textPositionX, textPositionY + shiftY);
          textPositionY +=
            paragraph.style.fontSize * paragraph.style.lineSpacing;
        });
      }
    );

    context.restore();
  }

  private async renderEllipse(context: CanvasRenderingContext2D, element: any) {
    context.save();
    const fillColor = await getFillColor(context, element.style.fill, element);

    context.globalAlpha = element.style.opacity;
    context.fillStyle = fillColor;

    context.beginPath();
    context.ellipse(
      element.boundingBox.x + element.boundingBox.width / 2,
      element.boundingBox.y + element.boundingBox.height / 2,
      element.boundingBox.width / 2,
      element.boundingBox.height / 2,
      0,
      0,
      2 * Math.PI
    );

    context.fill();

    context.closePath();
    context.restore();
  }

  private splitTextByLines(context: any, text: string, maxWidth: number) {
    const lines = [];
    let textRef = text;
    let result;
    let width = 0;
    let i;
    let j;

    while (textRef.length) {
      for (
        i = textRef.length;
        context.measureText(textRef.slice(0, i)).width > maxWidth;
        i -= 1
      );

      result = textRef.slice(0, i);

      if (i !== textRef.length)
        for (
          j = 0;
          result.indexOf(" ", j) !== -1;
          j = result.indexOf(" ", j) + 1
        );

      lines.push(result.slice(0, j || result.length));
      width = Math.max(
        width,
        context.measureText(lines[lines.length - 1]).width
      );
      textRef = textRef.slice(lines[lines.length - 1].length, textRef.length);
    }

    return lines;
  }
}

async function parsePresentation(file: string | Buffer | ArrayBuffer) {
  const parser = new AirParser(file);
  const presentation = await parser.parse();
  return presentation;
}

export { PresentationDrawer, parsePresentation };
