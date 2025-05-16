import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, '..', 'data.json');

export function getEntries() {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('❌ Failed to read entries:', err.message);
    return [];
  }
}

export function saveEntries(entries) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(entries, null, 2));
  } catch (err) {
    console.error('❌ Failed to save entries:', err.message);
  }
}
