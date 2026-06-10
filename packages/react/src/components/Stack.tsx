import { type HTMLAttributes, type ReactNode } from 'react';

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  /** Direction */
  direction?: 'horizontal' | 'vertical';
  /** Gap size (0-8 maps to spacing tokens) */
  gap?: 0 | 1 | 2 | 3 | 4 | 6 | 8;
  /** Align items */
  align?: 'start' | 'center' | 'end' | 'stretch';
  /** Justify content */
  justify?: 'start' | 'center' | 'end' | 'between';
  /** Allow wrapping */
  wrap?: boolean;
  children: ReactNode;
}

/** Flex layout helper. */
export function Stack({
  direction = 'vertical',
  gap = 4,
  align,
  justify,
  wrap = false,
  className = '',
  children,
  ...props
}: StackProps) {
  const alignMap = { start: 'start', center: 'center', end: 'end', stretch: 'stretch' } as const;
  const justifyMap = { start: 'start', center: 'center', end: 'end', between: 'between' } as const;

  const classes = [
    'ui-stack',
    direction === 'vertical' && 'ui-stack--vertical',
    `ui-stack--gap-${gap}`,
    align && `ui-stack--align-${alignMap[align]}`,
    justify && `ui-stack--justify-${justifyMap[justify]}`,
    wrap && 'ui-stack--wrap',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}
