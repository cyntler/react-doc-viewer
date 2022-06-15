export default function loadBinaryImage(binaryImage) {
    return new Promise(function (resolve) {
        var blob = new Blob([binaryImage], { type: "image/png" });
        var img = new Image();
        img.src = URL.createObjectURL(blob);
        img.onload = function () {
            resolve(img);
        };
    });
}
