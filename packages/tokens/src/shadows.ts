/**
 * Shadow tokens — 3-level elevation system.
 *
 * sm  — subtle lift: cards at rest, dropdown menus
 * md  — moderate lift: popovers, tooltips, elevated cards
 * lg  — high lift: modals, dialogs
 *
 * Each level includes both a shadow and matching ring for focus states.
 */

export const shadow = {
  /** Subtle: resting cards, list items */
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',

  /** Moderate: popovers, tooltips, elevated cards */
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',

  /** High: modals, dialogs */
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',

  /** Extra high: critical overlays */
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',

  /** Focus ring — used for keyboard focus indicators */
  ring: '0 0 0 3px rgba(99, 102, 241, 0.5)',
  ringError: '0 0 0 3px rgba(239, 68, 68, 0.5)',

  /** No shadow */
  none: 'none',
} as const;

export type Shadow = typeof shadow;
