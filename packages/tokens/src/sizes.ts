/**
 * Component size tokens.
 *
 * Defines height, padding, font-size, and icon-size for three standard sizes.
 * Used by Button, Input, Select, and similar interactive components.
 */

export const componentSize = {
  sm: {
    height:    '2rem',      // 32px
    paddingX:  '0.75rem',   // 12px
    paddingY:  '0.25rem',   // 4px
    fontSize:  '0.875rem',  // 14px
    iconSize:  '1rem',      // 16px
    gap:       '0.375rem',  // 6px
  },
  md: {
    height:    '2.5rem',    // 40px
    paddingX:  '1rem',      // 16px
    paddingY:  '0.5rem',    // 8px
    fontSize:  '0.875rem',  // 14px
    iconSize:  '1.25rem',   // 20px
    gap:       '0.5rem',    // 8px
  },
  lg: {
    height:    '3rem',      // 48px
    paddingX:  '1.25rem',   // 20px
    paddingY:  '0.625rem',  // 10px
    fontSize:  '1rem',      // 16px
    iconSize:  '1.25rem',   // 20px
    gap:       '0.5rem',    // 8px
  },
} as const;

export type ComponentSize = typeof componentSize;
