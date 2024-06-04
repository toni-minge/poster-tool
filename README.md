# Poster Creation Tool

This Node.js tool processes images from an input folder, resizes them to fit within specified dimensions on a white background, and saves the output to an output folder with a "-poster" suffix added to each file name. The tool ensures that images are centered, and it includes options to make square posters for images that are close to being square.

## Features

- Resizes images to fit within specified dimensions on a white background.
- Adds a minimum border around images.
- Centers images within the poster dimensions.
- Handles both horizontal and vertical images by rotating dimensions if necessary.
- Option to create square posters for images that are close to square.
- Processes all images in the input folder and saves the results to the output folder with a "-poster" suffix.

## Requirements

- Node.js
- npm (Node Package Manager)

## Dependencies

- `sharp`: High-performance image processing library.

## Installation

1. Clone the repository or download the script files to your local machine.
2. Navigate to the project directory in your terminal.
3. Install the required dependencies by running:

   ```sh
   npm install sharp
   ```

## Usage

1. Place the images you want to process in the input folder.
2. Ensure the output folder exists or create it if necessary.
3. Modify the inputFolderPath, outputFolderPath, widthCm, heightCm, dpi, minBorderCm, and makeSquare variables in the createPoster.js script to match your requirements.
4. Run the script:

   ```sh
   node createPoster.js
   ```

## Example

Modify these variables in the script as needed:

    ```js
    const inputFolderPath = 'path/to/your/input/folder';
    const outputFolderPath = 'path/to/your/output/folder';
    const widthCm = 30;   // Poster width in cm
    const heightCm = 40;  // Poster height in cm
    const dpi = 300;      // Poster DPI
    const minBorderCm = 1; // Minimum border width in cm
    const makeSquare = true; // Option to make the poster square if the original is close to square
    ```

## Script Details

- cmToPixels(cm, dpi): Converts centimeters to pixels based on DPI.
- isHorizontal(metadata): Determines if an image is horizontal based on its metadata.
- isCloseToSquare(metadata, tolerance): Determines if an image is close to square within a given tolerance.
- createPoster(inputImagePath, outputImagePath, widthCm, heightCm, dpi, minBorderCm, makeSquare): Processes a single image and creates a poster with specified dimensions.
- processFolder(inputFolderPath, outputFolderPath, widthCm, heightCm, dpi, minBorderCm, makeSquare): Processes all images in the input folder and creates posters in the output folder.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

## Acknowledgments

sharp - High-performance image processing library used in this project.
