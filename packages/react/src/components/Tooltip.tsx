import { useState, useRef, type ReactNode } from 'react';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  /** Tooltip content */
  content: ReactNode;
  /** Position relative to trigger */
  position?: TooltipPosition;
  /** Delay before showing (ms) */
  delay?: number;
  /** Show arrow */
  arrow?: boolean;
  /** The trigger element */
  children: ReactNode;
  className?: string;
}

/**
 * Tooltip that appears on hover with configurable position and delay.
 */
export function Tooltip({
  content,
  position = 'top',
  delay = 200,
  arrow = true,
  children,
  className = '',
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const show = () => {
    timerRef.current = setTimeout(() => setVisible(true), delay);
  };

  const hide = () => {
    clearTimeout(timerRef.current);
    setVisible(false);
  };

  return (
    <div
      className={`ui-tooltip-wrapper ${className}`}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      <div
        className={`ui-tooltip ui-tooltip--${position}${visible ? ' ui-tooltip--visible' : ''}`}
        role="tooltip"
        aria-hidden={!visible}
      >
        {content}
        {arrow && <span className="ui-tooltip__arrow" />}
      </div>
    </div>
  );
}
