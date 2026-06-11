export interface TokenConfig {
  source: string;
  output: string;
  theme?: 'light' | 'dark' | 'both';
  generateThemes?: boolean;
}

export interface GeneratedTokens {
  light: string;
  dark: string;
  combined: string;
}

export interface TokenValue {
  [key: string]: string | number | TokenValue;
}

export interface ThemeColors {
  [key: string]: string;
}
