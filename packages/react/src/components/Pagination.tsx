import { type HTMLAttributes } from 'react';

export interface PaginationProps extends HTMLAttributes<HTMLElement> {
  /** Current page (1-indexed) */
  page: number;
  /** Total number of pages */
  totalPages: number;
  /** Page change callback */
  onChange: (page: number) => void;
}

/** Page navigation control. */
export function Pagination({
  page,
  totalPages,
  onChange,
  className = '',
  ...props
}: PaginationProps) {
  const range = generateRange(page, totalPages);

  return (
    <nav className={`ui-pagination ${className}`} aria-label="Pagination" {...props}>
      {/* Prev */}
      <button
        className="ui-pagination__btn ui-pagination__prev"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        aria-label="Previous page"
        type="button"
      >
        <svg viewBox="0 0 16 16" fill="none"><path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>

      {range.map((item, i) =>
        item === '...' ? (
          <span key={`e${i}`} className="ui-pagination__ellipsis">…</span>
        ) : (
          <button
            key={item}
            className={`ui-pagination__btn${item === page ? ' ui-pagination__btn--active' : ''}`}
            onClick={() => onChange(item as number)}
            aria-current={item === page ? 'page' : undefined}
            type="button"
          >
            {item}
          </button>
        ),
      )}

      {/* Next */}
      <button
        className="ui-pagination__btn ui-pagination__next"
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
        aria-label="Next page"
        type="button"
      >
        <svg viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
    </nav>
  );
}

function generateRange(current: number, total: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 3) return [1, 2, 3, 4, '...', total];
  if (current >= total - 2) return [1, '...', total - 3, total - 2, total - 1, total];
  return [1, '...', current - 1, current, current + 1, '...', total];
}
