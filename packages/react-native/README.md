# @ui/react-native

React Native component library built on @ui/tokens. Provides cross-platform UI components with native styling.

## Installation

```bash
pnpm add @ui/react-native
```

## Quick Start

```tsx
import { Button, Input, Card } from '@ui/react-native';

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

No provider needed - components use the built-in theme system.

## Theme System

Components use the built-in theme with customizable colors:

```tsx
import { theme, lightColors, darkColors } from '@ui/react-native';

// Use default theme
<Button variant="primary">Click</Button>

// Custom colors
<Button colors={darkColors}>Dark Button</Button>

// Override theme
const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    primary: '#ff0000',
  },
};
```

## Components

### Forms

#### Button

```tsx
import { Button } from '@ui/react-native';

<Button variant="primary" size="md" loading={false}>
  Click me
</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'ghost' | 'destructive'
- `size`: 'sm' | 'md' | 'lg'
- `loading`: boolean
- `block`: boolean (full width)
- `colors`: ThemeColors

#### Input

```tsx
import { Input } from '@ui/react-native';

<Input
  label="Email"
  placeholder="Enter email"
  value={value}
  onChangeText={setValue}
/>
```

**Props:**
- `size`: 'sm' | 'md' | 'lg'
- `label`: string
- `value`: string
- `onChangeText`: (text: string) => void

#### Select

```tsx
import { Select } from '@ui/react-native';

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

#### Switch

```tsx
import { Switch } from '@ui/react-native';

<Switch
  label="Enable notifications"
  value={isEnabled}
  onValueChange={setIsEnabled}
/>
```

### Data Display

#### Card

```tsx
import { Card, CardHeader, CardBody, CardFooter } from '@ui/react-native';

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
import { Badge } from '@ui/react-native';

<Badge variant="success">Active</Badge>
<Badge variant="error">Error</Badge>
```

#### Avatar

```tsx
import { Avatar } from '@ui/react-native';

<Avatar src="https://example.com/photo.jpg" size="lg" />
<Avatar name="John Doe" size="md" />
```

### Navigation

#### Menu

```tsx
import { Menu } from '@ui/react-native';

<Menu
  trigger={<Button>Menu</Button>}
  items={[
    { label: 'Profile', onPress: () => {} },
    { label: 'Settings', onPress: () => {} },
    { divider: true },
    { label: 'Logout', onPress: () => {}, destructive: true },
  ]}
/>
```

#### Tabs

```tsx
import { Tabs } from '@ui/react-native';

<Tabs
  tabs={[
    { key: 'tab1', label: 'Tab 1' },
    { key: 'tab2', label: 'Tab 2' },
  ]}
  activeTab={activeTab}
  onChange={setActiveTab}
>
  {activeTab === 'tab1' && <Tab1 />}
  {activeTab === 'tab2' && <Tab2 />}
</Tabs>
```

### Feedback

#### Toast

```tsx
import { useToast } from '@ui/react-native';

function App() {
  const { toast, ToastContainer } = useToast();

  return (
    <>
      <Button onPress={() => toast('Message sent', 'success')}>
        Send
      </Button>
      <ToastContainer position="top-right" />
    </>
  );
}
```

#### Progress

```tsx
import { Progress } from '@ui/react-native';

<Progress value={60} variant="primary" />
```

### Layout

#### Modal

```tsx
import { Modal } from '@ui/react-native';

<Modal
  open={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm Action"
  size="md"
  footer={
    <>
      <Button onPress={() => setIsOpen(false)}>Cancel</Button>
      <Button variant="primary">Confirm</Button>
    </>
  }
>
  <Text>Are you sure you want to proceed?</Text>
</Modal>
```

#### Tooltip

```tsx
import { Tooltip } from '@ui/react-native';

<Tooltip content="Helpful hint" position="top">
  <Button>Hover me</Button>
</Tooltip>
```

### Data Entry

#### DatePicker

```tsx
import { DatePicker } from '@ui/react-native';

<DatePicker
  value={date}
  onChange={setDate}
  placeholder="Select date"
/>
```

### Advanced

#### Carousel

```tsx
import { Carousel } from '@ui/react-native';

<Carousel
  slides={[
    { id: '1', content: <Image source={require('./slide1.jpg')} /> },
    { id: '2', content: <Image source={require('./slide2.jpg')} /> },
  ]}
  autoplay
  interval={5000}
/>
```

#### TreeView

```tsx
import { TreeView } from '@ui/react-native';

<TreeView
  data={[
    {
      id: '1',
      label: 'Parent',
      children: [
        { id: '1-1', label: 'Child 1' },
        { id: '1-2', label: 'Child 2' },
      ],
    },
  ]}
  onSelect={handleSelect}
/>
```

## Accessibility

All components provide native accessibility support:

- `accessibilityRole` for semantic meaning
- `accessibilityState` for current state
- `accessibilityLabel` for screen readers
- `accessibilityHint` for additional context

Example:

```tsx
<Button
  accessibilityRole="button"
  accessibilityLabel="Submit form"
  accessibilityHint="Submits the form and navigates to confirmation"
>
  Submit
</Button>
```

## Platform-Specific Styling

Components adapt to platform conventions:

```tsx
// iOS-style button
<Button variant="primary" style={Platform.select({
  ios: { borderRadius: 8 },
  android: { borderRadius: 4 },
})}>
  Platform Button
</Button>
```

## Theming

### Custom Colors

```tsx
import { theme } from '@ui/react-native';

const customColors = {
  ...theme.colors,
  primary: '#ff6b6b',
  secondary: '#4ecdc4',
};

<Button colors={customColors}>Custom Button</Button>
```

### Dark Mode

```tsx
import { useColorScheme } from 'react-native';
import { darkColors, lightColors } from '@ui/react-native';

function App() {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? darkColors : lightColors;

  return <Button colors={colors}>Theme Button</Button>;
}
```

## TypeScript Support

Full TypeScript support with exported types:

```tsx
import type {
  ButtonProps,
  ButtonVariant,
  ButtonSize,
  ThemeColors,
  SelectOption,
} from '@ui/react-native';
```

## Performance

- Uses React Native's StyleSheet for optimized styling
- Memoized components where beneficial
- Minimal re-renders with proper state management

## Platform Support

- iOS 13+
- Android 6.0+ (API 23+)
- Web (React Native Web)

## Development

```bash
# Install dependencies
pnpm install

# Type check
pnpm typecheck
```

## Testing

Tests are recommended but not included in this package. Use React Native Testing Library:

```bash
pnpm add -D @testing-library/react-native
```

## License

MIT
