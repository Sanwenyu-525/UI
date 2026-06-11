import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import type { TokenConfig, ThemeColors } from './types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function generateTokens(config: TokenConfig): Promise<void> {
  const tokens = loadTokens(config.source);

  const lightCSS = generateCSSFromTheme(tokens.light, 'light');
  const darkCSS = generateCSSFromTheme(tokens.dark, 'dark');
  const combinedCSS = generateCombinedCSS(tokens.light, tokens.dark);

  mkdirSync(dirname(config.output), { recursive: true });

  writeFileSync(join(config.output, 'tokens-light.css'), lightCSS);
  writeFileSync(join(config.output, 'tokens-dark.css'), darkCSS);
  writeFileSync(join(config.output, 'tokens.css'), combinedCSS);

  generateTypeScriptTypes(config.output, tokens.light);

  if (config.generateThemes) {
    await generateThemeFiles(config);
  }

  console.log(`✓ Generated tokens: tokens-light.css, tokens-dark.css, tokens.css`);
}

async function generateThemeFiles(config: TokenConfig): Promise<void> {
  const themesPath = join(config.source, 'themes.ts');
  const themesContent = readFileSync(themesPath, 'utf-8');

  const themeNames = extractThemeNames(themesContent);
  const themeDataCache = new Map<string, Record<string, string>>();

  for (const themeName of themeNames) {
    const themeData = extractThemeData(themesContent, themeName);
    themeDataCache.set(themeName, themeData);
    const css = generateThemeCSS(themeName, themeData);
    writeFileSync(join(config.output, `theme-${themeName}.css`), css);
  }

  generateReactNativeThemes(config.output, themeDataCache, themeNames);

  console.log(`✓ Generated ${themeNames.length} theme files`);
}

function extractThemeNames(content: string): string[] {
  const themesMatch = content.match(/export const themes = \{([^}]+)\}/s);
  if (!themesMatch) return [];

  const names: string[] = [];
  const regex = /(\w+):\s*\w+Theme/g;
  let match;
  while ((match = regex.exec(themesMatch[1])) !== null) {
    names.push(match[1]);
  }
  return names;
}

function extractThemeData(content: string, themeName: string): Record<string, string> {
  const themeMatch = content.match(new RegExp(`export const ${themeName}Theme: ThemeDefinition = \\{([^}]+)\\}`, 's'));
  if (!themeMatch) return {};

  const data: Record<string, string> = {};
  const lines = themeMatch[1].split('\n');

  lines.forEach(line => {
    const match = line.match(/^\s*(\w+):\s*['"]([^'"]+)['"]/);
    if (match) {
      data[match[1]] = match[2];
    } else {
      const varMatch = line.match(/^\s*(\w+):\s*(\w+)\[(\d+)\]/);
      if (varMatch) {
        data[varMatch[1]] = `var(--${varMatch[2]}-${varMatch[3]})`;
      }
    }
  });

  return data;
}

function generateThemeCSS(themeName: string, data: Record<string, string>): string {
  const lines: string[] = [];
  lines.push(`/* ─── ${themeName.charAt(0).toUpperCase() + themeName.slice(1)} Theme ─── */`);
  lines.push(`/* Auto-generated from @ui/tokens — do not edit manually. */`);
  lines.push(`/* Apply: <html data-theme="${themeName}"> */`);
  lines.push('');
  lines.push(`[data-theme="${themeName}"] {`);

  const sections: Record<string, string[]> = {
    'Backgrounds': ['bg', 'bgSubtle', 'bgMuted'],
    'Surfaces': ['surface', 'surfaceElevated', 'surfaceOverlay'],
    'Text': ['textPrimary', 'textSecondary', 'textTertiary', 'textInverse', 'textOnPrimary'],
    'Borders': ['border', 'borderStrong'],
    'Interactive': ['primary', 'primaryHover', 'primaryActive'],
    'Semantic': ['success', 'warning', 'error', 'info'],
    'Focus': ['ring'],
  };

  Object.entries(sections).forEach(([section, keys]) => {
    lines.push(`  /* ── ${section} ── */`);
    keys.forEach(key => {
      if (data[key]) {
        const cssVar = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        lines.push(`  --${cssVar}: ${data[key]};`);
      }
    });
    lines.push('');
  });

  lines.push('}');
  lines.push('');

  return lines.join('\n');
}

