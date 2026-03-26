import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = join(__dirname, 'seedData.js');
const lines = readFileSync(filePath, 'utf-8').split('\n');

let count = 0;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('image:')) {
    if (count < 5) {
      console.log(`LINE ${i}: ${JSON.stringify(lines[i])}`);
    }
    count++;
  }
}
console.log('Total image lines found:', count);
