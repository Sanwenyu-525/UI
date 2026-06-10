# @ui/token-codegen

Design token code generator for the UI component system. Reads TypeScript token definitions and generates CSS custom properties.

## Usage

```typescript
import { generateTokens } from '@ui/token-codegen';

await generateTokens({
  source: '../tokens/src',
  output: './src/styles',
  theme: 'both',
});
```

## Generated Files

- `tokens-light.css` — Light theme tokens
- `tokens-dark.css` — Dark theme tokens
- `tokens.css` — Combined (light default, dark via `[data-theme="dark"]`)
- `token-variables.ts` — TypeScript type definitions

## Integration

This package is integrated into `@ui/css`'s build process. When you run `pnpm build:css`, tokens are automatically generated from `@ui/tokens/src/`.

## Token Mapping

| Source File | Generated Variable | Example |
|---|---|---|
| `colors.ts` | `--{name}` | `--gray-500: #6b7280;` |
| `spacing.ts` | `--spacing-{key}` | `--spacing-4: 1rem;` |
| `typography.ts` | `--font-size-{key}` | `--font-size-sm: 0.875rem;` |
| `shadows.ts` | `--shadow-{key}` | `--shadow-md: 0 4px 6px ...;` |
| `radius.ts` | `--radius-{key}` | `--radius-md: 0.5rem;` |
| `sizes.ts` | `--size-{key}` | `--size-md: 2.5rem;` |
| `animation.ts` | `--duration-{key}` | `--duration-normal: 200ms;` |
