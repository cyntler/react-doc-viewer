var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-expressions */
import { AirParser } from "airppt-parser";
import loadBinaryImage from "./loadImage.util";
var applyAlphaToHex = function (color, alpha) {
    if (alpha === 1)
        return color;
    var hex = color.replace("#", "").slice(0, 6);
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    var alphaHex = Math.floor(0xff * alpha).toString(16);
    if (alphaHex.length === 1) {
        alphaHex += alphaHex;
    }
    return "#" + hex + alphaHex;
};
var getFillColor = function (context, colorLikeObject, shape) { return __awaiter(void 0, void 0, void 0, function () {
    var radians, length_1, gradient_1, gradient_2, radius, gradient_3, image;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (colorLikeObject.type === "SOLID") {
                    return [2 /*return*/, colorLikeObject.value];
                }
                if (colorLikeObject.type === "GRADIENT") {
                    if (colorLikeObject.value.gradientType === "GradientLinear") {
                        radians = ((colorLikeObject.value.angle || 0) * Math.PI) / 180;
                        length_1 = Math.sqrt(Math.pow((shape.box.width - shape.box.x), 2) +
                            Math.pow((shape.box.height - shape.box.y), 2));
                        gradient_1 = context.createLinearGradient(shape.box.x + Math.sin(radians) * length_1, shape.box.y + Math.cos(radians) * length_1, shape.box.width - Math.sin(radians) * length_1, shape.box.height - Math.cos(radians) * length_1);
                        colorLikeObject.value.points.forEach(function (point) {
                            gradient_1.addColorStop(point.position, point.fill.value);
                        });
                        return [2 /*return*/, gradient_1];
                    }
                    if (colorLikeObject.value.gradientType === "GradientPath") {
                        if (colorLikeObject.value.path === "rect") {
                            gradient_2 = context.createLinearGradient(shape.box.x, shape.box.y, shape.box.width, shape.box.height);
                            colorLikeObject.value.points.forEach(function (stop) {
                                gradient_2.addColorStop(stop.position, stop.fill.value);
                            });
                            return [2 /*return*/, gradient_2];
                        }
                        if (colorLikeObject.value.path === "circle") {
                            radius = shape.box.width * 0.05;
                            gradient_3 = context.createRadialGradient(shape.box.x + shape.box.width / 2, shape.box.y + shape.box.height / 2, radius, shape.box.x + shape.box.width / 2, shape.box.y + shape.box.height / 2, shape.box.width / 2);
                            colorLikeObject.value.points.forEach(function (stop) {
                                gradient_3.addColorStop(stop.position, applyAlphaToHex(stop.fill.value, stop.fill.opacity || 1));
                            });
                            return [2 /*return*/, gradient_3];
                        }
                    }
                }
                if (!(colorLikeObject.type === "BLIP")) return [3 /*break*/, 2];
                return [4 /*yield*/, loadBinaryImage(colorLikeObject.value.binary)];
            case 1:
                image = _a.sent();
                context.drawImage(image, shape.box.x, shape.box.y, shape.box.width, shape.box.height);
                return [2 /*return*/, "transparent"];
            case 2:
                if (colorLikeObject.type === "NO_FILL") {
                    return [2 /*return*/, "transparent"];
                }
                console.warn("Unknown shape fill type:", colorLikeObject);
                return [2 /*return*/, "#000"];
        }
    });
}); };
var PresentationDrawer = /** @class */ (function () {
    function PresentationDrawer(presentation) {
        this.presentation = presentation;
    }
    PresentationDrawer.prototype.drawSlide = function (canvas, slideIndex) {
        return __awaiter(this, void 0, void 0, function () {
            var context, slide;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        context = canvas.getContext("2d");
                        if (!context)
                            return [2 /*return*/];
                        slide = this.presentation.slides[slideIndex];
                        if (!slide.background) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.drawSlideBackground(context, slide.background)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, Promise.all(slide.layers.map(function (layer) { return _this.renderSlideLayer(context, layer); }))];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PresentationDrawer.prototype.drawSlideBackground = function (context, background) {
        return __awaiter(this, void 0, void 0, function () {
            var radians, gradient_4, image;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        context.save();
                        if (!(background.type === "SOLID")) return [3 /*break*/, 1];
                        context.fillStyle = background.value;
                        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
                        return [3 /*break*/, 5];
                    case 1:
                        if (!(background.type === "GRADIENT")) return [3 /*break*/, 2];
                        radians = (background.value.angle * Math.PI) / 180;
                        gradient_4 = context.createLinearGradient(0, 0, Math.cos(radians) * context.canvas.width, Math.sin(radians) * context.canvas.height);
                        background.value.points.forEach(function (point) {
                            gradient_4.addColorStop(point.position, point.color);
                        });
                        context.fillStyle = gradient_4;
                        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
                        return [3 /*break*/, 5];
                    case 2:
                        if (!(background.type === "BLIP")) return [3 /*break*/, 4];
                        return [4 /*yield*/, loadBinaryImage(background.value.binary)];
                    case 3:
                        image = _a.sent();
                        context.drawImage(image, 0, 0, context.canvas.width, context.canvas.height);
                        return [3 /*break*/, 5];
                    case 4:
                        console.log("Unrecognized background:", background);
                        _a.label = 5;
                    case 5:
                        context.restore();
                        return [2 /*return*/];
                }
            });
        });
    };
    PresentationDrawer.prototype.renderSlideLayer = function (context, layer) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, Promise.all(layer.map(function (shape) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(shape.geometry.type === "custom")) return [3 /*break*/, 2];
                                    return [4 /*yield*/, this.renderCustom(context, shape)];
                                case 1:
                                    _a.sent();
                                    return [3 /*break*/, 6];
                                case 2:
                                    if (!(shape.geometry.type === "rect")) return [3 /*break*/, 4];
                                    return [4 /*yield*/, this.renderRect(context, shape)];
                                case 3:
                                    _a.sent();
                                    return [3 /*break*/, 6];
                                case 4:
                                    if (!(shape.geometry.type === "ellipse")) return [3 /*break*/, 6];
                                    return [4 /*yield*/, this.renderEllipse(context, shape)];
                                case 5:
                                    _a.sent();
                                    _a.label = 6;
                                case 6:
                                    if (!(!shape.master && shape.text)) return [3 /*break*/, 8];
                                    return [4 /*yield*/, this.renderText(context, shape)];
                                case 7:
                                    _a.sent();
                                    _a.label = 8;
                                case 8: return [2 /*return*/];
                            }
                        });
                    }); }))];
            });
        });
    };
    PresentationDrawer.prototype.renderCustom = function (context, shape) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                context.save();
                context.beginPath();
                context.fillStyle = shape.containerStyle.fill.value;
                context.strokeStyle = shape.containerStyle.border
                    ? shape.containerStyle.border.fill.value
                    : "transparent";
                context.globalAlpha = ((_b = (_a = shape.containerStyle) === null || _a === void 0 ? void 0 : _a.fill) === null || _b === void 0 ? void 0 : _b.opacity) || 1;
                context.lineWidth = shape.containerStyle.border
                    ? shape.containerStyle.border.thickness
                    : 1;
                context.moveTo(shape.box.x + shape.geometry.path.moveTo.x / 2, shape.box.y + shape.geometry.path.moveTo.y / 2);
                shape.geometry.path.points.forEach(function (point) {
                    context.lineTo(shape.box.x + point.x / 2, shape.box.y + point.y / 2);
                });
                context.fill();
                context.stroke();
                context.closePath();
                context.restore();
                return [2 /*return*/];
            });
        });
    };
    PresentationDrawer.prototype.renderRect = function (context, shape) {
        return __awaiter(this, void 0, void 0, function () {
            var fillColor;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        context.save();
                        return [4 /*yield*/, getFillColor(context, shape.containerStyle.fill, shape)];
                    case 1:
                        fillColor = _a.sent();
                        context.beginPath();
                        context.rect(shape.box.x, shape.box.y, shape.box.width, shape.box.height);
                        context.globalAlpha = shape.containerStyle.opacity;
                        context.fillStyle = fillColor;
                        if (shape.containerStyle.border &&
                            shape.containerStyle.border.thickness > 0) {
                            context.strokeStyle = shape.containerStyle.border.fill.value;
                            context.lineWidth = shape.containerStyle.border.thickness;
                            context.stroke();
                        }
                        context.fill();
                        context.closePath();
                        context.restore();
                        return [2 /*return*/];
                }
            });
        });
    };
    PresentationDrawer.prototype.renderText = function (context, element) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_b) {
                if (!element.text)
                    return [2 /*return*/];
                if (!element.text.paragraphs.length)
                    return [2 /*return*/];
                if (!((_a = element.box) === null || _a === void 0 ? void 0 : _a.x))
                    return [2 /*return*/];
                context.save();
                element.text.paragraphs.forEach(function (paragraph, paragraphIndex) {
                    var _a, _b, _c;
                    if (paragraph.type !== "PARAGRAPH")
                        return;
                    var fontAttributes = paragraph.properties.attributes
                        .filter(function (attribute) {
                        return attribute.type === "BOLD" || attribute.type === "ITALIC";
                    })
                        .map(function (attribute) { return attribute.toLowerCase().trim(); })
                        .join(" ");
                    context.globalAlpha = ((_a = paragraph.properties.fill) === null || _a === void 0 ? void 0 : _a.opacity) || 1;
                    context.fillStyle = paragraph.properties.fill.value;
                    context.textAlign =
                        ((_b = paragraph.properties.alignment) === null || _b === void 0 ? void 0 : _b.toLowerCase()) || "left";
                    context.font = fontAttributes + " " + paragraph.properties.fontSize + "px " + paragraph.properties.fontFamily;
                    console.log("Draw text:", paragraph.text, context.fillStyle, context.font);
                    var textPositionX = element.box.x;
                    var textPositionY = element.box.y;
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
                    var lines = _this.splitTextByLines(context, paragraph.text, element.box.width + paragraph.properties.fontSize);
                    switch ((_c = element.text.style) === null || _c === void 0 ? void 0 : _c.verticalAlign) {
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
                    lines.forEach(function (line) {
                        var shiftY = paragraphIndex *
                            (paragraph.properties.fontSize + paragraph.properties.spaceAfter);
                        context.fillText(line, textPositionX, textPositionY + shiftY);
                        textPositionY +=
                            paragraph.properties.fontSize + paragraph.properties.lineSpacing;
                    });
                });
                context.restore();
                return [2 /*return*/];
            });
        });
    };
    PresentationDrawer.prototype.renderEllipse = function (context, element) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var fillColor;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        context.save();
                        return [4 /*yield*/, getFillColor(context, element.containerStyle.fill, element)];
                    case 1:
                        fillColor = _b.sent();
                        context.globalAlpha = ((_a = element.containerStyle.fill) === null || _a === void 0 ? void 0 : _a.opacity) || 1;
                        context.fillStyle = fillColor;
                        context.beginPath();
                        context.ellipse(element.box.x + element.box.width / 2, element.box.y + element.box.height / 2, element.box.width / 2, element.box.height / 2, 0, 0, 2 * Math.PI);
                        context.fill();
                        context.closePath();
                        context.restore();
                        return [2 /*return*/];
                }
            });
        });
    };
    PresentationDrawer.prototype.splitTextByLines = function (context, text, maxWidth) {
        var lines = [];
        var textRef = text.trim();
        var result;
        var width = 0;
        var i;
        var j;
        while (textRef.length) {
            for (i = textRef.length; context.measureText(textRef.slice(0, i)).width > maxWidth; i -= 1)
                ;
            result = textRef.slice(0, i);
            if (i !== textRef.length)
                for (j = 0; result.indexOf(" ", j) !== -1; j = result.indexOf(" ", j) + 1)
                    ;
            lines.push(result.slice(0, j || result.length));
            width = Math.max(width, context.measureText(lines[lines.length - 1]).width);
            textRef = textRef.slice(lines[lines.length - 1].length, textRef.length);
        }
        return lines;
    };
    return PresentationDrawer;
}());
function parsePresentation(file) {
    return __awaiter(this, void 0, void 0, function () {
        var parser, presentation;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    parser = new AirParser(file);
                    return [4 /*yield*/, parser.parse()];
                case 1:
                    presentation = _a.sent();
                    return [2 /*return*/, presentation];
            }
        });
    });
}
export { PresentationDrawer, parsePresentation };
