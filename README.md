# UI Components

跨平台 UI 组件系统 — 设计令牌共享，Web / React / React Native 三栈实现。

## 结构

```
packages/
├── tokens/          设计令牌 (色彩、字体、间距、阴影、圆角)
├── css/             Web 组件 (HTML + CSS)
├── react/           React 组件 (TypeScript)
└── react-native/    React Native 组件 (StyleSheet)
playground/          组件预览页面
```

## 快速开始

```bash
# 安装依赖
pnpm install

# 构建所有包
pnpm build

# 预览组件
open playground/index.html
```

## 设计令牌

所有组件共享统一的设计令牌系统：

| 令牌类型 | 文件 | 说明 |
|---------|------|------|
| 色彩 | `tokens/src/colors.ts` | Gray / Primary / Success / Warning / Error / Info 色阶 + 语义色 |
| 字体 | `tokens/src/typography.ts` | Inter 字体、9 级字号、4 种字重、5 种行高 |
| 间距 | `tokens/src/spacing.ts` | 4px 增量系统 (4→128px) + 语义间距 |
| 阴影 | `tokens/src/shadows.ts` | 3 级功能阴影 + 焦点环 |
| 圆角 | `tokens/src/radius.ts` | 6 级圆角 (0→pill) |
| 尺寸 | `tokens/src/sizes.ts` | sm / md / lg 组件尺寸预设 |
| 动效 | `tokens/src/animation.ts` | 4 级时长 + 3 种缓动曲线 |

## 组件列表

| 组件 | CSS | React | React Native | 分类 |
|------|-----|-------|--------------|------|
| Button | ✅ | ✅ | ✅ | 数据录入 |
| Input / Textarea | ✅ | ✅ | ✅ | 数据录入 |
| Checkbox | ✅ | ✅ | — | 数据录入 |
| Radio | ✅ | ✅ | — | 数据录入 |
| Switch | ✅ | ✅ | ✅ | 数据录入 |
| Select | ✅ | ✅ | — | 数据录入 |
| Slider | ✅ | ✅ | — | 数据录入 |
| Badge | ✅ | ✅ | ✅ | 数据展示 |
| Tag | ✅ | ✅ | — | 数据展示 |
| Avatar | ✅ | ✅ | ✅ | 数据展示 |
| Card | ✅ | ✅ | ✅ | 数据展示 |
| Table | ✅ | ✅ | — | 数据展示 |
| Accordion | ✅ | ✅ | — | 数据展示 |
| Empty | ✅ | ✅ | — | 数据展示 |
| Carousel | ✅ | ✅ | ✅ | 数据展示 |
| Menu | ✅ | ✅ | ✅ | 数据展示 |
| TreeView | ✅ | ✅ | ✅ | 数据展示 |
| DatePicker | ✅ | ✅ | ✅ | 数据展示 |
| Divider | ✅ | ✅ | — | 布局 |
| Stack | ✅ | ✅ | — | 布局 |
| Tabs | ✅ | ✅ | — | 导航 |
| Breadcrumb | ✅ | ✅ | — | 导航 |
| Pagination | ✅ | ✅ | — | 导航 |
| Alert | ✅ | ✅ | — | 反馈 |
| Progress | ✅ | ✅ | — | 反馈 |
| Skeleton | ✅ | ✅ | — | 反馈 |
| Modal | ✅ | ✅ | — | 浮层 |
| Toast | ✅ | ✅ | — | 浮层 |
| Tooltip | ✅ | ✅ | — | 浮层 |
| Drawer | ✅ | ✅ | — | 浮层 |

## 主题风格

组件系统内置 5 种主题，通过 `data-theme` 属性切换：

| 主题 | 属性值 | 说明 |
|------|--------|------|
| **Light** | `data-theme="light"` | 默认亮色主题 |
| **Dark** | `data-theme="dark"` | 暗色主题 |
| **Glass** | `data-theme="glass"` | 毛玻璃 — 半透明表面、backdrop-filter 模糊、渐变背景 |
| **Cyber** | `data-theme="cyber"` | 科技风 — 霓虹光效、HUD 美学、扫描线、终端字体 |
| **Sport** | `data-theme="sport"` | 运动风 — 暗底橙色主调、高能量、粗犷排版 |

```html
<!-- 切换主题 -->
<html data-theme="glass">
<html data-theme="cyber">
<html data-theme="sport">
```

## 使用方式

### CSS (Web)

```html
<link rel="stylesheet" href="packages/css/src/index.css">

<button class="ui-btn ui-btn--primary">Click me</button>
```

### React

```tsx
import { Button, Input, Card } from '@ui/react';
import '@ui/react/style.css';

function App() {
  return (
    <Card>
      <Input label="Name" placeholder="Enter name" />
      <Button variant="primary">Submit</Button>
    </Card>
  );
}
```

### React Native

```tsx
import { Button, Input, theme } from '@ui/react-native';

function App() {
  return (
    <>
      <Input label="Name" placeholder="Enter name" />
      <Button variant="primary">Submit</Button>
    </>
  );
}
```

## 主题切换

### CSS

```html
<!-- 暗色主题 -->
<html data-theme="dark">
```

### React Native

```tsx
import { darkColors, glassColors, cyberColors, sportColors } from '@ui/react-native';
// 将对应 colors 传入组件的 colors prop
```

## 设计规范

- 最小触摸目标: 44×44pt
- 对比度: 文本 ≥ 4.5:1 (WCAG AA)
- 间距: 4px 增量系统
- 动效: 150-300ms, ease-out 进入 / ease-in 退出
- 图标: 矢量 SVG，不使用 emoji
