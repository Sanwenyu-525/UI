import { useState, useCallback, type ReactNode } from 'react';

export interface TreeNode {
  id: string;
  label: string;
  icon?: ReactNode;
  children?: TreeNode[];
  disabled?: boolean;
}

export interface TreeViewProps {
  /** Tree data */
  data: TreeNode[];
  /** Selected node IDs */
  selectedIds?: string[];
  /** Callback when selection changes */
  onSelectionChange?: (ids: string[]) => void;
  /** Allow multiple selection */
  multiple?: boolean;
  /** Show checkboxes */
  checkboxes?: boolean;
  /** Show indent lines */
  indented?: boolean;
  /** Expanded node IDs (controlled) */
  expandedIds?: string[];
  /** Callback when expansion changes */
  onExpansionChange?: (ids: string[]) => void;
  /** Default expanded node IDs (uncontrolled) */
  defaultExpandedIds?: string[];
  /** Custom node renderer */
  renderNode?: (node: TreeNode, state: { selected: boolean; expanded: boolean; depth: number }) => ReactNode;
  /** Callback when node is clicked */
  onNodeClick?: (node: TreeNode) => void;
  /** Callback when node is double-clicked */
  onNodeDoubleClick?: (node: TreeNode) => void;
  /** className */
  className?: string;
}

export interface TreeNodeItemProps {
  node: TreeNode;
  depth: number;
  selectedIds: string[];
  expandedIds: string[];
  multiple: boolean;
  checkboxes: boolean;
  indented: boolean;
  renderNode?: TreeViewProps['renderNode'];
  onSelectionChange: (ids: string[]) => void;
  onExpansionChange: (ids: string[]) => void;
  onNodeClick?: (node: TreeNode) => void;
  onNodeDoubleClick?: (node: TreeNode) => void;
}

/**
 * Hierarchical data display with expand/collapse, selection, and checkboxes.
 */
export function TreeView({
  data,
  selectedIds = [],
  onSelectionChange,
  multiple = false,
  checkboxes = false,
  indented = false,
  expandedIds: controlledExpandedIds,
  onExpansionChange,
  defaultExpandedIds = [],
  renderNode,
  onNodeClick,
  onNodeDoubleClick,
  className = '',
}: TreeViewProps) {
  const [internalExpandedIds, setInternalExpandedIds] = useState<string[]>(defaultExpandedIds);

  const expandedIds = controlledExpandedIds ?? internalExpandedIds;

  const handleExpansionChange = useCallback(
    (ids: string[]) => {
      if (onExpansionChange) {
        onExpansionChange(ids);
      } else {
        setInternalExpandedIds(ids);
      }
    },
    [onExpansionChange]
  );

  return (
    <ul className={`ui-tree ${indented ? 'ui-tree--indented' : ''} ${className}`} role="tree">
      {data.map((node) => (
        <TreeNodeItem
          key={node.id}
          node={node}
          depth={0}
          selectedIds={selectedIds}
          expandedIds={expandedIds}
          multiple={multiple}
          checkboxes={checkboxes}
          indented={indented}
          renderNode={renderNode}
          onSelectionChange={onSelectionChange ?? (() => {})}
          onExpansionChange={handleExpansionChange}
          onNodeClick={onNodeClick}
          onNodeDoubleClick={onNodeDoubleClick}
        />
      ))}
    </ul>
  );
}

