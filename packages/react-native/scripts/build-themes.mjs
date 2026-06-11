import { generateTokens } from '@ui/token-codegen';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const tokensSource = join(__dirname, '..', '..', 'tokens', 'src');
const outputDir = join(__dirname, '..', 'src', 'generated');

async function build() {
  console.log('⏳ Generating React Native themes...');

  await generateTokens({
    source: tokensSource,
    output: outputDir,
    generateThemes: true,
  });

  console.log('✓ React Native themes generated');
}

build().catch(console.error);
