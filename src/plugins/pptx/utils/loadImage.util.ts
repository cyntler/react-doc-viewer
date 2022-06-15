export default function loadBinaryImage(
  binaryImage: Buffer | ArrayBuffer
): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const blob = new Blob([binaryImage], { type: "image/png" });
    const img = new Image();
    img.src = URL.createObjectURL(blob);
    img.onload = () => {
      resolve(img);
    };
  });
}
