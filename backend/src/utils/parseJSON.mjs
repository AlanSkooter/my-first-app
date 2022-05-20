import { createReadStream } from 'fs';

export const readJSONAsync = (path) =>
  new Promise((resolve) => {
    const readStream = createReadStream(path);
    let result = '';
    readStream
      .on('data', (chunk) => {
        result += chunk.toString();
      })
      .on('end', (chunk) => {
        if (!result) {
          resolve([]);
        } else {
          resolve(JSON.parse(result));
        }
      });
  });