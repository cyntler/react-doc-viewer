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
                        length_1 = Math.sqrt(Math.pow((shape.boundingBox.width - shape.boundingBox.x), 2) +
                            Math.pow((shape.boundingBox.height - shape.boundingBox.y), 2));
                        gradient_1 = context.createLinearGradient(shape.boundingBox.x + Math.sin(radians) * length_1, shape.boundingBox.y + Math.cos(radians) * length_1, shape.boundingBox.width - Math.sin(radians) * length_1, shape.boundingBox.height - Math.cos(radians) * length_1);
                        colorLikeObject.value.points.forEach(function (point) {
                            gradient_1.addColorStop(point.position, point.color);
                        });
                        return [2 /*return*/, gradient_1];
                    }
                    if (colorLikeObject.value.gradientType === "GradientPath") {
                        if (colorLikeObject.value.path === "rect") {
                            gradient_2 = context.createLinearGradient(shape.boundingBox.x, shape.boundingBox.y, shape.boundingBox.width, shape.boundingBox.height);
                            colorLikeObject.value.points.forEach(function (stop) {
                                gradient_2.addColorStop(stop.position, stop.color);
                            });
                            return [2 /*return*/, gradient_2];
                        }
                        if (colorLikeObject.value.path === "circle") {
                            radius = shape.boundingBox.width * 0.05;
                            gradient_3 = context.createRadialGradient(shape.boundingBox.x + shape.boundingBox.width / 2, shape.boundingBox.y + shape.boundingBox.height / 2, radius, shape.boundingBox.x + shape.boundingBox.width / 2, shape.boundingBox.y + shape.boundingBox.height / 2, shape.boundingBox.width / 2);
                            colorLikeObject.value.points.forEach(function (stop) {
                                gradient_3.addColorStop(stop.position, stop.color);
                            });
                            return [2 /*return*/, gradient_3];
                        }
                    }
                }
                if (!(colorLikeObject.type === "BLIP")) return [3 /*break*/, 2];
                return [4 /*yield*/, loadBinaryImage(colorLikeObject.value.binary)];
            case 1:
                image = _a.sent();
                context.drawImage(image, shape.boundingBox.x, shape.boundingBox.y, shape.boundingBox.width, shape.boundingBox.height);
                return [2 /*return*/, "transparent"];
            case 2:
                if (colorLikeObject.type === "NO_FILL") {
                    return [2 /*return*/, "transparent"];
                }
                console.log("Unknown shape fill type:", colorLikeObject);
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
                        return [4 /*yield*/, this.drawSlideBackgrounds(context, slide.backgrounds)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, Promise.all(slide.layers.map(function (layer) { return _this.renderSlideLayer(context, layer); }))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PresentationDrawer.prototype.drawSlideBackgrounds = function (context, backgrounds) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, Promise.all(backgrounds.map(function (background) { return __awaiter(_this, void 0, void 0, function () {
                        var radians, gradient_4, image;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    context.save();
                                    if (!(background.type === "SOLID")) return [3 /*break*/, 1];
                                    context.fillStyle = background.color;
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
                    }); }))];
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
                                    _a.label = 2;
                                case 2:
                                    if (!(shape.geometry.type === "rect")) return [3 /*break*/, 4];
                                    return [4 /*yield*/, this.renderRect(context, shape)];
                                case 3:
                                    _a.sent();
                                    _a.label = 4;
                                case 4:
                                    if (!(shape.geometry.type === "ellipse")) return [3 /*break*/, 6];
                                    return [4 /*yield*/, this.renderEllipse(context, shape)];
                                case 5:
                                    _a.sent();
                                    _a.label = 6;
                                case 6:
                                    if (!shape.text) return [3 /*break*/, 8];
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                context.save();
                context.beginPath();
                context.fillStyle = shape.style.fill.value;
                context.strokeStyle = shape.style.border
                    ? shape.style.border.fill.value
                    : "transparent";
                context.globalAlpha = shape.style.opacity;
                context.lineWidth = shape.style.border ? shape.style.border.thickness : 1;
                context.moveTo(shape.boundingBox.x + shape.geometry.path.moveTo.x / 2, shape.boundingBox.y + shape.geometry.path.moveTo.y / 2);
                shape.geometry.path.points.forEach(function (point) {
                    context.lineTo(shape.boundingBox.x + point.x / 2, shape.boundingBox.y + point.y / 2);
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
                        return [4 /*yield*/, getFillColor(context, shape.style.fill, shape)];
                    case 1:
                        fillColor = _a.sent();
                        context.beginPath();
                        context.rect(shape.boundingBox.x, shape.boundingBox.y, shape.boundingBox.width, shape.boundingBox.height);
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
                        return [2 /*return*/];
                }
            });
        });
    };
    PresentationDrawer.prototype.renderText = function (context, element) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (!element.text)
                    return [2 /*return*/];
                if (!element.text.paragraphs.length)
                    return [2 /*return*/];
                context.save();
                element.text.paragraphs.forEach(function (paragraph, paragraphIndex) {
                    if (paragraph.type !== "PARAGRAPH")
                        return;
                    var fontAttributes = paragraph.style.attributes
                        .filter(function (attribute) {
                        return attribute.type === "BOLD" || attribute.type === "ITALIC";
                    })
                        .map(function (attribute) { return attribute.toLowerCase().trim(); })
                        .join(" ");
                    context.globalAlpha = paragraph.style.opacity;
                    context.fillStyle = paragraph.style.color;
                    context.textAlign = paragraph.style.alignment.toLowerCase();
                    context.font = fontAttributes + " " + paragraph.style.fontSize + "px " + paragraph.style.fontFamily;
                    var textPositionX = element.boundingBox.x;
                    var textPositionY = element.boundingBox.y;
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
                    var lines = _this.splitTextByLines(context, paragraph.text, element.boundingBox.width);
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
                    lines.forEach(function (line) {
                        var shiftY = paragraphIndex *
                            (paragraph.style.fontSize + paragraph.style.spaceAfter);
                        context.fillText(line, textPositionX, textPositionY + shiftY);
                        textPositionY +=
                            paragraph.style.fontSize * paragraph.style.lineSpacing;
                    });
                });
                context.restore();
                return [2 /*return*/];
            });
        });
    };
    PresentationDrawer.prototype.renderEllipse = function (context, element) {
        return __awaiter(this, void 0, void 0, function () {
            var fillColor;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        context.save();
                        return [4 /*yield*/, getFillColor(context, element.style.fill, element)];
                    case 1:
                        fillColor = _a.sent();
                        context.globalAlpha = element.style.opacity;
                        context.fillStyle = fillColor;
                        context.beginPath();
                        context.ellipse(element.boundingBox.x + element.boundingBox.width / 2, element.boundingBox.y + element.boundingBox.height / 2, element.boundingBox.width / 2, element.boundingBox.height / 2, 0, 0, 2 * Math.PI);
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
        var textRef = text;
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
