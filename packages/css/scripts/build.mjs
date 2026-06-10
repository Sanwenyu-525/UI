import { cpSync, mkdirSync, existsSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const src = join(import.meta.dirname, '..', 'src');
const dist = join(import.meta.dirname, '..', 'dist');

function copyDir(from, to) {
  if (!existsSync(to)) mkdirSync(to, { recursive: true });
  for (const entry of readdirSync(from)) {
    const srcPath = join(from, entry);
    const destPath = join(to, entry);
    if (statSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      cpSync(srcPath, destPath);
    }
  }
}

// Clean dist
if (existsSync(dist)) {
  cpSync(dist, dist); // noop, just ensure it exists
}

copyDir(src, dist);
console.log('✓ @ui/css built');
