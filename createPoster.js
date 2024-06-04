const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Function to convert cm to pixels
const cmToPixels = (cm, dpi) => Math.round(cm * (dpi / 2.54));

// Function to determine if an image is horizontal or vertical
const isHorizontal = (metadata) => metadata.width > metadata.height;

// Function to determine if an image is close to square
const isCloseToSquare = (metadata, tolerance = 0.1) => {
  const aspectRatio = metadata.width / metadata.height;
  return Math.abs(aspectRatio - 1) <= tolerance;
};

const createPoster = async (
  inputImagePath,
  outputImagePath,
  widthCm,
  heightCm,
  dpi,
  minBorderCm
) => {
  try {
    const widthPx = cmToPixels(widthCm, dpi);
    const heightPx = cmToPixels(heightCm, dpi);
    const minBorderPx = cmToPixels(minBorderCm, dpi);

    const image = sharp(inputImagePath);
    const metadata = await image.metadata();

    const horizontal = isHorizontal(metadata);

    const shouldMakeSquare = isCloseToSquare(metadata);

    const finalWidthPx = shouldMakeSquare
      ? Math.min(widthPx, heightPx)
      : horizontal
      ? heightPx
      : widthPx;
    const finalHeightPx = shouldMakeSquare
      ? Math.min(widthPx, heightPx)
      : horizontal
      ? widthPx
      : heightPx;

    const maxWidth = finalWidthPx - 2 * minBorderPx;
    const maxHeight = finalHeightPx - 2 * minBorderPx;

    const scaleFactor = Math.min(maxWidth / metadata.width, maxHeight / metadata.height);

    const resizedImageBuffer = await image
      .resize(Math.round(metadata.width * scaleFactor), Math.round(metadata.height * scaleFactor))
      .toBuffer();
    const resizedImage = sharp(resizedImageBuffer);
    const resizedMetadata = await resizedImage.metadata();

    const background = sharp({
      create: {
        width: finalWidthPx,
        height: finalHeightPx,
        channels: 3,
        background: { r: 255, g: 255, b: 255 },
      },
    });

    const left = Math.round((finalWidthPx - resizedMetadata.width) / 2);
    const top = Math.round((finalHeightPx - resizedMetadata.height) / 2);

    await background
      .composite([{ input: resizedImageBuffer, left, top }])
      .toFormat('jpeg')
      .toFile(outputImagePath);

    console.log(`Poster created successfully: ${outputImagePath}`);
  } catch (error) {
    console.error('Error creating poster:', error);
  }
};

const processFolder = async (inputFolderPath, outputFolderPath, widthCm, heightCm, dpi) => {
  try {
    const files = fs.readdirSync(inputFolderPath);

    for (const file of files) {
      const inputFilePath = path.join(inputFolderPath, file);
      const fileName = path.parse(file).name;
      const outputFilePath = path.join(outputFolderPath, `${fileName}-poster.jpg`);

      await createPoster(inputFilePath, outputFilePath, widthCm, heightCm, dpi, minBorderCm);
    }
  } catch (error) {
    console.error('Error processing folder:', error);
  }
};

// Usage
const inputFolderPath = './input';
const outputFolderPath = './output';
const widthCm = 70; // Poster width in cm
const heightCm = 100; // Poster height in cm
const dpi = 300; // Poster DPI
const minBorderCm = 5; // Minimum border width in cm
const makeSquare = true;

processFolder(inputFolderPath, outputFolderPath, widthCm, heightCm, dpi, minBorderCm, makeSquare);
