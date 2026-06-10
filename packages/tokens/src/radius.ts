/**
 * Border radius tokens.
 *
 * none → 0, sm → 4px, md → 8px, lg → 12px, xl → 16px, full → pill shape
 */

export const radius = {
  /** 0px  — sharp corners (badges, chips in some styles) */
  none: '0',
  /** 4px  — subtle rounding (buttons, inputs, small cards) */
  sm:   '0.25rem',
  /** 8px  — default rounding (cards, dialogs) */
  md:   '0.5rem',
  /** 12px — generous rounding (modals, large cards) */
  lg:   '0.75rem',
  /** 16px — soft rounding (feature cards, hero sections) */
  xl:   '1rem',
  /** 9999px — pill / circle */
  full: '9999px',
} as const;

export type Radius = typeof radius;