function generateReactNativeThemes(outputPath: string, themeDataCache: Map<string, Record<string, string>>, themeNames: string[]): void {
  const lines: string[] = [];
  lines.push('// Auto-generated from @ui/tokens — do not edit manually.');
  lines.push('');
  lines.push("import { gray, primary, success, warning, error, info } from '@ui/tokens/colors';");
  lines.push('');
  lines.push('export interface ThemeColors {');
  lines.push('  bg: string;');
  lines.push('  bgSubtle: string;');
  lines.push('  bgMuted: string;');
  lines.push('  surface: string;');
  lines.push('  surfaceElevated: string;');
  lines.push('  textPrimary: string;');
  lines.push('  textSecondary: string;');
  lines.push('  textTertiary: string;');
  lines.push('  textInverse: string;');
  lines.push('  textOnPrimary: string;');
  lines.push('  border: string;');
  lines.push('  borderStrong: string;');
  lines.push('  primary: string;');
  lines.push('  primaryHover: string;');
  lines.push('  primaryActive: string;');
  lines.push('  success: string;');
  lines.push('  warning: string;');
  lines.push('  error: string;');
  lines.push('  info: string;');
  lines.push('  ring: string;');
  lines.push('}');
  lines.push('');

  themeNames.forEach(themeName => {
    const themeData = themeDataCache.get(themeName) || {};
    lines.push(`export const ${themeName}Colors: ThemeColors = {`);

    Object.entries(themeData).forEach(([key, value]) => {
      lines.push(`  ${key}: '${value}',`);
    });

    lines.push('};');
    lines.push('');
  });

  writeFileSync(join(outputPath, 'themes.ts'), lines.join('\n'));
}

function loadTokens(sourcePath: string) {
  const colorsPath = join(sourcePath, 'colors.ts');
  const spacingPath = join(sourcePath, 'spacing.ts');
  const typographyPath = join(sourcePath, 'typography.ts');
  const shadowsPath = join(sourcePath, 'shadows.ts');
  const radiusPath = join(sourcePath, 'radius.ts');
  const sizesPath = join(sourcePath, 'sizes.ts');
  const animationPath = join(sourcePath, 'animation.ts');

  const colorsContent = readFileSync(colorsPath, 'utf-8');
  const spacingContent = readFileSync(spacingPath, 'utf-8');
  const typographyContent = readFileSync(typographyPath, 'utf-8');
  const shadowsContent = readFileSync(shadowsPath, 'utf-8');
  const radiusContent = readFileSync(radiusPath, 'utf-8');
  const sizesContent = readFileSync(sizesPath, 'utf-8');
  const animationContent = readFileSync(animationPath, 'utf-8');

  const light: ThemeColors = {};
  const dark: ThemeColors = {};

  extractColorTokens(colorsContent, light, dark);
  extractSpacingTokens(spacingContent, light);
  extractTypographyTokens(typographyContent, light);
  extractShadowTokens(shadowsContent, light);
  extractRadiusTokens(radiusContent, light);
  extractSizeTokens(sizesContent, light);
  extractAnimationTokens(animationContent, light);

  Object.keys(light).forEach(key => {
    if (!(key in dark)) {
      dark[key] = light[key];
    }
  });

  return { light, dark };
}

function extractColorTokens(content: string, light: ThemeColors, dark: ThemeColors) {
  const grayMatch = content.match(/export const gray = \{([^}]+)\}/s);
  if (grayMatch) {
    const entries = parseObjectEntries(grayMatch[1]);
    entries.forEach(([key, value]) => {
      light[`gray-${key}`] = value;
      dark[`gray-${key}`] = value;
    });
  }

  const primaryMatch = content.match(/export const primary = \{([^}]+)\}/s);
  if (primaryMatch) {
    const entries = parseObjectEntries(primaryMatch[1]);
    entries.forEach(([key, value]) => {
      light[`primary-${key}`] = value;
      dark[`primary-${key}`] = value;
    });
  }

  const semanticColors = ['success', 'warning', 'error', 'info'];
  semanticColors.forEach(colorName => {
    const match = content.match(new RegExp(`export const ${colorName} = \\{([^}]+)\\}`, 's'));
    if (match) {
      const entries = parseObjectEntries(match[1]);
      entries.forEach(([key, value]) => {
        light[`${colorName}-${key}`] = value;
        dark[`${colorName}-${key}`] = value;
      });
    }
  });

  const lightMatch = content.match(/export const light = \{([^}]+)\}/s);
  if (lightMatch) {
    const entries = parseObjectEntries(lightMatch[1]);
    entries.forEach(([key, value]) => {
      light[key] = value;
    });
  }

  const darkMatch = content.match(/export const dark = \{([^}]+)\}/s);
  if (darkMatch) {
    const entries = parseObjectEntries(darkMatch[1]);
    entries.forEach(([key, value]) => {
      dark[key] = value;
    });
  }
}

