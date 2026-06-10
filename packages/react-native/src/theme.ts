/**
 * React Native theme — maps design tokens to StyleSheet-friendly values.
 *
 * Usage:
 *   import { theme } from '@ui/react-native';
 *   const styles = StyleSheet.create({
 *     container: { backgroundColor: theme.colors.bg, padding: theme.spacing[4] }
 *   });
 */

import { primary, gray, success, warning, error, info } from '@ui/tokens/colors';
import { spacing } from '@ui/tokens/spacing';
import { radius } from '@ui/tokens/radius';
import { shadow } from '@ui/tokens/shadows';
import { componentSize } from '@ui/tokens/sizes';

// ── Font sizes (RN uses numbers, not rem) ─────────────────────────
export const fontSize = {
  xs:    12,
  sm:    14,
  base:  16,
  lg:    18,
  xl:    20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
} as const;

// ── Font weights ──────────────────────────────────────────────────
export const fontWeight = {
  regular:  '400' as const,
  medium:   '500' as const,
  semibold: '600' as const,
  bold:     '700' as const,
};

// ── Spacing (RN uses numbers) ─────────────────────────────────────
export const space = {
  0:  0,
  1:  4,
  2:  8,
  3:  12,
  4:  16,
  5:  20,
  6:  24,
  8:  32,
  10: 40,
  12: 48,
  16: 64,
} as const;

// ── Radii ─────────────────────────────────────────────────────────
export const radii = {
  none: 0,
  sm:   4,
  md:   8,
  lg:   12,
  xl:   16,
  full: 9999,
} as const;

// ── Light theme colors ────────────────────────────────────────────
export const lightColors = {
  // Backgrounds
  bg:              '#ffffff',
  bgSubtle:        gray[50],
  bgMuted:         gray[100],

  // Surfaces
  surface:         '#ffffff',
  surfaceElevated: '#ffffff',

  // Text
  textPrimary:     gray[900],
  textSecondary:   gray[600],
  textTertiary:    gray[400],
  textInverse:     '#ffffff',
  textOnPrimary:   '#ffffff',

  // Borders
  border:          gray[200],
  borderStrong:    gray[300],

  // Interactive
  primary:         primary[600],
  primaryHover:    primary[700],
  primaryActive:   primary[800],

  // Semantic
  success:         success[600],
  warning:         warning[500],
  error:           error[600],
  info:            info[600],

  // Ring / Focus
  ring:            primary[500],

  // Scale colors (for direct access)
  gray, primary, success, warning, error, info,
} as const;

// ── Dark theme colors ─────────────────────────────────────────────
export const darkColors = {
  bg:              gray[950],
  bgSubtle:        gray[900],
  bgMuted:         gray[800],

  surface:         gray[900],
  surfaceElevated: gray[800],

  textPrimary:     gray[50],
  textSecondary:   gray[300],
  textTertiary:    gray[500],
  textInverse:     gray[900],
  textOnPrimary:   '#ffffff',

  border:          gray[700],
  borderStrong:    gray[600],

  primary:         primary[400],
  primaryHover:    primary[300],
  primaryActive:   primary[200],

  success:         success[400],
  warning:         warning[400],
  error:           error[400],
  info:            info[400],

  ring:            primary[400],

  gray, primary, success, warning, error, info,
} as const;

export type ThemeColors = typeof lightColors;

// ── Glass theme colors ────────────────────────────────────────────
export const glassColors = {
  bg:              '#0f1117',
  bgSubtle:        'rgba(255, 255, 255, 0.03)',
  bgMuted:         'rgba(255, 255, 255, 0.06)',

  surface:         'rgba(255, 255, 255, 0.04)',
  surfaceElevated: 'rgba(255, 255, 255, 0.08)',

  textPrimary:     '#e8eaf0',
  textSecondary:   '#8b90a0',
  textTertiary:    '#555968',
  textInverse:     '#0f1117',
  textOnPrimary:   '#ffffff',

  border:          'rgba(255, 255, 255, 0.06)',
  borderStrong:    'rgba(255, 255, 255, 0.12)',

  primary:         '#7c8aff',
  primaryHover:    '#9ba3ff',
  primaryActive:   '#6270e8',

  success:         '#5ce0a0',
  warning:         '#f5c842',
  error:           '#ff6b7a',
  info:            '#6bb8ff',

  ring:            'rgba(124, 138, 255, 0.4)',

  gray, primary, success, warning, error, info,
} as const;

// ── Cyber theme colors ────────────────────────────────────────────
export const cyberColors = {
  bg:              '#06080d',
  bgSubtle:        '#0c0f18',
  bgMuted:         '#131724',

  surface:         '#0e1220',
  surfaceElevated: '#141929',

  textPrimary:     '#e0e6f0',
  textSecondary:   '#8892a8',
  textTertiary:    '#4a5268',
  textInverse:     '#06080d',
  textOnPrimary:   '#06080d',

  border:          'rgba(0, 255, 213, 0.12)',
  borderStrong:    'rgba(0, 255, 213, 0.25)',

  primary:         '#00ffd5',
  primaryHover:    '#33ffe0',
  primaryActive:   '#00e6bf',

  success:         '#00ff88',
  warning:         '#ffaa00',
  error:           '#ff3366',
  info:            '#00ccff',

  ring:            'rgba(0, 255, 213, 0.5)',

  gray, primary, success, warning, error, info,
} as const;

// ── Sport theme colors ────────────────────────────────────────────
export const sportColors = {
  bg:              '#111827',
  bgSubtle:        '#1a2234',
  bgMuted:         '#232d40',

  surface:         '#1a2234',
  surfaceElevated: '#212b3d',

  textPrimary:     '#f0f4f8',
  textSecondary:   '#94a3b8',
  textTertiary:    '#5a6578',
  textInverse:     '#111827',
  textOnPrimary:   '#ffffff',

  border:          '#2a3548',
  borderStrong:    '#3a4a60',

  primary:         '#f97316',
  primaryHover:    '#fb923c',
  primaryActive:   '#ea580c',

  success:         '#22c55e',
  warning:         '#eab308',
  error:           '#ef4444',
  info:            '#3b82f6',

  ring:            'rgba(249, 115, 22, 0.5)',

  gray, primary, success, warning, error, info,
} as const;

// ── Component size tokens (RN numbers) ────────────────────────────
export const sizes = {
  sm: {
    height:   32,
    paddingX: 12,
    paddingY: 4,
    fontSize: 14,
    iconSize: 16,
    gap:      6,
  },
  md: {
    height:   40,
    paddingX: 16,
    paddingY: 8,
    fontSize: 14,
    iconSize: 20,
    gap:      8,
  },
  lg: {
    height:   48,
    paddingX: 20,
    paddingY: 10,
    fontSize: 16,
    iconSize: 20,
    gap:      8,
  },
} as const;

// ── Default theme object ──────────────────────────────────────────
export const theme = {
  colors: lightColors,
  fontSize,
  fontWeight,
  space,
  radii,
  sizes,
} as const;
