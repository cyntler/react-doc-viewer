"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocViewerRenderers = void 0;
var bmp_1 = __importDefault(require("./bmp"));
var html_1 = __importDefault(require("./html"));
var jpg_1 = __importDefault(require("./jpg"));
var msdoc_1 = __importDefault(require("./msdoc"));
var msg_1 = __importDefault(require("./msg"));
var pdf_1 = __importDefault(require("./pdf"));
var png_1 = __importDefault(require("./png"));
var tiff_1 = __importDefault(require("./tiff"));
var txt_1 = __importDefault(require("./txt"));
exports.DocViewerRenderers = [
    bmp_1.default,
    html_1.default,
    jpg_1.default,
    msdoc_1.default,
    msg_1.default,
    pdf_1.default,
    png_1.default,
    tiff_1.default,
    txt_1.default,
];
