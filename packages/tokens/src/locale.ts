/**
 * Shared locale strings for component defaults.
 *
 * Components use these as fallbacks when no explicit text is provided.
 * Users override per-component via props; this covers system-level strings
 * like aria-labels, placeholders, and status text.
 */

export type Locale = 'zh-CN' | 'en';

export interface LocaleStrings {
  // Modal
  close: string;
  confirm: string;
  cancel: string;

  // Select
  selectPlaceholder: string;
  noOptions: string;

  // Toast / Notification
  dismiss: string;

  // Form
  required: string;

  // Status
  loading: string;
  error: string;
  success: string;

  // Avatar
  avatar: string;
}

export const zhCN: LocaleStrings = {
  close: '关闭',
  confirm: '确认',
  cancel: '取消',

  selectPlaceholder: '请选择…',
  noOptions: '无选项',

  dismiss: '忽略',

  required: '必填',

  loading: '加载中',
  error: '错误',
  success: '成功',

  avatar: '头像',
};

export const en: LocaleStrings = {
  close: 'Close',
  confirm: 'Confirm',
  cancel: 'Cancel',

  selectPlaceholder: 'Select…',
  noOptions: 'No options',

  dismiss: 'Dismiss',

  required: 'Required',

  loading: 'Loading',
  error: 'Error',
  success: 'Success',

  avatar: 'Avatar',
};

export const locales: Record<Locale, LocaleStrings> = {
  'zh-CN': zhCN,
  'en': en,
};
