import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';

export interface ComponentClasses {
  name: string;
  classes: string[];
}

export function extractClassNames(cssContent: string): string[] {
  const classRegex = /\.([\w-]+(?:__[\w-]+)?(?:--[\w-]+)*)/g;
  const classes = new Set<string>();
  let match;

  while ((match = classRegex.exec(cssContent)) !== null) {
    classes.add(match[1]);
  }

  return Array.from(classes).sort();
}

export function extractComponentClasses(componentsDir: string): ComponentClasses[] {
  const components: ComponentClasses[] = [];

  for (const entry of readdirSync(componentsDir)) {
    const componentDir = join(componentsDir, entry);
    if (!statSync(componentDir).isDirectory()) continue;

    const cssFile = join(componentDir, 'index.css');
    if (!statSync(cssFile).exists()) continue;

    const cssContent = readFileSync(cssFile, 'utf-8');
    const classes = extractClassNames(cssContent);

    if (classes.length > 0) {
      components.push({
        name: entry,
        classes,
      });
    }
  }

  return components.sort((a, b) => a.name.localeCompare(b.name));
}

export function generateClassNameConstants(components: ComponentClasses[]): string {
  const lines: string[] = [];
  lines.push('// Auto-generated from CSS files — do not edit manually.');
  lines.push('// Run `pnpm build:css` to regenerate.');
  lines.push('');

  for (const component of components) {
    const constName = component.name.toUpperCase().replace(/-/g, '_');
    lines.push(`export const ${constName} = {`);

    for (const className of component.classes) {
      const key = className
        .replace(new RegExp(`^${component.name}`), 'base')
        .replace(/--/g, '_')
        .replace(/-/g, '_');

      lines.push(`  '${key}': '${className}',`);
    }

    lines.push('} as const;');
    lines.push('');
  }

  lines.push('export type ComponentClassName =');
  for (const component of components) {
    const constName = component.name.toUpperCase().replace(/-/g, '_');
    lines.push(`  | typeof ${constName}`);
  }
  lines.push(';');
  lines.push('');

  return lines.join('\n');
}

export function writeClassNamesFile(outputPath: string, content: string): void {
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, content);
}
