# @ui/react

React component library built on @ui/css. Provides accessible, themeable UI components as React components.

## Installation

```bash
pnpm add @ui/react
```

## Quick Start

```tsx
import { Button, Input, Card } from '@ui/react';
import '@ui/css';

function App() {
  return (
    <Card>
      <Input label="Email" placeholder="Enter email" />
      <Button variant="primary">Submit</Button>
    </Card>
  );
}
```

## Provider Setup

Wrap your app with the LocaleProvider for internationalization:

```tsx
import { LocaleProvider } from '@ui/react';

function App() {
  return (
    <LocaleProvider locale="en">
      {/* Your app */}
    </LocaleProvider>
  );
}
```

## Components

### Forms

#### Button

```tsx
import { Button } from '@ui/react';

<Button variant="primary" size="md" loading={false}>
  Click me
</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'ghost' | 'destructive'
- `size`: 'sm' | 'md' | 'lg'
- `loading`: boolean
- `block`: boolean (full width)
- `iconOnly`: boolean

#### Input

```tsx
import { Input } from '@ui/react';

<Input
  label="Email"
  type="email"
  placeholder="Enter email"
  error={false}
  helperText="We'll never share your email"
/>
```

**Props:**
- `size`: 'sm' | 'md' | 'lg'
- `error`: boolean
- `prefix`: ReactNode
- `suffix`: ReactNode
- `label`: string
- `helperText`: string
- `errorMessage`: string

#### Select

```tsx
import { Select } from '@ui/react';

<Select
  label="Choose option"
  options={[
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
  ]}
  value={selectedValue}
  onChange={handleChange}
/>
```

**Props:**
- `options`: SelectOption[]
- `value`: string (controlled)
- `defaultValue`: string (uncontrolled)
- `onChange`: (value: string) => void
- `placeholder`: string

#### Checkbox

```tsx
import { Checkbox } from '@ui/react';

<Checkbox
  label="I agree to terms"
  description="You must accept to continue"
  checked={isChecked}
  onChange={handleChange}
/>
```

#### Radio & RadioGroup

```tsx
import { Radio, RadioGroup } from '@ui/react';

<RadioGroup
  label="Choose one"
  name="option"
  value={selectedOption}
  onChange={setSelectedOption}
>
  <Radio value="1" label="Option 1" />
  <Radio value="2" label="Option 2" />
  <Radio value="3" label="Option 3" disabled />
</RadioGroup>
```

#### Switch

```tsx
import { Switch } from '@ui/react';

<Switch
  label="Enable notifications"
  description="Receive email updates"
  checked={isEnabled}
  onChange={handleChange}
/>
```

### Data Display

#### Card

```tsx
import { Card, CardHeader, CardBody, CardFooter } from '@ui/react';

<Card variant="elevated">
  <CardHeader>Title</CardHeader>
  <CardBody>Content goes here</CardBody>
  <CardFooter>
    <Button>Save</Button>
  </CardFooter>
</Card>
```

#### Badge

```tsx
import { Badge } from '@ui/react';

<Badge variant="success">Active</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="warning" size="lg">Warning</Badge>
```

#### Avatar

```tsx
import { Avatar } from '@ui/react';

<Avatar src="/photo.jpg" alt="User" size="lg" />
<Avatar name="John Doe" size="md" />
```

#### Table

```tsx
import { Table } from '@ui/react';

<Table
  columns={[
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
  ]}
  data={rows}
/>
```

### Feedback

#### Alert

```tsx
import { Alert } from '@ui/react';

<Alert variant="success" title="Success!">
  Your changes have been saved.
</Alert>
```

#### Toast

```tsx
import { useToast } from '@ui/react';

function App() {
  const { toast, ToastContainer } = useToast();

  return (
    <>
      <Button onClick={() => toast('Message sent', 'success')}>
        Send
      </Button>
      <ToastContainer position="top-right" />
    </>
  );
}
```

#### Progress

```tsx
import { Progress } from '@ui/react';

<Progress value={60} variant="primary" />
```

### Navigation

#### Tabs

```tsx
import { Tabs, Tab } from '@ui/react';

<Tabs defaultValue="tab1">
  <Tab label="Tab 1" value="tab1">Content 1</Tab>
  <Tab label="Tab 2" value="tab2">Content 2</Tab>
</Tabs>
```

#### Breadcrumb

```tsx
import { Breadcrumb } from '@ui/react';

<Breadcrumb
  items={[
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Current' },
  ]}
/>
```

### Layout

#### Modal

```tsx
import { Modal } from '@ui/react';

<Modal
  open={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm Action"
  size="md"
  footer={
    <>
      <Button onClick={() => setIsOpen(false)}>Cancel</Button>
      <Button variant="primary">Confirm</Button>
    </>
  }
>
  <p>Are you sure you want to proceed?</p>
</Modal>
```

#### Drawer

```tsx
import { Drawer } from '@ui/react';

<Drawer
  open={isOpen}
  onClose={() => setIsOpen(false)}
  title="Menu"
  position="left"
>
  {/* Navigation items */}
</Drawer>
```

#### Stack

```tsx
import { Stack } from '@ui/react';

<Stack direction="row" gap="md" align="center">
  <Button>Button 1</Button>
  <Button>Button 2</Button>
</Stack>
```

### Advanced

#### Accordion

```tsx
import { Accordion } from '@ui/react';

<Accordion>
  <Accordion.Item title="Section 1">
    Content 1
  </Accordion.Item>
  <Accordion.Item title="Section 2">
    Content 2
  </Accordion.Item>
</Accordion>
```

#### Carousel

```tsx
import { Carousel } from '@ui/react';

<Carousel
  slides={[
    { id: '1', content: <img src="slide1.jpg" /> },
    { id: '2', content: <img src="slide2.jpg" /> },
  ]}
  autoplay
  interval={5000}
/>
```

## Theming

### Theme Switching

```tsx
// HTML approach
<html data-theme="dark">

// React approach
<div data-theme="dark">
  <App />
</div>
```

### Custom Theme

```css
:root {
  --color-primary: #your-primary;
  --color-secondary: #your-secondary;
  --surface: #your-surface;
}
```

## Density

```tsx
// Compact
<html data-density="compact">

// Comfortable (default)
<html data-density="comfortable">

// Spacious
<html data-density="spacious">
```

## Accessibility

All components follow WCAG 2.1 guidelines:

- Proper ARIA attributes
- Keyboard navigation support
- Focus management
- Screen reader compatibility
- Color contrast compliance

## Ref Forwarding

All components support ref forwarding:

```tsx
import { useRef } from 'react';
import { Button } from '@ui/react';

function App() {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    buttonRef.current?.focus();
  };

  return <Button ref={buttonRef} onClick={handleClick}>Focus me</Button>;
}
```

## TypeScript Support

Full TypeScript support with exported types:

```tsx
import type {
  ButtonProps,
  ButtonVariant,
  ButtonSize,
  InputProps,
  SelectOption,
} from '@ui/react';
```

## Styling

### Using CSS Classes

```tsx
<Button className="my-custom-button">Click</Button>
```

### Inline Styles

```tsx
<Button style={{ margin: '10px' }}>Click</Button>
```

### CSS Modules

```tsx
import styles from './styles.module.css';

<Button className={styles.primary}>Click</Button>
```

## Bundle Size

- Base: ~15KB gzipped
- Each component: ~1-3KB gzipped
- Tree-shaking supported

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

# Type check
pnpm typecheck

# Watch mode
pnpm dev
```

## Testing

```bash
# Run tests
pnpm test

# Watch mode
pnpm test:watch

# Coverage
pnpm test:coverage
```

## License

MIT
