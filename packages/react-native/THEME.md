# React Native 动态主题系统

支持运行时主题切换、嵌套主题覆盖、系统主题检测。

## 快速开始

```tsx
import { ThemeProvider, Button } from '@ui/react-native';

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <MyApp />
    </ThemeProvider>
  );
}
```

## 使用 useTheme

```tsx
import { useTheme } from '@ui/react-native';

function MyComponent() {
  const { theme, colors, setTheme } = useTheme();

  return (
    <View style={{ backgroundColor: colors.bg }}>
      <Text style={{ color: colors.textPrimary }}>Current: {theme}</Text>
      <Button onPress={() => setTheme('dark')}>
        Switch to Dark
      </Button>
    </View>
  );
}
```

## 主题切换

```tsx
const { setTheme } = useTheme();

// 切换到深色模式
setTheme('dark');

// 切换到浅色模式
setTheme('light');

// 跟随系统主题
setTheme('system');
```

## 嵌套主题覆盖

```tsx
<ThemeProvider defaultTheme="light">
  <App />
  
  {/* 某个区域使用深色主题 */}
  <ThemeProvider defaultTheme="dark">
    <DarkSection />
  </ThemeProvider>
  
  {/* 自定义颜色覆盖 */}
  <ThemeProvider colors={{ primary: '#ff0000' }}>
    <RedThemeSection />
  </ThemeProvider>
</ThemeProvider>
```

## 向后兼容

旧的 `theme.colors` 仍然可用：

```tsx
// 旧方式（仍支持）
import { theme } from '@ui/react-native';
<Button colors={theme.colors}>Old</Button>

// 新方式（推荐）
import { useTheme } from '@ui/react-native';
function Button() {
  const { colors } = useTheme();
  return <Button>New</Button>;
}
```

## API

### ThemeProvider

| 属性 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| defaultTheme | `'light' \| 'dark' \| 'system'` | `'system'` | 默认主题 |
| colors | `Partial<GeneratedThemeColors>` | - | 颜色覆盖 |

### useTheme

返回：

| 属性 | 类型 | 说明 |
|---|---|---|
| theme | `ThemeName` | 当前主题名称 |
| colors | `GeneratedThemeColors` | 当前主题颜色 |
| setTheme | `(theme: ThemeName) => void` | 切换主题函数 |
