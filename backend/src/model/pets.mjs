import path from 'path';
import fs from 'fs';
import formidable from 'formidable';
import sharp from 'sharp';

export const fetchAllPets = () => {
    let imagesPets = [];
    const frontendImagesPath = path.resolve(process.cwd(), './frontend/images/original/');
    const images = fs.readdirSync(frontendImagesPath);
    images.forEach((image) => {
        const ext = image.split('.')[1];
        if (ext == 'jpg' || ext == 'jpeg' || ext == 'png' || ext == 'gif' || ext == 'webp') {
            imagesPets.push(image);
        }
    });
    imagesPets.forEach((imageName) => {
        const image = fs.readFileSync(path.resolve(process.cwd(), './frontend/images/original/', imageName));
        sharp(image)
        .resize(1000, 600)
        .toFile(path.resolve(process.cwd(), './frontend/images/', imageName));
    });
    return imagesPets;
}

export const upload = () => {
    const form = formidable({
        uploadDir: `${process.cwd()}/frontend/images/original`,
        multiples: true,
        filename: ($, _, {originalFilename}) => `${originalFilename}`,
      });
      return form;
}