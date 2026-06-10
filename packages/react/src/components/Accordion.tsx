import { useState, type ReactNode, type HTMLAttributes } from 'react';

export interface AccordionItem {
  key: string;
  title: string;
  children: ReactNode;
  /** Disable this item */
  disabled?: boolean;
}

export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  items: AccordionItem[];
  /** Allow multiple items open simultaneously */
  multiple?: boolean;
  /** Default open keys */
  defaultOpen?: string[];
  /** Controlled open keys */
  openKeys?: string[];
  /** Change callback */
  onChange?: (keys: string[]) => void;
  /** Visual variant */
  variant?: 'default' | 'separated';
}

/** Expandable content sections. */
export function Accordion({
  items,
  multiple = false,
  defaultOpen = [],
  openKeys: controlledKeys,
  onChange,
  variant = 'default',
  className = '',
  ...props
}: AccordionProps) {
  const [internalKeys, setInternalKeys] = useState<string[]>(defaultOpen);
  const openKeys = controlledKeys ?? internalKeys;

  const toggle = (key: string) => {
    let next: string[];
    if (openKeys.includes(key)) {
      next = openKeys.filter((k) => k !== key);
    } else {
      next = multiple ? [...openKeys, key] : [key];
    }
    if (controlledKeys === undefined) setInternalKeys(next);
    onChange?.(next);
  };

  return (
    <div
      className={`ui-accordion${variant === 'separated' ? ' ui-accordion--separated' : ''} ${className}`}
      {...props}
    >
      {items.map((item) => {
        const isOpen = openKeys.includes(item.key);
        return (
          <div key={item.key} className="ui-accordion__item" data-open={isOpen}>
            <button
              className="ui-accordion__trigger"
              onClick={() => !item.disabled && toggle(item.key)}
              disabled={item.disabled}
              aria-expanded={isOpen}
              type="button"
            >
              <span>{item.title}</span>
              <svg className="ui-accordion__icon" viewBox="0 0 16 16" fill="none">
                <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="ui-accordion__content">
              {isOpen && <div className="ui-accordion__body">{item.children}</div>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
