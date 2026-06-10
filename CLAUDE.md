# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

跨平台 UI 组件系统：设计令牌共享，Web (CSS) / React / React Native 三栈实现。

## 常用命令

```bash
# 安装依赖
pnpm install

# 构建所有包
pnpm build

# 构建特定包
pnpm build:tokens    # 设计令牌
pnpm build:css       # CSS 组件
pnpm build:react     # React 组件

# 类型检查
pnpm typecheck

# 清理构建产物
pnpm clean
```

## 架构

```
packages/
├── tokens/          TypeScript 设计令牌，生成 CSS 变量
├── css/             原生 CSS 组件（通过 CSS 变量驱动）
├── react/           TypeScript React 组件（依赖 @ui/css）
└── react-native/    StyleSheet React Native 组件（依赖 @ui/tokens）

playground/
└── index.html       组件预览和文档
```

### 设计令牌系统

令牌定义在 `packages/tokens/src/`，包含：颜色、字体、间距、阴影、圆角、尺寸、动画。

构建时生成 CSS 变量到 `packages/css/src/styles/tokens.css`，所有组件通过这些变量保持一致。

### CSS 组件组织

每个组件在 `packages/css/src/components/<name>/index.css`，遵循：

```css
.ui-component { }           /* 基础 */
.ui-component--variant { }  /* 变体（primary, secondary 等） */
.ui-component--size { }     /* 尺寸（sm, md, lg） */
.ui-component--state { }    /* 状态（hover, focus, disabled） */
```

### 主题系统

通过 `data-theme` 属性切换，定义在 `packages/css/src/styles/`：

- `tokens.css` - 默认值（:root 和 [data-theme="light"]）
- `theme-dark.css` - 暗色主题覆盖
- `theme-glass.css` - 毛玻璃效果（使用 backdrop-filter）
- `theme-cyber.css` - 科技风格
- `theme-sport.css` - 运动风格
- 以及 high-contrast, material, fluent, retro, neon, pastel 等

添加新主题时：创建 `theme-<name>.css`，用 `[data-theme="<name>"]` 覆盖 CSS 变量。

### 密度系统

通过 `data-density` 属性控制间距（compact, comfortable, spacious），定义在 `density.css`。

### 视觉变体

组件支持多种视觉风格：`--glass`, `--gradient`, `--soft`, `--flat`, `--outline` 等。

## 关键约定

- **CSS 变量驱动**：组件样式依赖 `var(--xxx)` 而非硬编码值，以便主题切换
- **导入顺序**：tokens → reset → base → density → components → themes
- **React 组件**：使用 `forwardRef`，支持 ref 转发
- **命名空间**：所有类名以 `ui-` 前缀（如 `ui-btn`, `ui-card`）
- **变体命名**：`<class>--<variant>`（如 `ui-btn--primary`）
- **状态命名**：`<class>--<state>`（如 `ui-btn--disabled`）
- **子元素命名**：`<class>__<element>`（如 `ui-card__title`）

## 添加新组件

1. CSS：创建 `packages/css/src/components/<name>/index.css`
2. React：创建 `packages/react/src/components/<Name>.tsx`
3. 在对应 index 文件中导出
4. 在 `packages/css/src/index.css` 中导入 CSS

## 设计令牌修改

修改 `packages/tokens/src/<category>.ts`，运行 `pnpm build:tokens` 重新生成。

## 注意事项

- 每个主题文件应只覆盖必要的变量，保持最小化
- React Native 组件使用 StyleSheet，不依赖 CSS
- `playground/index.html` 用于文档和预览，保持更新
- 组件尺寸遵循 sm/md/lg 三级系统
