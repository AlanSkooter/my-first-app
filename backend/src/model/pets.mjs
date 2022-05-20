import path from 'path';
import fs from 'fs';
import formidable from 'formidable';

export const fetchAllPets = () => {
    let imagesPets = [];
    const frontendImagesPath = path.resolve(process.cwd(), './frontend/images/');
    const images = fs.readdirSync(frontendImagesPath);
    images.forEach((image) => {
        const ext = image.split('.')[1];
        if (ext == 'jpg' || ext == 'jpeg' || ext == 'png' || ext == 'gif' || ext == 'webp') {
            imagesPets.push(image);
        }
    });
    return imagesPets;
}

export const upload = () => {
    const form = formidable({
        uploadDir: `${process.cwd()}/frontend/images`,
        multiples: true,
        filename: ($, _, {originalFilename}) => `${originalFilename}`,
      });
      return form;
}