function TreeNodeItem({
  node,
  depth,
  selectedIds,
  expandedIds,
  multiple,
  checkboxes,
  indented,
  renderNode,
  onSelectionChange,
  onExpansionChange,
  onNodeClick,
  onNodeDoubleClick,
}: TreeNodeItemProps) {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expandedIds.includes(node.id);
  const isSelected = selectedIds.includes(node.id);

  const toggleExpand = useCallback(() => {
    if (hasChildren) {
      const newExpandedIds = isExpanded
        ? expandedIds.filter((id) => id !== node.id)
        : [...expandedIds, node.id];
      onExpansionChange(newExpandedIds);
    }
  }, [hasChildren, isExpanded, expandedIds, node.id, onExpansionChange]);

  const handleSelect = useCallback(() => {
    if (node.disabled) return;

    let newSelectedIds: string[];
    if (multiple) {
      newSelectedIds = isSelected
        ? selectedIds.filter((id) => id !== node.id)
        : [...selectedIds, node.id];
    } else {
      newSelectedIds = isSelected ? [] : [node.id];
    }
    onSelectionChange(newSelectedIds);
  }, [node.disabled, node.id, multiple, isSelected, selectedIds, onSelectionChange]);

  const handleClick = useCallback(() => {
    handleSelect();
    onNodeClick?.(node);
  }, [handleSelect, onNodeClick, node]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'Enter':
        case ' ':
          e.preventDefault();
          handleSelect();
          onNodeClick?.(node);
          break;
        case 'ArrowRight':
          e.preventDefault();
          if (hasChildren && !isExpanded) {
            onExpansionChange([...expandedIds, node.id]);
          }
          break;
        case 'ArrowLeft':
          e.preventDefault();
          if (hasChildren && isExpanded) {
            onExpansionChange(expandedIds.filter((id) => id !== node.id));
          }
          break;
        case 'ArrowDown':
          e.preventDefault();
          // Focus next visible node (simplified)
          const nextSibling = (e.target as HTMLElement).closest('.ui-tree__node')?.nextElementSibling;
          if (nextSibling) {
            (nextSibling.querySelector('.ui-tree__node-content') as HTMLElement)?.focus();
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          // Focus previous visible node (simplified)
          const prevSibling = (e.target as HTMLElement).closest('.ui-tree__node')?.previousElementSibling;
          if (prevSibling) {
            (prevSibling.querySelector('.ui-tree__node-content') as HTMLElement)?.focus();
          }
          break;
      }
    },
    [handleSelect, onNodeClick, node, hasChildren, isExpanded, expandedIds, onExpansionChange]
  );

  if (renderNode) {
    return (
      <li className={`ui-tree__node ${isSelected ? 'ui-tree__node--selected' : ''}`} role="treeitem" aria-expanded={hasChildren ? isExpanded : undefined}>
        {renderNode(node, { selected: isSelected, expanded: isExpanded, depth })}
      </li>
    );
  }

  return (
    <li className={`ui-tree__node ${isSelected ? 'ui-tree__node--selected' : ''}`} role="treeitem" aria-expanded={hasChildren ? isExpanded : undefined}>
      <div
        className="ui-tree__node-content"
        onClick={handleClick}
        onDoubleClick={() => onNodeDoubleClick?.(node)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-selected={isSelected}
        style={{ paddingLeft: `${depth * 20 + 8}px` }}
      >
        {hasChildren ? (
          <button
            className={`ui-tree__expand ${isExpanded ? 'ui-tree__expand--expanded' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleExpand();
            }}
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
            type="button"
          >
            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 2L8 6L4 10" />
            </svg>
          </button>
        ) : (
          <span style={{ width: 20 }} />
        )}

        {checkboxes && (
          <input
            type="checkbox"
            className="ui-tree__checkbox"
            checked={isSelected}
            onChange={handleSelect}
            onClick={(e) => e.stopPropagation()}
            disabled={node.disabled}
          />
        )}

        {node.icon && <span className="ui-tree__icon">{node.icon}</span>}

        <span className="ui-tree__label">{node.label}</span>
      </div>

      {hasChildren && (
        <ul className={`ui-tree__children ${isExpanded ? 'ui-tree__children--expanded' : 'ui-tree__children--collapsed'}`} role="group">
          {node.children!.map((child) => (
            <TreeNodeItem
              key={child.id}
              node={child}
              depth={depth + 1}
              selectedIds={selectedIds}
              expandedIds={expandedIds}
              multiple={multiple}
              checkboxes={checkboxes}
              indented={indented}
              renderNode={renderNode}
              onSelectionChange={onSelectionChange}
              onExpansionChange={onExpansionChange}
              onNodeClick={onNodeClick}
              onNodeDoubleClick={onNodeDoubleClick}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
