/**
 * Animation / transition tokens.
 *
 * Duration: fast (micro-interactions) / normal (state changes) / slow (page transitions)
 * Easing:   ease-out for entering, ease-in for exiting
 */

export const animation = {
  duration: {
    /** 100ms — instant feedback (focus ring, opacity) */
    fast:   '100ms',
    /** 200ms — default transition (hover, press, toggle) */
    normal: '200ms',
    /** 300ms — complex transitions (expand, collapse, slide) */
    slow:   '300ms',
    /** 500ms — page transitions, large animations */
    slower: '500ms',
  },

  easing: {
    /** Entering elements — decelerate */
    easeOut:    'cubic-bezier(0, 0, 0.2, 1)',
    /** Exiting elements — accelerate */
    easeIn:     'cubic-bezier(0.4, 0, 1, 1)',
    /** Moving elements — standard */
    easeInOut:  'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;

export type Animation = typeof animation;
