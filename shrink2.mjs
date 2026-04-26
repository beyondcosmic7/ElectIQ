import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const dir = './public/images';
const files = fs.readdirSync(dir);

async function run() {
  for (const file of files) {
    const filePath = path.join(dir, file);
    const ext = path.extname(file).toLowerCase();
    
    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
      const tempPath = filePath + '.tmp';
      try {
        await sharp(filePath)
          .resize({ width: 400, withoutEnlargement: true })
          .webp({ quality: 20 }) // webp is best for low size
          .toFile(tempPath);
        fs.renameSync(tempPath, filePath); // keep the original extension so we don't have to refactor React paths
        console.log(`Squashed ${file}`);
      } catch (e) {
        console.log(`Error on ${file}:`, e.message);
      }
    }
  }
}

run();
