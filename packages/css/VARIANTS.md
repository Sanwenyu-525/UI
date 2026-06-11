# 视觉变体系统

共享的视觉变体工具类，可应用于任何组件。

## 问题

多个组件重复定义相同的视觉变体：

```css
/* button */
.ui-btn--glass { backdrop-filter: blur(12px); ... }

/* input */
.ui-input--glass { backdrop-filter: blur(12px); ... }

/* card, modal, ... 重复 */
```

**问题**：改一个变体要改 4+ 个文件。

## 解决方案

提取共享变体为工具类：

```css
/* 只定义一次 */
.variant-glass { backdrop-filter: blur(12px); ... }
.variant-gradient { ... }
.variant-outline { ... }
.variant-soft { ... }
.variant-flat { ... }
```

## 使用方式

```tsx
// 组合基础类和变体类
<button class="ui-btn variant-glass">Glass Button</button>
<input class="ui-input variant-outline" />
<div class="ui-card variant-elevated">Elevated Card</div>
```

## 可用变体

### Glass（毛玻璃）
```html
<button class="ui-btn variant-glass">Glass</button>
```
- 半透明背景
- 背景模糊
- 边框发光

### Gradient（渐变）
```html
<button class="ui-btn variant-gradient">Gradient</button>
<button class="ui-btn variant-gradient-success">Success</button>
<button class="ui-btn variant-gradient-error">Error</button>
```
- 渐变背景
- 无边框

### Outline（轮廓）
```html
<button class="ui-btn variant-outline">Outline</button>
<button class="ui-btn variant-outline-primary">Primary</button>
<button class="ui-btn variant-outline-success">Success</button>
```
- 透明背景
- 彩色边框
- 彩色文字

### Soft（柔和）
```html
<button class="ui-btn variant-soft">Soft</button>
<button class="ui-btn variant-soft-success">Success</button>
```
- 浅色背景
- 彩色文字

### Flat（扁平）
```html
<button class="ui-btn variant-flat">Flat</button>
<button class="ui-btn variant-flat-primary">Primary</button>
```
- 完全透明
- 无阴影

### Elevation（层级）
```html
<div class="ui-card variant-elevated">Medium</div>
<div class="ui-card variant-elevated-lg">Large</div>
<div class="ui-card variant-elevated-xl">Extra Large</div>
```
- 阴影效果
- 无边框

## 颜色变体

每个变体都有颜色版本：

```html
<button class="ui-btn variant-outline-success">Success</button>
<button class="ui-btn variant-soft-error">Error</button>
<button class="ui-btn variant-flat-warning">Warning</button>
```

可用颜色：`primary`（默认）、`success`、`warning`、`error`

## 交互状态

所有变体都支持交互状态（hover、focus、active）：

```css
.variant-glass:hover { background: rgba(255, 255, 255, 0.15); }
.variant-gradient:hover { filter: brightness(1.1); }
.variant-outline:hover { background: rgba(99, 102, 241, 0.05); }
```

## 组合使用

```tsx
// 基础变体
<button class="ui-btn variant-glass">Glass</button>

// 颜色变体
<button class="ui-btn variant-outline-success">Success Outline</button>

// 尺寸 + 变体
<button class="ui-btn ui-btn--sm variant-glass">Small Glass</button>

// 禁用状态
<button class="ui-btn variant-glass" disabled>Disabled</button>

// 加载状态
<button class="ui-btn variant-glass ui-btn--loading">Loading</button>
```

## 迁移指南

### 之前

```tsx
<button class="ui-btn ui-btn--glass">Glass</button>
<button class="ui-btn ui-btn--gradient">Gradient</button>
<button class="ui-btn ui-btn--outline">Outline</button>
```

### 之后

```tsx
<button class="ui-btn variant-glass">Glass</button>
<button class="ui-btn variant-gradient">Gradient</button>
<button class="ui-btn variant-outline">Outline</button>
```

## 收益

| 改进 | 说明 |
|---|---|
| DRY 原则 | 变体定义一次，到处复用 |
| 一致体验 | 所有组件的 glass 效果相同 |
| 新增变体 | 只改一处，所有组件自动获得 |
| 更小 CSS | 避免重复代码（~400 行） |
| 维护简单 | 改一个地方，全局生效 |

## 按需加载

```tsx
// 只导入需要的变体
import '@ui/css/variants';

// 或者完整导入
import '@ui/css';
```
