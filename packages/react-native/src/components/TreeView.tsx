import { useState, useCallback } from 'react';
import { View, Text, Pressable, type ViewProps } from 'react-native';
import { theme, type ThemeColors } from '../theme';

export interface TreeNode {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: TreeNode[];
  disabled?: boolean;
}

export interface TreeViewProps extends ViewProps {
  data: TreeNode[];
  selectedIds?: string[];
  onSelectionChange?: (ids: string[]) => void;
  multiple?: boolean;
  checkboxes?: boolean;
  expandedIds?: string[];
  onExpansionChange?: (ids: string[]) => void;
  defaultExpandedIds?: string[];
  colors?: ThemeColors;
}

export interface TreeNodeItemProps {
  node: TreeNode;
  depth: number;
  selectedIds: string[];
  expandedIds: string[];
  multiple: boolean;
  checkboxes: boolean;
  onSelectionChange: (ids: string[]) => void;
  onExpansionChange: (ids: string[]) => void;
  colors: ThemeColors;
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
  expandedIds: controlledExpandedIds,
  onExpansionChange,
  defaultExpandedIds = [],
  style,
  colors = theme.colors,
  ...props
}: TreeViewProps & { colors?: ThemeColors }) {
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
    <View style={[style]} {...props} accessibilityRole="tree">
      {data.map((node) => (
        <TreeNodeItem
          key={node.id}
          node={node}
          depth={0}
          selectedIds={selectedIds}
          expandedIds={expandedIds}
          multiple={multiple}
          checkboxes={checkboxes}
          onSelectionChange={onSelectionChange ?? (() => {})}
          onExpansionChange={handleExpansionChange}
          colors={colors}
        />
      ))}
    </View>
  );
}

function TreeNodeItem({
  node,
  depth,
  selectedIds,
  expandedIds,
  multiple,
  checkboxes,
  onSelectionChange,
  onExpansionChange,
  colors,
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

  return (
    <View accessibilityRole="treeitem" accessibilityState={{ selected: isSelected, expanded: hasChildren ? isExpanded : undefined }}>
      <Pressable
        onPress={handleSelect}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          paddingVertical: 8,
          paddingRight: 12,
          paddingLeft: depth * 20 + 12,
          backgroundColor: isSelected ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
          borderRadius: theme.radii.md,
          opacity: node.disabled ? 0.5 : 1,
        }}
        disabled={node.disabled}
      >
        {hasChildren ? (
          <Pressable
            onPress={toggleExpand}
            style={{
              width: 20,
              height: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            accessibilityLabel={isExpanded ? 'Collapse' : 'Expand'}
          >
            <View
              style={{
                width: 8,
                height: 8,
                borderRightWidth: 2,
                borderBottomWidth: 2,
                borderColor: colors.textSecondary,
                transform: [{ rotate: isExpanded ? '45deg' : '-45deg' }, { translateY: isExpanded ? -2 : 2 }],
              }}
            />
          </Pressable>
        ) : (
          <View style={{ width: 20 }} />
        )}

        {checkboxes && (
          <View
            style={{
              width: 18,
              height: 18,
              borderWidth: 2,
              borderColor: isSelected ? colors.primary : colors.border,
              backgroundColor: isSelected ? colors.primary : 'transparent',
              borderRadius: 4,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {isSelected && (
              <View style={{ width: 8, height: 8, backgroundColor: '#ffffff', borderRadius: 2 }} />
            )}
          </View>
        )}

        {node.icon && <View style={{ width: 16, height: 16 }}>{node.icon}</View>}

        <Text style={{ flex: 1, fontSize: 14, color: isSelected ? colors.primary : colors.textPrimary, fontWeight: isSelected ? '500' : '400' }}>
          {node.label}
        </Text>
      </Pressable>

      {hasChildren && isExpanded && (
        <View accessibilityRole="group">
          {node.children!.map((child) => (
            <TreeNodeItem
              key={child.id}
              node={child}
              depth={depth + 1}
              selectedIds={selectedIds}
              expandedIds={expandedIds}
              multiple={multiple}
              checkboxes={checkboxes}
              onSelectionChange={onSelectionChange}
              onExpansionChange={onExpansionChange}
              colors={colors}
            />
          ))}
        </View>
      )}
    </View>
  );
}
