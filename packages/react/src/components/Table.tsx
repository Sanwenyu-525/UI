import { type TableHTMLAttributes, type ReactNode } from 'react';

export interface TableColumn<T = any> {
  key: string;
  title: string;
  /** Custom cell renderer */
  render?: (value: any, record: T, index: number) => ReactNode;
  /** Data accessor — defaults to column key */
  dataIndex?: string;
  /** Current sort direction */
  sortOrder?: 'ascending' | 'descending' | null;
  /** Sort callback */
  onSort?: () => void;
  /** Column width */
  width?: string;
}

export interface TableProps<T = any> extends Omit<TableHTMLAttributes<HTMLTableElement>, 'children'> {
  columns: TableColumn<T>[];
  data: T[];
  /** Striped rows */
  striped?: boolean;
  /** Compact padding */
  compact?: boolean;
  /** Empty state text */
  emptyText?: string;
  /** Row key field */
  rowKey?: string;
}

/** Data table with sortable headers. */
export function Table<T extends Record<string, any>>({
  columns,
  data,
  striped = false,
  compact = false,
  emptyText = 'No data',
  rowKey = 'id',
  className = '',
  ...props
}: TableProps<T>) {
  const tableClasses = [
    'ui-table',
    striped && 'ui-table--striped',
    compact && 'ui-table--compact',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={`ui-table-wrap ${className}`}>
      <table className={tableClasses} {...props}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                style={col.width ? { width: col.width } : undefined}
                aria-sort={col.sortOrder ?? undefined}
                onClick={col.onSort}
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="ui-table__empty">
                {emptyText}
              </td>
            </tr>
          ) : (
            data.map((record, i) => (
              <tr key={record[rowKey] ?? i}>
                {columns.map((col) => {
                  const value = col.dataIndex ? record[col.dataIndex] : record[col.key];
                  return (
                    <td key={col.key}>
                      {col.render ? col.render(value, record, i) : value}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