function extractTokenGroup(content: string, varName: string, keyPrefix: string, tokens: ThemeColors) {
  const match = content.match(new RegExp(`export const ${varName} = \\{([^}]+)\\}`, 's'));
  if (match) {
    const entries = parseObjectEntries(match[1]);
    entries.forEach(([key, value]) => {
      tokens[`${keyPrefix}-${key}`] = value;
    });
  }
}

function extractSpacingTokens(content: string, tokens: ThemeColors) {
  extractTokenGroup(content, 'spacing', 'spacing', tokens);
  extractTokenGroup(content, 'layout', 'layout', tokens);
}

function extractTypographyTokens(content: string, tokens: ThemeColors) {
  extractTokenGroup(content, 'fontSize', 'font-size', tokens);
  extractTokenGroup(content, 'fontWeight', 'font-weight', tokens);
  extractTokenGroup(content, 'lineHeight', 'line-height', tokens);
  extractTokenGroup(content, 'fontFamily', 'font-family', tokens);
}

function extractShadowTokens(content: string, tokens: ThemeColors) {
  extractTokenGroup(content, 'shadow', 'shadow', tokens);
}

function extractRadiusTokens(content: string, tokens: ThemeColors) {
  extractTokenGroup(content, 'radius', 'radius', tokens);
}

function extractSizeTokens(content: string, tokens: ThemeColors) {
  extractTokenGroup(content, 'componentSize', 'size', tokens);
}

function extractAnimationTokens(content: string, tokens: ThemeColors) {
  const durationMatch = content.match(/duration:\s*\{([^}]+)\}/s);
  if (durationMatch) {
    const entries = parseObjectEntries(durationMatch[1]);
    entries.forEach(([key, value]) => {
      tokens[`duration-${key}`] = value;
    });
  }

  const easingMatch = content.match(/easing:\s*\{([^}]+)\}/s);
  if (easingMatch) {
    const entries = parseObjectEntries(easingMatch[1]);
    entries.forEach(([key, value]) => {
      tokens[`easing-${key}`] = value;
    });
  }
}

function parseObjectEntries(content: string): [string, string][] {
  const entries: [string, string][] = [];
  const lines = content.split('\n');

  lines.forEach(line => {
    const match = line.match(/^\s*(\w+):\s*['"]([^'"]+)['"]/);
    if (match) {
      entries.push([match[1], match[2]]);
    }
  });

  return entries;
}

function generateCSSFromTheme(tokens: ThemeColors, themeName: string): string {
  const lines: string[] = [];
  lines.push(`/* ─── ${themeName.charAt(0).toUpperCase() + themeName.slice(1)} Theme Tokens ─── */`);
  lines.push(`/* Auto-generated from @ui/tokens — do not edit manually. */`);
  lines.push('');
  lines.push(':root {');

  const sortedKeys = Object.keys(tokens).sort();
  let currentSection = '';

  sortedKeys.forEach(key => {
    const section = key.split('-')[0];
    if (section !== currentSection) {
      if (currentSection) {
        lines.push('');
      }
      lines.push(`  /* ── ${section.charAt(0).toUpperCase() + section.slice(1)} ── */`);
      currentSection = section;
    }
    lines.push(`  --${key}: ${tokens[key]};`);
  });

  lines.push('}');
  lines.push('');

  return lines.join('\n');
}

function generateCombinedCSS(lightTokens: ThemeColors, darkTokens: ThemeColors): string {
  const lines: string[] = [];
  lines.push('/* ─── Combined Theme Tokens ─── */');
  lines.push('/* Auto-generated from @ui/tokens — do not edit manually. */');
  lines.push('');
  lines.push('/* Light theme (default) */');
  lines.push(generateCSSFromTheme(lightTokens, 'light'));
  lines.push('');
  lines.push('/* Dark theme */');
  lines.push('[data-theme="dark"] {');
  Object.keys(darkTokens).sort().forEach(key => {
    lines.push(`  --${key}: ${darkTokens[key]};`);
  });
  lines.push('}');
  lines.push('');

  return lines.join('\n');
}

function generateTypeScriptTypes(outputPath: string, tokens: ThemeColors) {
  const lines: string[] = [];
  lines.push('// Auto-generated from @ui/tokens — do not edit manually.');
  lines.push('');
  lines.push('export const CSS_TOKENS = {');

  Object.keys(tokens).sort().forEach(key => {
    lines.push(`  '${key}': '--${key}',`);
  });

  lines.push('} as const;');
  lines.push('');
  lines.push('export type CSSToken = keyof typeof CSS_TOKENS;');
  lines.push('');

  writeFileSync(join(outputPath, 'token-variables.ts'), lines.join('\n'));
  console.log('✓ Generated token-variables.ts');
}
