# @ui/css

Pure CSS component library powered by design tokens. Provides accessible, themeable UI components as CSS classes.

## Installation

```bash
pnpm add @ui/css
```

## Quick Start

```html
<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
  <link rel="stylesheet" href="@ui/css">
</head>
<body>
  <button class="ui-btn ui-btn--primary">Click me</button>
</body>
</html>
```

## Import Methods

### Full Bundle

```html
<link rel="stylesheet" href="@ui/css">
```

### Individual Components

```html
<link rel="stylesheet" href="@ui/css/components/button">
<link rel="stylesheet" href="@ui/css/components/input">
```

### With Tokens Only

```html
<link rel="stylesheet" href="@ui/css/tokens">
```

## Component List

### Forms
- `ui-btn` - Button with variants (primary, secondary, ghost, destructive)
- `ui-input` - Text input with prefix/suffix support
- `ui-textarea` - Multi-line text input
- `ui-select` - Custom select dropdown
- `ui-checkbox` - Checkbox with label
- `ui-radio` - Radio button with group support
- `ui-switch` - Toggle switch
- `ui-slider` - Range slider

### Data Display
- `ui-card` - Content container
- `ui-badge` - Status indicator
- `ui-avatar` - User avatar
- `ui-tag` - Closable tag
- `ui-table` - Data table
- `ui-skeleton` - Loading placeholder
- `ui-empty` - Empty state

### Feedback
- `ui-alert` - Alert message
- `ui-toast` - Toast notification
- `ui-progress` - Progress bar
- `ui-tooltip` - Tooltip hint

### Navigation
- `ui-tabs` - Tab navigation
- `ui-breadcrumb` - Breadcrumb trail
- `ui-menu` - Dropdown menu
- `ui-pagination` - Pagination controls
- `ui-steps` - Step indicator

### Layout
- `ui-stack` - Flex container
- `ui-divider` - Horizontal/vertical divider
- `ui-modal` - Modal dialog
- `ui-drawer` - Side drawer
- `ui-popover` - Popover content

### Data Entry
- `ui-datepicker` - Date picker
- `ui-timepicker` - Time picker
- `ui-calendar` - Calendar view
- `ui-upload` - File upload
- `ui-treeview` - Tree view

### Advanced
- `ui-accordion` - Collapsible sections
- `ui-carousel` - Image/content carousel
- `ui-timeline` - Timeline display

## Theming

Switch themes via `data-theme` attribute:

```html
<html data-theme="dark">
<html data-theme="glass">
<html data-theme="cyber">
```

Available themes:
- `light` (default)
- `dark`
- `glass` - Glassmorphism effect
- `cyber` - Futuristic style
- `sport` - Athletic look
- `high-contrast` - Accessibility
- `material` - Material Design
- `fluent` - Microsoft Fluent
- `retro` - Vintage style
- `neon` - Neon glow
- `pastel` - Soft colors

## Density

Control spacing via `data-density` attribute:

```html
<html data-density="compact">
<html data-density="comfortable">
<html data-density="spacious">
```

## Customization

Override CSS variables in your stylesheet:

```css
:root {
  --color-primary: #your-color;
  --spacing-md: 20px;
  --radius-lg: 16px;
}
```

## Component Structure

Each component follows this pattern:

```css
.ui-component { }           /* Base styles */
.ui-component--variant { }  /* Visual variant */
.ui-component--size { }     /* Size (sm, md, lg) */
.ui-component--state { }    /* State (hover, focus, disabled) */
.ui-component__element { }  /* Child element */
```

## Accessibility

- All interactive elements have proper ARIA attributes
- Focus states use `focus-visible` for keyboard navigation
- Color contrast meets WCAG 2.1 AA standards
- Components support screen readers

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Development

```bash
# Install dependencies
pnpm install

# Build
pnpm build

# Watch mode
pnpm dev
```

## License

MIT
