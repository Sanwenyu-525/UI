/**
 * Spacing tokens — 4px incremental scale.
 *
 * Maps numeric keys to pixel values:
 *   0 → 0, 1 → 4px, 2 → 8px, ... 16 → 64px
 *
 * Usage:
 *   padding: spacing[4]    // 16px
 *   gap:     spacing[2]    // 8px
 */

export const spacing = {
  /** 0px */   '0':  '0',
  /** 4px */   '1':  '0.25rem',
  /** 8px */   '2':  '0.5rem',
  /** 12px */  '3':  '0.75rem',
  /** 16px */  '4':  '1rem',
  /** 20px */  '5':  '1.25rem',
  /** 24px */  '6':  '1.5rem',
  /** 32px */  '8':  '2rem',
  /** 40px */  '10': '2.5rem',
  /** 48px */  '12': '3rem',
  /** 64px */  '16': '4rem',
  /** 80px */  '20': '5rem',
  /** 96px */  '24': '6rem',
  /** 128px */ '32': '8rem',
} as const;

// ── Semantic spacing shortcuts ─────────────────────────────────────
export const layout = {
  /** Tight padding inside small components (inputs, badges) */       componentXs: spacing['1'],   // 4px
  /** Default padding inside components (buttons, tags) */            componentSm: spacing['2'],   // 8px
  /** Comfortable padding inside medium components */                 componentMd: spacing['3'],   // 12px
  /** Spacious padding inside large components (cards) */             componentLg: spacing['4'],   // 16px

  /** Gap between inline items (icon + label) */                      inlineXs:    spacing['1'],   // 4px
  /** Gap between related inline items */                             inlineSm:    spacing['2'],   // 8px
  /** Default gap between sibling elements */                         inlineMd:    spacing['3'],   // 12px

  /** Gap between form field and helper/error text */                 fieldGap:    spacing['1'],   // 4px
  /** Gap between stacked form fields */                              fieldStack:  spacing['4'],   // 16px

  /** Small section break */                                          sectionSm:   spacing['6'],   // 24px
  /** Default section break */                                        sectionMd:   spacing['8'],   // 32px
  /** Large section break */                                          sectionLg:   spacing['12'],  // 48px

  /** Page horizontal padding (mobile) */                             pageX:       spacing['4'],   // 16px
  /** Page horizontal padding (desktop) */                            pageXl:      spacing['6'],   // 24px
  /** Page vertical padding */                                        pageY:       spacing['6'],   // 24px
} as const;

export type Spacing = typeof spacing;
export type Layout = typeof layout;
