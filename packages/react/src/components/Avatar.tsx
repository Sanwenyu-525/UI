import { useState, type HTMLAttributes } from 'react';
import { useLocale } from './LocaleProvider';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';
export type AvatarShape = 'rounded' | 'circle';

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  /** Image source URL */
  src?: string;
  /** Alt text for image */
  alt?: string;
  /** Fallback text (typically initials) */
  fallback?: string;
  /** Size preset */
  size?: AvatarSize;
  /** Shape: rounded square or circle */
  shape?: AvatarShape;
}

/**
 * User avatar with image and initials fallback.
 */
export function Avatar({
  src,
  alt = '',
  fallback,
  size = 'md',
  shape = 'rounded',
  className = '',
  ...props
}: AvatarProps) {
  const [imgError, setImgError] = useState(false);
  const locale = useLocale();

  const classes = [
    'ui-avatar',
    `ui-avatar--${size}`,
    shape === 'circle' && 'ui-avatar--circle',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const showImage = src && !imgError;
  const initials = fallback || alt.slice(0, 2).toUpperCase();

  return (
    <div className={classes} role="img" aria-label={alt || fallback || locale.avatar} {...props}>
      {showImage ? (
        <img
          className="ui-avatar__img"
          src={src}
          alt={alt}
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="ui-avatar__fallback">{initials}</span>
      )}
    </div>
  );
}
