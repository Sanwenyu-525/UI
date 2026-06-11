import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, statSync } from 'fs';
import { join, dirname, relative } from 'path';
import { fileURLToPath } from 'url';
import { generateTokens } from '@ui/token-codegen';
import postcss from 'postcss';
import postcssImport from 'postcss-import';
import postcssNested from 'postcss-nested';
import cssnano from 'cssnano';
import autoprefixer from 'autoprefixer';
import { extractComponentClasses, generateClassNameConstants, writeClassNamesFile } from './extract-classes.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const src = join(__dirname, '..', 'src');
const dist = join(__dirname, '..', 'dist');
const tokensSource = join(__dirname, '..', '..', 'tokens', 'src');
const tokensOutput = join(src, 'styles');

const postcssPlugins = [
  postcssImport(),
  postcssNested(),
  autoprefixer(),
  cssnano({ preset: 'default' }),
];

const args = process.argv.slice(2);
const minimalOnly = args.includes('--minimal');

async function build() {
  console.log('⏳ Generating tokens...');
  await generateTokens({
    source: tokensSource,
    output: tokensOutput,
    theme: 'both',
    generateThemes: true,
  });

  console.log('📦 Building CSS with PostCSS...');
  mkdirSync(dist, { recursive: true });

  // Build main index.css
  const indexCSS = readFileSync(join(src, 'index.css'), 'utf-8');
  const processedIndex = await postcss(postcssPlugins).process(indexCSS, {
    from: join(src, 'index.css'),
    to: join(dist, 'index.css'),
  });
  writeFileSync(join(dist, 'index.css'), processedIndex.css);
  console.log('  ✓ dist/index.css');

  // Build minimal.css
  const minimalCSS = readFileSync(join(src, 'minimal.css'), 'utf-8');
  const processedMinimal = await postcss(postcssPlugins).process(minimalCSS, {
    from: join(src, 'minimal.css'),
    to: join(dist, 'minimal.css'),
  });
  writeFileSync(join(dist, 'minimal.css'), processedMinimal.css);
  console.log('  ✓ dist/minimal.css');

  // Build theme files
  const themesDir = join(src, 'styles');
  for (const file of readdirSync(themesDir)) {
    if (file.startsWith('theme-') && file.endsWith('.css')) {
      const css = readFileSync(join(themesDir, file), 'utf-8');
      const result = await postcss(postcssPlugins).process(css, {
        from: join(themesDir, file),
        to: join(dist, 'styles', file),
      });
      writeFileSync(join(dist, 'styles', file), result.css);
      console.log(`  ✓ dist/styles/${file}`);
    }
  }

  // Build component CSS (individual files for tree-shaking)
  const componentsDir = join(src, 'components');
  for (const component of readdirSync(componentsDir)) {
    const componentDir = join(componentsDir, component);
    if (statSync(componentDir).isDirectory()) {
      const cssFile = join(componentDir, 'index.css');
      if (existsSync(cssFile)) {
        const css = readFileSync(cssFile, 'utf-8');
        const result = await postcss(postcssPlugins).process(css, {
          from: cssFile,
          to: join(dist, 'components', component, 'index.css'),
        });
        mkdirSync(join(dist, 'components', component), { recursive: true });
        writeFileSync(join(dist, 'components', component, 'index.css'), result.css);
      }
    }
  }
  console.log('  ✓ dist/components/*');

  // Copy base styles without processing (keep variables)
  for (const file of ['reset.css', 'base.css', 'density.css']) {
    const srcFile = join(src, 'styles', file);
    if (existsSync(srcFile)) {
      const css = readFileSync(srcFile, 'utf-8');
      mkdirSync(join(dist, 'styles'), { recursive: true });
      writeFileSync(join(dist, 'styles', file), css);
    }
  }
  console.log('  ✓ dist/styles/{reset,base,density}.css');

  // Generate TypeScript class name constants
  console.log('🏷️  Generating class name constants...');
  const components = extractComponentClasses(componentsDir);
  const classNamesContent = generateClassNameConstants(components);
  writeClassNamesFile(join(dist, 'class-names.ts'), classNamesContent);
  console.log(`  ✓ dist/class-names.ts (${components.length} components)`);

  // Report compression
  const originalSize = getDirSize(src);
  const distSize = getDirSize(dist);
  const savings = ((1 - distSize / originalSize) * 100).toFixed(1);
  console.log(`\n✓ @ui/css built (${savings}% smaller)`);
}

function getDirSize(dir) {
  let size = 0;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      size += getDirSize(path);
    } else {
      size += statSync(path).size;
    }
  }
  return size;
}

build().catch(console.error);


