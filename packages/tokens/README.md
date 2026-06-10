# @ui/tokens

Design tokens package for the UI component system. Provides shared TypeScript constants and CSS variables for colors, typography, spacing, shadows, and more.

## Installation

```bash
pnpm add @ui/tokens
```

## Usage

### TypeScript

```typescript
import { colors, typography, spacing } from '@ui/tokens';

console.log(colors.primary);     // '#6366f1'
console.log(typography.h1.fontSize);  // '2rem'
console.log(spacing.md);         // '1rem'
```

### CSS Variables

```css
@import '@ui/tokens/tokens.css';

.my-component {
  color: var(--color-primary);
  font-size: var(--font-size-lg);
  padding: var(--spacing-md);
}
```

## Available Tokens

### Colors

- `colors.primary` - Primary brand color
- `colors.secondary` - Secondary color
- `colors.success` - Success state color
- `colors.warning` - Warning state color
- `colors.error` - Error state color
- `colors.textPrimary` - Primary text color
- `colors.textSecondary` - Secondary text color
- `colors.surface` - Surface background
- `colors.border` - Border color

### Typography

- `typography.h1` - Heading 1
- `typography.h2` - Heading 2
- `typography.h3` - Heading 3
- `typography.body` - Body text
- `typography.small` - Small text

### Spacing

- `spacing.xs` - Extra small (4px)
- `spacing.sm` - Small (8px)
- `spacing.md` - Medium (16px)
- `spacing.lg` - Large (24px)
- `spacing.xl` - Extra large (32px)

### Shadows

- `shadows.sm` - Small shadow
- `shadows.md` - Medium shadow
- `shadows.lg` - Large shadow

### Border Radius

- `radii.sm` - Small radius (4px)
- `radii.md` - Medium radius (8px)
- `radii.lg` - Large radius (12px)
- `radii.full` - Full radius (9999px)

## Building

```bash
pnpm build
```

This generates CSS variables to `packages/css/src/styles/tokens.css`.

## Modifying Tokens

Edit files in `packages/tokens/src/`:

- `colors.ts` - Color definitions
- `typography.ts` - Font sizes and weights
- `spacing.ts` - Spacing values
- `shadows.ts` - Shadow definitions
- `radius.ts` - Border radius
- `animation.ts` - Animation durations and easings

Then rebuild:

```bash
pnpm build:tokens
```

## License

MIT
