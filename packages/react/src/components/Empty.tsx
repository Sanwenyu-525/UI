import { type HTMLAttributes, type ReactNode } from 'react';

export interface EmptyProps extends HTMLAttributes<HTMLDivElement> {
  /** Title text */
  title?: string;
  /** Description text */
  description?: string;
  /** Icon (SVG element) */
  icon?: ReactNode;
  /** Action slot (typically a Button) */
  action?: ReactNode;
}

/** Empty state placeholder. */
export function Empty({
  title = '暂无数据',
  description,
  icon,
  action,
  className = '',
  ...props
}: EmptyProps) {
  return (
    <div className={`ui-empty ${className}`} {...props}>
      {icon || (
        <svg className="ui-empty__icon" viewBox="0 0 48 48" fill="none">
          <path d="M8 12h32v24a4 4 0 01-4 4H12a4 4 0 01-4-4V12z" stroke="currentColor" strokeWidth="2" />
          <path d="M16 12V8h16v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M18 24h12M24 20v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        </svg>
      )}
      <h3 className="ui-empty__title">{title}</h3>
      {description && <p className="ui-empty__description">{description}</p>}
      {action && <div className="ui-empty__action">{action}</div>}
    </div>
  );
}
