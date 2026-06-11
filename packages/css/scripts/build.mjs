import { cpSync, mkdirSync, existsSync, readdirSync, statSync } from 'fs';
import { join } from 'path';
import { generateTokens } from '@ui/token-codegen';

const src = join(import.meta.dirname, '..', 'src');
const dist = join(import.meta.dirname, '..', 'dist');
const tokensSource = join(import.meta.dirname, '..', '..', 'tokens', 'src');
const tokensOutput = join(src, 'styles');

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

async function build() {
  console.log('⏳ Generating tokens...');
  await generateTokens({
    source: tokensSource,
    output: tokensOutput,
    theme: 'both',
    generateThemes: true,
  });

  console.log('📦 Copying files to dist...');
  copyDir(src, dist);

  console.log('✓ @ui/css built');
}

build().catch(console.error);
