import fs from 'fs';
import path from 'path';
import url from 'url';

// helper function
export function streamToString(stream) {
  const buffers = [];
  stream.setEncoding('utf8');
  return new Promise((resolve, reject) => {
    stream.on('end', () => {
      resolve(buffers.join());
    });
    stream.on('data', chunk => {
      buffers.push(chunk);
    });
    stream.on('error', error => {
      reject(error);
    });
  });
}

export function getTestFileAsStream(testFilePath, options={}) {
  const cwd = path.dirname(url.fileURLToPath(import.meta.url));
  const p = path.join(cwd, './data', testFilePath);
  return fs.createReadStream(p, options);
}
