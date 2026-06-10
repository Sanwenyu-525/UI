/**
 * Color design tokens.
 *
 * Structure:
 *   gray     — neutral scale for text, borders, backgrounds
 *   primary  — brand / interactive color (Indigo)
 *   success  — positive outcome
 *   warning  — caution
 *   error    — destructive / error state
 *   info     — informational
 *
 * Each scale runs 50 → 950 (light → dark).
 * Semantic tokens map scale values to functional roles.
 */

// ── Neutral: Gray ──────────────────────────────────────────────────
export const gray = {
  50:  '#f9fafb',
  100: '#f3f4f6',
  200: '#e5e7eb',
  300: '#d1d5db',
  400: '#9ca3af',
  500: '#6b7280',
  600: '#4b5563',
  700: '#374151',
  800: '#1f2937',
  900: '#111827',
  950: '#030712',
} as const;

// ── Brand: Primary (Indigo) ────────────────────────────────────────
export const primary = {
  50:  '#eef2ff',
  100: '#e0e7ff',
  200: '#c7d2fe',
  300: '#a5b4fc',
  400: '#818cf8',
  500: '#6366f1',
  600: '#4f46e5',
  700: '#4338ca',
  800: '#3730a3',
  900: '#312e81',
  950: '#1e1b4b',
} as const;

// ── Semantic: Success ──────────────────────────────────────────────
export const success = {
  50:  '#f0fdf4',
  100: '#dcfce7',
  200: '#bbf7d0',
  300: '#86efac',
  400: '#4ade80',
  500: '#22c55e',
  600: '#16a34a',
  700: '#15803d',
  800: '#166534',
  900: '#14532d',
  950: '#052e16',
} as const;

// ── Semantic: Warning ──────────────────────────────────────────────
export const warning = {
  50:  '#fffbeb',
  100: '#fef3c7',
  200: '#fde68a',
  300: '#fcd34d',
  400: '#fbbf24',
  500: '#f59e0b',
  600: '#d97706',
  700: '#b45309',
  800: '#92400e',
  900: '#78350f',
  950: '#451a03',
} as const;

// ── Semantic: Error ────────────────────────────────────────────────
export const error = {
  50:  '#fef2f2',
  100: '#fee2e2',
  200: '#fecaca',
  300: '#fca5a5',
  400: '#f87171',
  500: '#ef4444',
  600: '#dc2626',
  700: '#b91c1c',
  800: '#991b1b',
  900: '#7f1d1d',
  950: '#450a0a',
} as const;

// ── Semantic: Info ─────────────────────────────────────────────────
export const info = {
  50:  '#eff6ff',
  100: '#dbeafe',
  200: '#bfdbfe',
  300: '#93c5fd',
  400: '#60a5fa',
  500: '#3b82f6',
  600: '#2563eb',
  700: '#1d4ed8',
  800: '#1e40af',
  900: '#1e3a8a',
  950: '#172554',
} as const;

// ── Functional color roles ─────────────────────────────────────────
// Light theme
export const light = {
  // Backgrounds
  bg:                 '#ffffff',
  bgSubtle:           gray[50],
  bgMuted:            gray[100],

  // Surfaces
  surface:            '#ffffff',
  surfaceElevated:    '#ffffff',
  surfaceOverlay:     'rgba(0, 0, 0, 0.5)',

  // Text
  textPrimary:        gray[900],
  textSecondary:      gray[600],
  textTertiary:       gray[400],
  textInverse:        '#ffffff',
  textOnPrimary:      '#ffffff',

  // Borders
  border:             gray[200],
  borderStrong:       gray[300],

  // Interactive
  primary:            primary[600],
  primaryHover:       primary[700],
  primaryActive:      primary[800],

  // Semantic
  success:            success[600],
  warning:            warning[500],
  error:              error[600],
  info:               info[600],

  // Focus ring
  ring:               primary[500],
} as const;

// Dark theme
export const dark = {
  // Backgrounds
  bg:                 gray[950],
  bgSubtle:           gray[900],
  bgMuted:            gray[800],

  // Surfaces
  surface:            gray[900],
  surfaceElevated:    gray[800],
  surfaceOverlay:     'rgba(0, 0, 0, 0.7)',

  // Text
  textPrimary:        gray[50],
  textSecondary:      gray[300],
  textTertiary:       gray[500],
  textInverse:        gray[900],
  textOnPrimary:      '#ffffff',

  // Borders
  border:             gray[700],
  borderStrong:       gray[600],

  // Interactive
  primary:            primary[400],
  primaryHover:       primary[300],
  primaryActive:      primary[200],

  // Semantic
  success:            success[400],
  warning:            warning[400],
  error:              error[400],
  info:               info[400],

  // Focus ring
  ring:               primary[400],
} as const;

export type ThemeColors = typeof light;
export type ColorScale = typeof gray;
