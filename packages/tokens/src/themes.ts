/**
 * Theme definitions — single source of truth for all themes.
 *
 * Each theme defines semantic color roles that map to CSS variables
 * and React Native color objects.
 */

import { gray, primary, success, warning, error, info } from './colors.js';

export interface ThemeDefinition {
  // Backgrounds
  bg: string;
  bgSubtle: string;
  bgMuted: string;

  // Surfaces
  surface: string;
  surfaceElevated: string;
  surfaceOverlay: string;

  // Text
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  textInverse: string;
  textOnPrimary: string;

  // Borders
  border: string;
  borderStrong: string;

  // Interactive
  primary: string;
  primaryHover: string;
  primaryActive: string;

  // Semantic
  success: string;
  warning: string;
  error: string;
  info: string;

  // Focus
  ring: string;
}

// ── Light Theme ────────────────────────────────────────────────
export const lightTheme: ThemeDefinition = {
  bg:                 '#ffffff',
  bgSubtle:           gray[50],
  bgMuted:            gray[100],

  surface:            '#ffffff',
  surfaceElevated:    '#ffffff',
  surfaceOverlay:     'rgba(0, 0, 0, 0.5)',

  textPrimary:        gray[900],
  textSecondary:      gray[600],
  textTertiary:       gray[400],
  textInverse:        '#ffffff',
  textOnPrimary:      '#ffffff',

  border:             gray[200],
  borderStrong:       gray[300],

  primary:            primary[600],
  primaryHover:       primary[700],
  primaryActive:      primary[800],

  success:            success[600],
  warning:            warning[500],
  error:              error[600],
  info:               info[600],

  ring:               primary[500],
};

// ── Dark Theme ─────────────────────────────────────────────────
export const darkTheme: ThemeDefinition = {
  bg:                 gray[950],
  bgSubtle:           gray[900],
  bgMuted:            gray[800],

  surface:            gray[900],
  surfaceElevated:    gray[800],
  surfaceOverlay:     'rgba(0, 0, 0, 0.7)',

  textPrimary:        gray[50],
  textSecondary:      gray[300],
  textTertiary:       gray[500],
  textInverse:        gray[900],
  textOnPrimary:      '#ffffff',

  border:             gray[700],
  borderStrong:       gray[600],

  primary:            primary[400],
  primaryHover:       primary[300],
  primaryActive:      primary[200],

  success:            success[400],
  warning:            warning[400],
  error:              error[400],
  info:               info[400],

  ring:               primary[400],
};

// ── Glass Theme ────────────────────────────────────────────────
export const glassTheme: ThemeDefinition = {
  bg:                 'rgba(15, 15, 25, 0.9)',
  bgSubtle:           'rgba(20, 20, 35, 0.95)',
  bgMuted:            'rgba(30, 30, 45, 0.9)',

  surface:            'rgba(25, 25, 40, 0.8)',
  surfaceElevated:    'rgba(35, 35, 50, 0.85)',
  surfaceOverlay:     'rgba(0, 0, 0, 0.6)',

  textPrimary:        '#f0f0f5',
  textSecondary:      '#a0a0b5',
  textTertiary:       '#707085',
  textInverse:        '#0a0a15',
  textOnPrimary:      '#ffffff',

  border:             'rgba(255, 255, 255, 0.1)',
  borderStrong:       'rgba(255, 255, 255, 0.2)',

  primary:            '#818cf8',
  primaryHover:       '#a5b4fc',
  primaryActive:      '#6366f1',

  success:            '#4ade80',
  warning:            '#fbbf24',
  error:              '#f87171',
  info:               '#60a5fa',

  ring:               'rgba(129, 140, 248, 0.4)',
};

// ── Cyber Theme ────────────────────────────────────────────────
export const cyberTheme: ThemeDefinition = {
  bg:                 '#0a0a0f',
  bgSubtle:           '#111118',
  bgMuted:            '#1a1a24',

  surface:            '#1a1a24',
  surfaceElevated:    '#222230',
  surfaceOverlay:     'rgba(0, 0, 0, 0.7)',

  textPrimary:        '#00ffff',
  textSecondary:      '#00cccc',
  textTertiary:       '#009999',
  textInverse:        '#0a0a0f',
  textOnPrimary:      '#000000',

  border:             'rgba(0, 255, 255, 0.2)',
  borderStrong:       'rgba(0, 255, 255, 0.4)',

  primary:            '#00ffff',
  primaryHover:       '#33ffff',
  primaryActive:      '#00cccc',

  success:            '#00ff88',
  warning:            '#ffff00',
  error:              '#ff0066',
  info:               '#00aaff',

  ring:               'rgba(0, 255, 255, 0.4)',
};

// ── Sport Theme ────────────────────────────────────────────────
export const sportTheme: ThemeDefinition = {
  bg:                 '#0d1117',
  bgSubtle:           '#161b22',
  bgMuted:            '#21262d',

  surface:            '#161b22',
  surfaceElevated:    '#21262d',
  surfaceOverlay:     'rgba(0, 0, 0, 0.7)',

  textPrimary:        '#ffffff',
  textSecondary:      '#c9d1d9',
  textTertiary:       '#8b949e',
  textInverse:        '#0d1117',
  textOnPrimary:      '#000000',

  border:             'rgba(255, 255, 255, 0.1)',
  borderStrong:       'rgba(255, 255, 255, 0.2)',

  primary:            '#ff6b35',
  primaryHover:       '#ff8c5a',
  primaryActive:      '#ff4500',

  success:            '#00c853',
  warning:            '#ffd600',
  error:              '#ff1744',
  info:               '#2979ff',

  ring:               'rgba(255, 107, 53, 0.4)',
};

// ── All themes ─────────────────────────────────────────────────
export const themes = {
  light:  lightTheme,
  dark:   darkTheme,
  glass:  glassTheme,
  cyber:  cyberTheme,
  sport:  sportTheme,
} as const;

export type ThemeName = keyof typeof themes;
