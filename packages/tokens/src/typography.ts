/**
 * Typography tokens.
 *
 * Font family:  Inter (UI standard, excellent cross-platform).
 * Scale:        12 → 48px, following a ~1.25 ratio.
 * Weights:      regular / medium / semibold / bold.
 * Line heights: tight (headings) / normal (body) / relaxed (long-form).
 */

export const fontFamily = {
  sans:  '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  mono:  '"JetBrains Mono", "Fira Code", "Cascadia Code", monospace',
} as const;

export const fontSize = {
  xs:    '0.75rem',   // 12px — captions, labels
  sm:    '0.875rem',  // 14px — secondary text
  base:  '1rem',      // 16px — body
  lg:    '1.125rem',  // 18px — lead text
  xl:    '1.25rem',   // 20px — small headings
  '2xl': '1.5rem',    // 24px — section heading
  '3xl': '1.875rem',  // 30px — page heading
  '4xl': '2.25rem',   // 36px — hero heading
  '5xl': '3rem',      // 48px — display
} as const;

export const fontWeight = {
  regular:  400,
  medium:   500,
  semibold: 600,
  bold:     700,
} as const;

export const lineHeight = {
  none:    1,
  tight:   1.25,   // headings
  snug:    1.375,  // subheadings
  normal:  1.5,    // body
  relaxed: 1.625,  // long-form
} as const;

export const letterSpacing = {
  tighter: '-0.05em',
  tight:   '-0.025em',
  normal:  '0em',
  wide:    '0.025em',
  wider:   '0.05em',
} as const;

// ── Composite text styles ──────────────────────────────────────────
export const textStyle = {
  'display-lg': {
    fontSize: fontSize['5xl'],
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.none,
    letterSpacing: letterSpacing.tighter,
  },
  'display-sm': {
    fontSize: fontSize['4xl'],
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.tight,
  },
  heading: {
    fontSize: fontSize['3xl'],
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.tight,
  },
  'subheading': {
    fontSize: fontSize['2xl'],
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.snug,
    letterSpacing: letterSpacing.tight,
  },
  title: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.snug,
    letterSpacing: letterSpacing.normal,
  },
  body: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  },
  'body-sm': {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  },
  caption: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.wide,
  },
  label: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.snug,
    letterSpacing: letterSpacing.wide,
  },
} as const;

export type FontFamily = typeof fontFamily;
export type FontSize = typeof fontSize;
export type TextStyle = typeof textStyle;
