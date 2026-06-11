# 类型安全类名

从 CSS 文件自动生成 TypeScript 类名常量，确保编译时类型检查。

## 问题

```tsx
// 之前：字符串类名，拼写错误不会报错
<button className="ui-btn--primary">Click</button>
//                           ^^^^^^
//                           拼写错误？编译器不知道
```

## 解决方案

从 CSS 生成 TypeScript 常量：

```typescript
// 自动生成的 class-names.ts
export const BUTTON = {
  base: 'ui-btn',
  primary: 'ui-btn--primary',
  secondary: 'ui-btn--secondary',
  sm: 'ui-btn--sm',
  md: 'ui-btn--md',
  lg: 'ui-btn--lg',
  disabled: 'ui-btn--disabled',
} as const;
```

## 使用方式

```tsx
import { BUTTON } from '@ui/css/class-names';

// ✓ 正确：编译时检查
<button className={BUTTON.primary}>Click</button>

// ✗ 错误：TypeScript 会报错
<button className={BUTTON.primariy}>Click</button>
//                                  ^^^^^^^^^
//                                  TypeScript: Property 'primariy' does not exist
```

## 生成规则

| CSS 类名 | TypeScript 键 |
|---|---|
| `.ui-btn` | `BUTTON.base` |
| `.ui-btn--primary` | `BUTTON.primary` |
| `.ui-btn--sm` | `BUTTON.sm` |
| `.ui-btn__icon` | `BUTTON.icon` |
| `.ui-btn--disabled` | `BUTTON.disabled` |

## API

### 组件常量

每个组件生成独立的常量对象：

```typescript
export const BUTTON = { ... };
export const INPUT = { ... };
export const CARD = { ... };
// ... 36 个组件
```

### 类型

```typescript
export type ComponentClassName = typeof BUTTON | typeof INPUT | typeof CARD;
```

## 收益

| 改进 | 说明 |
|---|---|
| 编译时检查 | 拼写错误会报 TypeScript 错误 |
| IDE 自动补全 | 输入 `BUTTON.` 显示所有选项 |
| 重构安全 | 重命名 CSS 类会自动更新所有引用 |
| 文档化 | 常量本身就是类名的文档 |

## 构建

类名常量在构建 CSS 时自动生成：

```bash
pnpm build:css
# ✓ 生成 dist/class-names.ts
```

## 迁移指南

### 之前

```tsx
<button className="ui-btn ui-btn--primary ui-btn--md">
  Click
</button>
```

### 之后

```tsx
import { BUTTON } from '@ui/css/class-names';

<button className={`${BUTTON.base} ${BUTTON.primary} ${BUTTON.md}`}>
  Click
</button>

// 或者使用 helper
import { cx } from '@ui/css';

<button className={cx(BUTTON.base, BUTTON.primary, BUTTON.md)}>
  Click
</button>
```
