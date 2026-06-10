import { generateTokens } from './index.js';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { existsSync, readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const testSource = join(__dirname, '..', '..', 'tokens', 'src');
const testOutput = join(__dirname, 'test-output');

async function test() {
  console.log('🧪 Testing token codegen...\n');

  console.log('Source:', testSource);
  console.log('Output:', testOutput);
  console.log('');

  try {
    await generateTokens({
      source: testSource,
      output: testOutput,
      theme: 'both',
    });

    console.log('\n✓ Generation completed\n');

    // Verify files exist
    const files = ['tokens-light.css', 'tokens-dark.css', 'tokens.css', 'token-variables.ts'];
    for (const file of files) {
      const path = join(testOutput, file);
      if (existsSync(path)) {
        console.log(`✓ ${file} exists`);
        const content = readFileSync(path, 'utf-8');
        const lines = content.split('\n').length;
        console.log(`  (${lines} lines)`);
      } else {
        console.log(`✗ ${file} missing`);
      }
    }

    // Show sample output
    console.log('\n--- Sample CSS (tokens-light.css) ---\n');
    const lightCSS = readFileSync(join(testOutput, 'tokens-light.css'), 'utf-8');
    console.log(lightCSS.slice(0, 500) + '...\n');

    console.log('--- Sample TypeScript (token-variables.ts) ---\n');
    const types = readFileSync(join(testOutput, 'token-variables.ts'), 'utf-8');
    console.log(types.slice(0, 500) + '...\n');

    console.log('✅ All tests passed!');
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

test();
