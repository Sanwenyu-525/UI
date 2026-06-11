export interface TokenConfig {
  source: string;
  output: string;
  theme?: 'light' | 'dark' | 'both';
  generateThemes?: boolean;
}

export interface ThemeColors {
  [key: string]: string;
}
