import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import type { TokenConfig, TokenValue, ThemeColors } from './types.js';

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

  console.log(`✓ Generated tokens: tokens-light.css, tokens-dark.css, tokens.css`);
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

function extractSpacingTokens(content: string, tokens: ThemeColors) {
  const match = content.match(/export const spacing = \{([^}]+)\}/s);
  if (match) {
    const entries = parseObjectEntries(match[1]);
    entries.forEach(([key, value]) => {
      tokens[`spacing-${key}`] = value;
    });
  }

  const layoutMatch = content.match(/export const layout = \{([^}]+)\}/s);
  if (layoutMatch) {
    const entries = parseObjectEntries(layoutMatch[1]);
    entries.forEach(([key, value]) => {
      tokens[`layout-${key}`] = value;
    });
  }
}

function extractTypographyTokens(content: string, tokens: ThemeColors) {
  const fontSizesMatch = content.match(/export const fontSize = \{([^}]+)\}/s);
  if (fontSizesMatch) {
    const entries = parseObjectEntries(fontSizesMatch[1]);
    entries.forEach(([key, value]) => {
      tokens[`font-size-${key}`] = value;
    });
  }

  const fontWeightsMatch = content.match(/export const fontWeight = \{([^}]+)\}/s);
  if (fontWeightsMatch) {
    const entries = parseObjectEntries(fontWeightsMatch[1]);
    entries.forEach(([key, value]) => {
      tokens[`font-weight-${key}`] = value;
    });
  }

  const lineHeightsMatch = content.match(/export const lineHeight = \{([^}]+)\}/s);
  if (lineHeightsMatch) {
    const entries = parseObjectEntries(lineHeightsMatch[1]);
    entries.forEach(([key, value]) => {
      tokens[`line-height-${key}`] = value;
    });
  }

  const fontFamilyMatch = content.match(/export const fontFamily = \{([^}]+)\}/s);
  if (fontFamilyMatch) {
    const entries = parseObjectEntries(fontFamilyMatch[1]);
    entries.forEach(([key, value]) => {
      tokens[`font-family-${key}`] = value;
    });
  }
}

function extractShadowTokens(content: string, tokens: ThemeColors) {
  const match = content.match(/export const shadow = \{([^}]+)\}/s);
  if (match) {
    const entries = parseObjectEntries(match[1]);
    entries.forEach(([key, value]) => {
      tokens[`shadow-${key}`] = value;
    });
  }
}

function extractRadiusTokens(content: string, tokens: ThemeColors) {
  const match = content.match(/export const radius = \{([^}]+)\}/s);
  if (match) {
    const entries = parseObjectEntries(match[1]);
    entries.forEach(([key, value]) => {
      tokens[`radius-${key}`] = value;
    });
  }
}

function extractSizeTokens(content: string, tokens: ThemeColors) {
  const match = content.match(/export const componentSize = \{([^}]+)\}/s);
  if (match) {
    const entries = parseObjectEntries(match[1]);
    entries.forEach(([key, value]) => {
      tokens[`size-${key}`] = value;
    });
  }
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
