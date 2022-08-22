/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-expressions */
import { AirParser } from "airppt-parser";
import loadBinaryImage from "./loadImage.util";

const applyAlphaToHex = (color: string, alpha: number) => {
  if (alpha === 1) return color;

  let hex = color.replace("#", "").slice(0, 6);

  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  let alphaHex = Math.floor(0xff * alpha).toString(16);
  if (alphaHex.length === 1) {
    alphaHex += alphaHex;
  }

  return `#${hex}${alphaHex}`;
};

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
        (shape.box.width - shape.box.x) ** 2 +
          (shape.box.height - shape.box.y) ** 2
      );

      const gradient = context.createLinearGradient(
        shape.box.x + Math.sin(radians) * length,
        shape.box.y + Math.cos(radians) * length,
        shape.box.width - Math.sin(radians) * length,
        shape.box.height - Math.cos(radians) * length
      );

      colorLikeObject.value.points.forEach((point: any) => {
        gradient.addColorStop(point.position, point.fill.value);
      });

      return gradient;
    }

    if (colorLikeObject.value.gradientType === "GradientPath") {
      if (colorLikeObject.value.path === "rect") {
        const gradient = context.createLinearGradient(
          shape.box.x,
          shape.box.y,
          shape.box.width,
          shape.box.height
        );

        colorLikeObject.value.points.forEach((stop: any) => {
          gradient.addColorStop(stop.position, stop.fill.value);
        });

        return gradient;
      }

      if (colorLikeObject.value.path === "circle") {
        const radius = shape.box.width * 0.05;

        const gradient = context.createRadialGradient(
          shape.box.x + shape.box.width / 2,
          shape.box.y + shape.box.height / 2,
          radius,
          shape.box.x + shape.box.width / 2,
          shape.box.y + shape.box.height / 2,
          shape.box.width / 2
        );

        colorLikeObject.value.points.forEach((stop: any) => {
          gradient.addColorStop(
            stop.position,
            applyAlphaToHex(stop.fill.value, stop.fill.opacity || 1)
          );
        });

        return gradient;
      }
    }
  }

  if (colorLikeObject.type === "BLIP") {
    const image = await loadBinaryImage(colorLikeObject.value.binary);
    context.drawImage(
      image,
      shape.box.x,
      shape.box.y,
      shape.box.width,
      shape.box.height
    );

    return "transparent";
  }
  if (colorLikeObject.type === "NO_FILL") {
    return "transparent";
  }

  console.warn("Unknown shape fill type:", colorLikeObject);

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

    if (slide.background) {
      await this.drawSlideBackground(context, slide.background);
    }

    await Promise.all(
      slide.layers.map((layer: any) => this.renderSlideLayer(context, layer))
    );
  }

  private async drawSlideBackground(
    context: CanvasRenderingContext2D,
    background: any
  ) {
    context.save();
    if (background.type === "SOLID") {
      context.fillStyle = background.value;
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
  }

  private async renderSlideLayer(
    context: CanvasRenderingContext2D,
    layer: any
  ) {
    return Promise.all(
      layer.map(async (shape: any) => {
        if (shape.geometry.type === "custom") {
          await this.renderCustom(context, shape);
        } else if (shape.geometry.type === "rect") {
          await this.renderRect(context, shape);
        } else if (shape.geometry.type === "ellipse") {
          await this.renderEllipse(context, shape);
        }

        if (!shape.master && shape.text) {
          await this.renderText(context, shape);
        }
      })
    );
  }

  private async renderCustom(context: CanvasRenderingContext2D, shape: any) {
    context.save();
    context.beginPath();

    context.fillStyle = shape.containerStyle.fill.value;
    context.strokeStyle = shape.containerStyle.border
      ? shape.containerStyle.border.fill.value
      : "transparent";
    context.globalAlpha = shape.containerStyle?.fill?.opacity || 1;
    context.lineWidth = shape.containerStyle.border
      ? shape.containerStyle.border.thickness
      : 1;
    context.moveTo(
      shape.box.x + shape.geometry.path.moveTo.x / 2,
      shape.box.y + shape.geometry.path.moveTo.y / 2
    );
    shape.geometry.path.points.forEach((point: any) => {
      context.lineTo(shape.box.x + point.x / 2, shape.box.y + point.y / 2);
    });

    context.fill();
    context.stroke();
    context.closePath();
    context.restore();
  }

  private async renderRect(context: CanvasRenderingContext2D, shape: any) {
    context.save();
    const fillColor = await getFillColor(
      context,
      shape.containerStyle.fill,
      shape
    );

    context.beginPath();
    context.rect(shape.box.x, shape.box.y, shape.box.width, shape.box.height);

    context.globalAlpha = shape.containerStyle.opacity;
    context.fillStyle = fillColor;

    if (
      shape.containerStyle.border &&
      shape.containerStyle.border.thickness > 0
    ) {
      context.strokeStyle = shape.containerStyle.border.fill.value;
      context.lineWidth = shape.containerStyle.border.thickness;
      context.stroke();
    }

    context.fill();
    context.closePath();
    context.restore();
  }

  private async renderText(context: CanvasRenderingContext2D, element: any) {
    if (!element.text) return;
    if (!element.text.paragraphs.length) return;
    if (!element.box?.x) return;
    context.save();

    element.text.paragraphs.forEach(
      (paragraph: any, paragraphIndex: number) => {
        if (paragraph.type !== "PARAGRAPH") return;

        const fontAttributes = paragraph.properties.attributes
          .filter(
            (attribute: any) =>
              attribute.type === "BOLD" || attribute.type === "ITALIC"
          )
          .map((attribute: any) => attribute.toLowerCase().trim())
          .join(" ");

        context.globalAlpha = paragraph.properties.fill?.opacity || 1;
        context.fillStyle = paragraph.properties.fill.value;
        context.textAlign =
          paragraph.properties.alignment?.toLowerCase() || "left";
        context.font = `${fontAttributes} ${paragraph.properties.fontSize}px ${paragraph.properties.fontFamily}`;
        console.log(
          "Draw text:",
          paragraph.text,
          context.fillStyle,
          context.font
        );
        let textPositionX = element.box.x;
        let textPositionY = element.box.y;

        switch (paragraph.properties.alignment) {
          case "CENTER":
            textPositionX += element.box.width / 2;
            break;
          case "RIGHT":
            textPositionX += element.box.width;
            break;
          default: {
            textPositionX += 0;
          }
        }

        const lines = this.splitTextByLines(
          context,
          paragraph.text,
          element.box.width + paragraph.properties.fontSize
        );

        switch (element.text.style?.verticalAlign) {
          case "CENTER":
            context.textBaseline = "middle";
            textPositionY += element.box.height / 2;
            if (element.text.paragraphs.length > 1) {
              textPositionY -=
                (element.text.paragraphs.length - paragraphIndex) *
                paragraph.properties.fontSize;
            }
            break;
          case "BOTTOM":
            context.textBaseline = "bottom";
            textPositionY += element.box.height;
            break;
          default: {
            textPositionY +=
              paragraph.properties.fontSize +
              paragraph.properties.fontSize * paragraphIndex;
          }
        }

        lines.forEach((line) => {
          const shiftY =
            paragraphIndex *
            (paragraph.properties.fontSize + paragraph.properties.spaceAfter);
          context.fillText(line, textPositionX, textPositionY + shiftY);
          textPositionY +=
            paragraph.properties.fontSize + paragraph.properties.lineSpacing;
        });
      }
    );

    context.restore();
  }

  private async renderEllipse(context: CanvasRenderingContext2D, element: any) {
    context.save();
    const fillColor = await getFillColor(
      context,
      element.containerStyle.fill,
      element
    );

    context.globalAlpha = element.containerStyle.fill?.opacity || 1;
    context.fillStyle = fillColor;

    context.beginPath();
    context.ellipse(
      element.box.x + element.box.width / 2,
      element.box.y + element.box.height / 2,
      element.box.width / 2,
      element.box.height / 2,
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
    let textRef = text.trim();
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
