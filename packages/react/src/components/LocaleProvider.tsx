import { createContext, useContext, type ReactNode } from 'react';
import { locales, zhCN, type Locale, type LocaleStrings } from '@ui/tokens';

/**
 * Locale context — provides localized strings to all child components.
 *
 * Usage:
 *   <LocaleProvider locale="en">
 *     <App />
 *   </LocaleProvider>
 */

const LocaleCtx = createContext<LocaleStrings>(zhCN);

export interface LocaleProviderProps {
  /** Locale code — 'zh-CN' or 'en' */
  locale?: Locale;
  /** Override specific strings */
  overrides?: Partial<LocaleStrings>;
  children: ReactNode;
}

export function LocaleProvider({
  locale = 'zh-CN',
  overrides,
  children,
}: LocaleProviderProps) {
  const base = locales[locale] ?? zhCN;
  const merged = overrides ? { ...base, ...overrides } : base;

  return (
    <LocaleCtx.Provider value={merged}>
      {children}
    </LocaleCtx.Provider>
  );
}

/**
 * Hook to access localized strings.
 * Returns the full LocaleStrings object for the current locale.
 */
export function useLocale(): LocaleStrings {
  return useContext(LocaleCtx);
}
