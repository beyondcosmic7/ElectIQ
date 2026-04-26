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
      console.log(`Shrinking ${file}...`);
      try {
        if (ext === '.png') {
          await sharp(filePath)
            .resize({ width: 600, withoutEnlargement: true })
            .png({ quality: 40, colors: 64 })
            .toFile(tempPath);
        } else {
          await sharp(filePath)
            .resize({ width: 600, withoutEnlargement: true })
            .jpeg({ quality: 40 })
            .toFile(tempPath);
        }
        fs.renameSync(tempPath, filePath);
        console.log(`Success: ${file}`);
      } catch (e) {
        console.log(`Error on ${file}:`, e.message);
      }
    }
    
    // Also try to compress the large Emble SVG by converting to compressed PNG?
    // Actually, svg compression? It's fine for now, SVG is 430KB, might need shrinking too.
  }
}

run();
