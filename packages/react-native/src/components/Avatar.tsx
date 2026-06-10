import { useState } from 'react';
import { View, Text, Image, type ViewProps } from 'react-native';
import { theme, type ThemeColors } from '../theme';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';
export type AvatarShape = 'rounded' | 'circle';

export interface AvatarProps extends ViewProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: AvatarSize;
  shape?: AvatarShape;
  colors?: ThemeColors;
}

const sizeMap = {
  sm: { size: 32, fontSize: 12, radius: theme.radii.sm },
  md: { size: 40, fontSize: 14, radius: theme.radii.md },
  lg: { size: 48, fontSize: 16, radius: theme.radii.md },
  xl: { size: 64, fontSize: 18, radius: theme.radii.lg },
};

/**
 * User avatar with image and initials fallback.
 */
export function Avatar({
  src,
  alt = '',
  fallback,
  size = 'md',
  shape = 'rounded',
  style,
  colors = theme.colors,
  ...props
}: AvatarProps) {
  const [imgError, setImgError] = useState(false);
  const s = sizeMap[size];
  const initials = fallback || alt.slice(0, 2).toUpperCase();
  const showImage = src && !imgError;
  const borderRadius = shape === 'circle' ? theme.radii.full : s.radius;

  return (
    <View
      style={[
        {
          width: s.size,
          height: s.size,
          borderRadius,
          overflow: 'hidden',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.bgMuted,
        },
        style,
      ]}
      accessibilityRole="image"
      accessibilityLabel={alt || fallback || 'Avatar'}
      {...props}
    >
      {showImage ? (
        <Image
          source={{ uri: src }}
          style={{ width: s.size, height: s.size }}
          onError={() => setImgError(true)}
          resizeMode="cover"
        />
      ) : (
        <Text
          style={{
            fontSize: s.fontSize,
            fontWeight: '600',
            color: colors.primary,
          }}
        >
          {initials}
        </Text>
      )}
    </View>
  );
}
