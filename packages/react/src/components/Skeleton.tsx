import { type HTMLAttributes } from 'react';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** Shape: 'text' | 'title' | 'circle' | 'rounded' | 'rect' */
  variant?: 'text' | 'title' | 'circle' | 'rounded' | 'rect';
  /** Width (CSS value) */
  width?: string;
  /** Height (CSS value) */
  height?: string;
}

/** Loading placeholder with shimmer animation. */
export function Skeleton({
  variant = 'text',
  width,
  height,
  className = '',
  style,
  ...props
}: SkeletonProps) {
  const classes = [
    'ui-skeleton',
    `ui-skeleton--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={classes}
      style={{ width, height, ...style }}
      aria-hidden="true"
      {...props}
    />
  );
}

/** Card-like skeleton group for richer loading states. */
export interface SkeletonGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of text lines */
  lines?: number;
  /** Show avatar circle */
  avatar?: boolean;
  /** Avatar size in px */
  avatarSize?: number;
}

export function SkeletonGroup({
  lines = 3,
  avatar = false,
  avatarSize = 40,
  className = '',
  ...props
}: SkeletonGroupProps) {
  return (
    <div className={`ui-skeleton-group ${className}`} {...props}>
      {avatar && (
        <div className="ui-skeleton-group__row">
          <Skeleton variant="circle" width={`${avatarSize}px`} height={`${avatarSize}px`} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
            <Skeleton variant="title" width="50%" />
            <Skeleton variant="text-sm" width="30%" />
          </div>
        </div>
      )}
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton
          key={i}
          variant="text"
          width={i === lines - 1 ? '60%' : '100%'}
        />
      ))}
    </div>
  );
}
