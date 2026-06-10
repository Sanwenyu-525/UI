import { useState, type ReactNode, type HTMLAttributes } from 'react';

export interface TabItem {
  key: string;
  label: string;
  /** Optional badge count */
  count?: number;
  /** Disable this tab */
  disabled?: boolean;
  /** Panel content */
  children: ReactNode;
}

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Tab items */
  items: TabItem[];
  /** Active key (controlled) */
  activeKey?: string;
  /** Default active key (uncontrolled) */
  defaultActiveKey?: string;
  /** Change callback */
  onChange?: (key: string) => void;
}

/** Tabbed content panels. */
export function Tabs({
  items,
  activeKey: controlledKey,
  defaultActiveKey,
  onChange,
  className = '',
  ...props
}: TabsProps) {
  const [internalKey, setInternalKey] = useState(defaultActiveKey ?? items[0]?.key);
  const activeKey = controlledKey ?? internalKey;

  const handleChange = (key: string) => {
    if (controlledKey === undefined) setInternalKey(key);
    onChange?.(key);
  };

  return (
    <div className={`ui-tabs ${className}`} {...props}>
      <div className="ui-tabs__list" role="tablist">
        {items.map((item) => (
          <button
            key={item.key}
            role="tab"
            className={`ui-tabs__trigger${activeKey === item.key ? ' ui-tabs__trigger--active' : ''}`}
            aria-selected={activeKey === item.key}
            disabled={item.disabled}
            onClick={() => handleChange(item.key)}
            type="button"
          >
            {item.label}
            {item.count !== undefined && (
              <span className="ui-tabs__count">{item.count}</span>
            )}
          </button>
        ))}
      </div>
      {items.map((item) => (
        <div
          key={item.key}
          role="tabpanel"
          className="ui-tabs__panel"
          hidden={activeKey !== item.key}
        >
          {activeKey === item.key && item.children}
        </div>
      ))}
    </div>
  );
}
