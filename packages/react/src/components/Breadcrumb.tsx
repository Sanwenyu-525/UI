import { type HTMLAttributes, type ReactNode } from 'react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  /** If true, rendered as current page (not a link) */
  current?: boolean;
  /** Click handler (alternative to href) */
  onClick?: () => void;
}

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  /** Separator character */
  separator?: ReactNode;
}

/** Location trail for hierarchical navigation. */
export function Breadcrumb({
  items,
  separator = '/',
  className = '',
  ...props
}: BreadcrumbProps) {
  return (
    <nav className={`ui-breadcrumb ${className}`} aria-label="Breadcrumb" {...props}>
      {items.map((item, i) => (
        <span key={i} className="ui-breadcrumb__item">
          {i > 0 && <span className="ui-breadcrumb__sep" aria-hidden="true">{separator}</span>}
          {item.current || (!item.href && !item.onClick) ? (
            <span className="ui-breadcrumb__current" aria-current={item.current ? 'page' : undefined}>
              {item.label}
            </span>
          ) : item.href ? (
            <a className="ui-breadcrumb__link" href={item.href} onClick={item.onClick}>
              {item.label}
            </a>
          ) : (
            <button className="ui-breadcrumb__link" onClick={item.onClick} type="button" style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit', padding: 0 }}>
              {item.label}
            </button>
          )}
        </span>
      ))}
    </nav>
  );
}
