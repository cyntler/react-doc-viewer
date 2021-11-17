"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseTIFF = void 0;
var tiffDataView = undefined;
var littleEndian = undefined;
var fileDirectories = [];
var isLittleEndian = function () {
    // Get byte order mark.
    var BOM = getBytes(2, 0);
    // Find out the endianness.
    if (BOM === 0x4949) {
        littleEndian = true;
    }
    else if (BOM === 0x4d4d) {
        littleEndian = false;
    }
    else {
        throw TypeError("Invalid byte order value.");
    }
    return littleEndian;
};
var hasTowel = function () {
    // Check for towel.
    if (getBytes(2, 2) !== 42) {
        throw RangeError("You forgot your towel!");
        return false;
    }
    return true;
};
var getFieldTagName = function (fieldTag) {
    // See: http://www.digitizationguidelines.gov/guidelines/TIFF_Metadata_Final.pdf
    // See: http://www.digitalpreservation.gov/formats/content/tiff_tags.shtml
    var fieldTagNames = {
        // TIFF Baseline
        0x013b: "Artist",
        0x0102: "BitsPerSample",
        0x0109: "CellLength",
        0x0108: "CellWidth",
        0x0140: "ColorMap",
        0x0103: "Compression",
        0x8298: "Copyright",
        0x0132: "DateTime",
        0x0152: "ExtraSamples",
        0x010a: "FillOrder",
        0x0121: "FreeByteCounts",
        0x0120: "FreeOffsets",
        0x0123: "GrayResponseCurve",
        0x0122: "GrayResponseUnit",
        0x013c: "HostComputer",
        0x010e: "ImageDescription",
        0x0101: "ImageLength",
        0x0100: "ImageWidth",
        0x010f: "Make",
        0x0119: "MaxSampleValue",
        0x0118: "MinSampleValue",
        0x0110: "Model",
        0x00fe: "NewSubfileType",
        0x0112: "Orientation",
        0x0106: "PhotometricInterpretation",
        0x011c: "PlanarConfiguration",
        0x0128: "ResolutionUnit",
        0x0116: "RowsPerStrip",
        0x0115: "SamplesPerPixel",
        0x0131: "Software",
        0x0117: "StripByteCounts",
        0x0111: "StripOffsets",
        0x00ff: "SubfileType",
        0x0107: "Threshholding",
        0x011a: "XResolution",
        0x011b: "YResolution",
        // TIFF Extended
        0x0146: "BadFaxLines",
        0x0147: "CleanFaxData",
        0x0157: "ClipPath",
        0x0148: "ConsecutiveBadFaxLines",
        0x01b1: "Decode",
        0x01b2: "DefaultImageColor",
        0x010d: "DocumentName",
        0x0150: "DotRange",
        0x0141: "HalftoneHints",
        0x015a: "Indexed",
        0x015b: "JPEGTables",
        0x011d: "PageName",
        0x0129: "PageNumber",
        0x013d: "Predictor",
        0x013f: "PrimaryChromaticities",
        0x0214: "ReferenceBlackWhite",
        0x0153: "SampleFormat",
        0x022f: "StripRowCounts",
        0x014a: "SubIFDs",
        0x0124: "T4Options",
        0x0125: "T6Options",
        0x0145: "TileByteCounts",
        0x0143: "TileLength",
        0x0144: "TileOffsets",
        0x0142: "TileWidth",
        0x012d: "TransferFunction",
        0x013e: "WhitePoint",
        0x0158: "XClipPathUnits",
        0x011e: "XPosition",
        0x0211: "YCbCrCoefficients",
        0x0213: "YCbCrPositioning",
        0x0212: "YCbCrSubSampling",
        0x0159: "YClipPathUnits",
        0x011f: "YPosition",
        // EXIF
        0x9202: "ApertureValue",
        0xa001: "ColorSpace",
        0x9004: "DateTimeDigitized",
        0x9003: "DateTimeOriginal",
        0x8769: "Exif IFD",
        0x9000: "ExifVersion",
        0x829a: "ExposureTime",
        0xa300: "FileSource",
        0x9209: "Flash",
        0xa000: "FlashpixVersion",
        0x829d: "FNumber",
        0xa420: "ImageUniqueID",
        0x9208: "LightSource",
        0x927c: "MakerNote",
        0x9201: "ShutterSpeedValue",
        0x9286: "UserComment",
        // IPTC
        0x83bb: "IPTC",
        // ICC
        0x8773: "ICC Profile",
        // XMP
        0x02bc: "XMP",
        // GDAL
        0xa480: "GDAL_METADATA",
        0xa481: "GDAL_NODATA",
        // Photoshop
        0x8649: "Photoshop",
    };
    var fieldTagName;
    if (fieldTag in fieldTagNames) {
        fieldTagName = fieldTagNames[fieldTag];
    }
    else {
        fieldTagName = "Tag" + fieldTag;
    }
    return fieldTagName;
};
var getFieldTypeName = function (fieldType) {
    var fieldTypeNames = {
        0x0001: "BYTE",
        0x0002: "ASCII",
        0x0003: "SHORT",
        0x0004: "LONG",
        0x0005: "RATIONAL",
        0x0006: "SBYTE",
        0x0007: "UNDEFINED",
        0x0008: "SSHORT",
        0x0009: "SLONG",
        0x000a: "SRATIONAL",
        0x000b: "FLOAT",
        0x000c: "DOUBLE",
    };
    var fieldTypeName;
    if (fieldType in fieldTypeNames) {
        fieldTypeName = fieldTypeNames[fieldType];
    }
    return fieldTypeName;
};
var getFieldTypeLength = function (fieldTypeName) {
    var fieldTypeLength;
    if (["BYTE", "ASCII", "SBYTE", "UNDEFINED"].indexOf(fieldTypeName) !== -1) {
        fieldTypeLength = 1;
    }
    else if (["SHORT", "SSHORT"].indexOf(fieldTypeName) !== -1) {
        fieldTypeLength = 2;
    }
    else if (["LONG", "SLONG", "FLOAT"].indexOf(fieldTypeName) !== -1) {
        fieldTypeLength = 4;
    }
    else if (["RATIONAL", "SRATIONAL", "DOUBLE"].indexOf(fieldTypeName) !== -1) {
        fieldTypeLength = 8;
    }
    return fieldTypeLength;
};
var getBits = function (numBits, byteOffset, bitOffset) {
    bitOffset = bitOffset || 0;
    var extraBytes = Math.floor(bitOffset / 8);
    var newByteOffset = byteOffset + extraBytes;
    var totalBits = bitOffset + numBits;
    var shiftRight = 32 - numBits;
    if (totalBits <= 0) {
        throw RangeError("No bits requested");
    }
    else if (totalBits <= 8) {
        var shiftLeft = 24 + bitOffset;
        var rawBits = tiffDataView.getUint8(newByteOffset, littleEndian);
    }
    else if (totalBits <= 16) {
        var shiftLeft = 16 + bitOffset;
        var rawBits = tiffDataView.getUint16(newByteOffset, littleEndian);
    }
    else if (totalBits <= 32) {
        var shiftLeft = bitOffset;
        var rawBits = tiffDataView.getUint32(newByteOffset, littleEndian);
    }
    else {
        throw RangeError("Too many bits requested");
    }
    var chunkInfo = {
        bits: (rawBits << shiftLeft) >>> shiftRight,
        byteOffset: newByteOffset + Math.floor(totalBits / 8),
        bitOffset: totalBits % 8,
    };
    return chunkInfo;
};
var getBytes = function (numBytes, offset) {
    if (numBytes <= 0) {
        throw RangeError("No bytes requested");
    }
    else if (numBytes <= 1) {
        return tiffDataView.getUint8(offset, littleEndian);
    }
    else if (numBytes <= 2) {
        return tiffDataView.getUint16(offset, littleEndian);
    }
    else if (numBytes <= 3) {
        return tiffDataView.getUint32(offset, littleEndian) >>> 8;
    }
    else if (numBytes <= 4) {
        return tiffDataView.getUint32(offset, littleEndian);
    }
    else {
        throw RangeError("Too many bytes requested");
    }
};
var getFieldValues = function (fieldTagName, fieldTypeName, typeCount, valueOffset) {
    var fieldValues = [];
    var fieldTypeLength = getFieldTypeLength(fieldTypeName);
    var fieldValueSize = fieldTypeLength * typeCount;
    if (fieldValueSize <= 4) {
        // The value is stored at the big end of the valueOffset.
        if (littleEndian === false) {
            var value = valueOffset >>> ((4 - fieldTypeLength) * 8);
        }
        else {
            var value = valueOffset;
        }
        fieldValues.push(value);
    }
    else {
        for (var i = 0; i < typeCount; i++) {
            var indexOffset = fieldTypeLength * i;
            if (fieldTypeLength >= 8) {
                if (["RATIONAL", "SRATIONAL"].indexOf(fieldTypeName) !== -1) {
                    // Numerator
                    fieldValues.push(getBytes(4, valueOffset + indexOffset));
                    // Denominator
                    fieldValues.push(getBytes(4, valueOffset + indexOffset + 4));
                    //					} else if (['DOUBLE'].indexOf(fieldTypeName) !== -1) {
                    //						fieldValues.push(getBytes(4, valueOffset + indexOffset) + getBytes(4, valueOffset + indexOffset + 4));
                }
                else {
                    throw TypeError("Can't handle this field type or size");
                }
            }
            else {
                fieldValues.push(getBytes(fieldTypeLength, valueOffset + indexOffset));
            }
        }
    }
    if (fieldTypeName === "ASCII") {
        fieldValues.forEach(function (e, i, a) {
            a[i] = String.fromCharCode(e);
        });
    }
    return fieldValues;
};
var clampColorSample = function (colorSample, bitsPerSample) {
    var multiplier = Math.pow(2, 8 - bitsPerSample);
    return Math.floor(colorSample * multiplier + (multiplier - 1));
};
var makeRGBAFillValue = function (r, g, b, a) {
    if (typeof a === "undefined") {
        a = 1.0;
    }
    return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
};
var parseFileDirectory = function (byteOffset) {
    var numDirEntries = getBytes(2, byteOffset);
    var tiffFields = [];
    for (var i = byteOffset + 2, entryCount = 0; entryCount < numDirEntries; i += 12, entryCount++) {
        var fieldTag = getBytes(2, i);
        var fieldType = getBytes(2, i + 2);
        var typeCount = getBytes(4, i + 4);
        var valueOffset = getBytes(4, i + 8);
        var fieldTagName = getFieldTagName(fieldTag);
        var fieldTypeName = getFieldTypeName(fieldType);
        var fieldValues = getFieldValues(fieldTagName, fieldTypeName, typeCount, valueOffset);
        tiffFields[fieldTagName] = { type: fieldTypeName, values: fieldValues };
    }
    fileDirectories.push(tiffFields);
    var nextIFDByteOffset = getBytes(4, i);
    if (nextIFDByteOffset === 0x00000000) {
        return fileDirectories;
    }
    else {
        return parseFileDirectory(nextIFDByteOffset);
    }
};
exports.parseTIFF = function (tiffArrayBuffer, _canvas) {
    var canvas = _canvas || document.createElement("canvas");
    if (!tiffArrayBuffer)
        return;
    tiffDataView = new DataView(tiffArrayBuffer);
    // canvas = _canvas;
    littleEndian = isLittleEndian(tiffDataView);
    if (!hasTowel(tiffDataView, littleEndian))
        return;
    var firstIFDByteOffset = getBytes(4, 4);
    fileDirectories = parseFileDirectory(firstIFDByteOffset);
    var fileDirectory = fileDirectories[0];
    var imageWidth = fileDirectory.ImageWidth.values[0];
    var imageLength = fileDirectory.ImageLength.values[0];
    canvas.width = imageWidth;
    canvas.height = imageLength;
    var strips = [];
    var compression = fileDirectory.Compression
        ? fileDirectory.Compression.values[0]
        : 1;
    var samplesPerPixel = fileDirectory.SamplesPerPixel.values[0];
    var sampleProperties = [];
    var bitsPerPixel = 0;
    var hasBytesPerPixel = false;
    fileDirectory.BitsPerSample.values.forEach(function (bitsPerSample, i, bitsPerSampleValues) {
        sampleProperties[i] = {
            bitsPerSample: bitsPerSample,
            hasBytesPerSample: false,
            bytesPerSample: undefined,
        };
        if (bitsPerSample % 8 === 0) {
            sampleProperties[i].hasBytesPerSample = true;
            sampleProperties[i].bytesPerSample = bitsPerSample / 8;
        }
        bitsPerPixel += bitsPerSample;
    }, _this);
    if (bitsPerPixel % 8 === 0) {
        hasBytesPerPixel = true;
        var bytesPerPixel = bitsPerPixel / 8;
    }
    var stripOffsetValues = fileDirectory.StripOffsets.values;
    var numStripOffsetValues = stripOffsetValues.length;
    // StripByteCounts is supposed to be required, but see if we can recover anyway.
    if (fileDirectory.StripByteCounts) {
        var stripByteCountValues = fileDirectory.StripByteCounts.values;
    }
    else {
        // Infer StripByteCounts, if possible.
        if (numStripOffsetValues === 1) {
            var stripByteCountValues = [
                Math.ceil((imageWidth * imageLength * bitsPerPixel) / 8),
            ];
        }
        else {
            throw Error("Cannot recover from missing StripByteCounts");
        }
    }
    // Loop through strips and decompress as necessary.
    for (var i = 0; i < numStripOffsetValues; i++) {
        var stripOffset = stripOffsetValues[i];
        strips[i] = [];
        var stripByteCount = stripByteCountValues[i];
        // Loop through pixels.
        for (var byteOffset = 0, bitOffset = 0, jIncrement = 1, getHeader = true, pixel = [], numBytes = 0, sample = 0, currentSample = 0; byteOffset < stripByteCount; byteOffset += jIncrement) {
            // Decompress strip.
            switch (compression) {
                // Uncompressed
                case 1:
                    // Loop through samples (sub-pixels).
                    for (var m = 0, pixel = []; m < samplesPerPixel; m++) {
                        if (sampleProperties[m].hasBytesPerSample) {
                            // XXX: This is wrong!
                            var sampleOffset = sampleProperties[m].bytesPerSample * m;
                            pixel.push(getBytes(sampleProperties[m].bytesPerSample, stripOffset + byteOffset + sampleOffset));
                        }
                        else {
                            var sampleInfo = getBits(sampleProperties[m].bitsPerSample, stripOffset + byteOffset, bitOffset);
                            pixel.push(sampleInfo.bits);
                            byteOffset = sampleInfo.byteOffset - stripOffset;
                            bitOffset = sampleInfo.bitOffset;
                            throw RangeError("Cannot handle sub-byte bits per sample");
                        }
                    }
                    strips[i].push(pixel);
                    if (hasBytesPerPixel) {
                        jIncrement = bytesPerPixel;
                    }
                    else {
                        jIncrement = 0;
                        throw RangeError("Cannot handle sub-byte bits per pixel");
                    }
                    break;
                // CITT Group 3 1-Dimensional Modified Huffman run-length encoding
                case 2:
                    // XXX: Use PDF.js code?
                    break;
                // Group 3 Fax
                case 3:
                    // XXX: Use PDF.js code?
                    break;
                // Group 4 Fax
                case 4:
                    // XXX: Use PDF.js code?
                    break;
                // LZW
                case 5:
                    // XXX: Use PDF.js code?
                    break;
                // Old-style JPEG (TIFF 6.0)
                case 6:
                    // XXX: Use PDF.js code?
                    break;
                // New-style JPEG (TIFF Specification Supplement 2)
                case 7:
                    // XXX: Use PDF.js code?
                    break;
                // PackBits
                case 32773:
                    // Are we ready for a new block?
                    if (getHeader) {
                        getHeader = false;
                        var blockLength = 1;
                        var iterations = 1;
                        // The header byte is signed.
                        var header = tiffDataView.getInt8(stripOffset + byteOffset, littleEndian);
                        if (header >= 0 && header <= 127) {
                            // Normal pixels.
                            blockLength = header + 1;
                        }
                        else if (header >= -127 && header <= -1) {
                            // Collapsed pixels.
                            iterations = -header + 1;
                        } /*if (header === -128)*/
                        else {
                            // Placeholder byte?
                            getHeader = true;
                        }
                    }
                    else {
                        var currentByte = getBytes(1, stripOffset + byteOffset);
                        // Duplicate bytes, if necessary.
                        for (var m = 0; m < iterations; m++) {
                            if (sampleProperties[sample].hasBytesPerSample) {
                                // We're reading one byte at a time, so we need to handle multi-byte samples.
                                currentSample = (currentSample << (8 * numBytes)) | currentByte;
                                numBytes++;
                                // Is our sample complete?
                                if (numBytes === sampleProperties[sample].bytesPerSample) {
                                    pixel.push(currentSample);
                                    currentSample = numBytes = 0;
                                    sample++;
                                }
                            }
                            else {
                                throw RangeError("Cannot handle sub-byte bits per sample");
                            }
                            // Is our pixel complete?
                            if (sample === samplesPerPixel) {
                                strips[i].push(pixel);
                                pixel = [];
                                sample = 0;
                            }
                        }
                        blockLength--;
                        // Is our block complete?
                        if (blockLength === 0) {
                            getHeader = true;
                        }
                    }
                    jIncrement = 1;
                    break;
                // Unknown compression algorithm
                default:
                    // Do not attempt to parse the image data.
                    break;
            }
        }
    }
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        // Set a default fill style.
        ctx.fillStyle = makeRGBAFillValue(255, 255, 255, 0);
        // If RowsPerStrip is missing, the whole image is in one strip.
        if (fileDirectory.RowsPerStrip) {
            var rowsPerStrip = fileDirectory.RowsPerStrip.values[0];
        }
        else {
            var rowsPerStrip = imageLength;
        }
        var numStrips = strips.length;
        var imageLengthModRowsPerStrip = imageLength % rowsPerStrip;
        var rowsInLastStrip = imageLengthModRowsPerStrip === 0
            ? rowsPerStrip
            : imageLengthModRowsPerStrip;
        var numRowsInStrip = rowsPerStrip;
        var numRowsInPreviousStrip = 0;
        var photometricInterpretation = fileDirectory.PhotometricInterpretation.values[0];
        var extraSamplesValues = [];
        var numExtraSamples = 0;
        if (fileDirectory.ExtraSamples) {
            extraSamplesValues = fileDirectory.ExtraSamples.values;
            numExtraSamples = extraSamplesValues.length;
        }
        if (fileDirectory.ColorMap) {
            var colorMapValues = fileDirectory.ColorMap.values;
            var colorMapSampleSize = Math.pow(2, sampleProperties[0].bitsPerSample);
        }
        // Loop through the strips in the image.
        for (var i = 0; i < numStrips; i++) {
            // The last strip may be short.
            if (i + 1 === numStrips) {
                numRowsInStrip = rowsInLastStrip;
            }
            var numPixels = strips[i].length;
            var yPadding = numRowsInPreviousStrip * i;
            // Loop through the rows in the strip.
            for (var y = 0, j = 0; y < numRowsInStrip, j < numPixels; y++) {
                // Loop through the pixels in the row.
                for (var x = 0; x < imageWidth; x++, j++) {
                    var pixelSamples = strips[i][j];
                    var red = 0;
                    var green = 0;
                    var blue = 0;
                    var opacity = 1.0;
                    if (numExtraSamples > 0) {
                        for (var k = 0; k < numExtraSamples; k++) {
                            if (extraSamplesValues[k] === 1 || extraSamplesValues[k] === 2) {
                                // Clamp opacity to the range [0,1].
                                opacity = pixelSamples[3 + k] / 256;
                                break;
                            }
                        }
                    }
                    switch (photometricInterpretation) {
                        // Bilevel or Grayscale
                        // WhiteIsZero
                        case 0:
                            if (sampleProperties[0].hasBytesPerSample) {
                                var invertValue = Math.pow(0x10, sampleProperties[0].bytesPerSample * 2);
                            }
                            // Invert samples.
                            pixelSamples.forEach(function (sample, index, samples) {
                                samples[index] = invertValue - sample;
                            });
                        // Bilevel or Grayscale
                        // BlackIsZero
                        case 1:
                            red = green = blue = clampColorSample(pixelSamples[0], sampleProperties[0].bitsPerSample);
                            break;
                        // RGB Full Color
                        case 2:
                            red = clampColorSample(pixelSamples[0], sampleProperties[0].bitsPerSample);
                            green = clampColorSample(pixelSamples[1], sampleProperties[1].bitsPerSample);
                            blue = clampColorSample(pixelSamples[2], sampleProperties[2].bitsPerSample);
                            break;
                        // RGB Color Palette
                        case 3:
                            if (colorMapValues === undefined) {
                                throw Error("Palette image missing color map");
                            }
                            var colorMapIndex = pixelSamples[0];
                            red = clampColorSample(colorMapValues[colorMapIndex], 16);
                            green = clampColorSample(colorMapValues[colorMapSampleSize + colorMapIndex], 16);
                            blue = clampColorSample(colorMapValues[2 * colorMapSampleSize + colorMapIndex], 16);
                            break;
                        // Transparency mask
                        case 4:
                            throw RangeError("Not Yet Implemented: Transparency mask");
                            break;
                        // CMYK
                        case 5:
                            throw RangeError("Not Yet Implemented: CMYK");
                            break;
                        // YCbCr
                        case 6:
                            throw RangeError("Not Yet Implemented: YCbCr");
                            break;
                        // CIELab
                        case 8:
                            throw RangeError("Not Yet Implemented: CIELab");
                            break;
                        // Unknown Photometric Interpretation
                        default:
                            throw RangeError("Unknown Photometric Interpretation:", photometricInterpretation);
                            break;
                    }
                    ctx.fillStyle = makeRGBAFillValue(red, green, blue, opacity);
                    ctx.fillRect(x, yPadding + y, 1, 1);
                }
            }
            numRowsInPreviousStrip = numRowsInStrip;
        }
    }
    return canvas;
};
