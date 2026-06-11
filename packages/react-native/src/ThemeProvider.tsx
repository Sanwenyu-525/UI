import { createContext, useContext, useState, useMemo, type ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { lightThemeColors, darkThemeColors, type GeneratedThemeColors } from './generated/themes';

export type ThemeName = 'light' | 'dark' | 'system';

export interface ThemeContextValue {
  theme: ThemeName;
  colors: GeneratedThemeColors;
  setTheme: (theme: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: ThemeName;
  colors?: Partial<GeneratedThemeColors>;
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  colors: customColors,
}: ThemeProviderProps) {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeName>(defaultTheme);

  const resolvedTheme = useMemo(() => {
    if (theme === 'system') {
      return systemColorScheme === 'dark' ? 'dark' : 'light';
    }
    return theme;
  }, [theme, systemColorScheme]);

  const baseColors = useMemo(() => {
    return resolvedTheme === 'dark' ? darkThemeColors : lightThemeColors;
  }, [resolvedTheme]);

  const colors = useMemo(() => {
    if (customColors) {
      return { ...baseColors, ...customColors };
    }
    return baseColors;
  }, [baseColors, customColors]);

  const value = useMemo(
    () => ({
      theme,
      colors,
      setTheme,
    }),
    [theme, colors]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    return {
      theme: 'light',
      colors: lightThemeColors,
      setTheme: () => {},
    };
  }
  return context;
}
