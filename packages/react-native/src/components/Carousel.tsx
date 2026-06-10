import { useState, useEffect, useCallback, useRef } from 'react';
import { View, Pressable, ScrollView, type ViewProps, type NativeSyntheticEvent, type NativeScrollEvent } from 'react-native';
import { theme, type ThemeColors } from '../theme';

export interface CarouselSlide {
  id: string | number;
  content: React.ReactNode;
}

export interface CarouselProps extends ViewProps {
  slides: CarouselSlide[];
  autoPlay?: number;
  showArrows?: boolean;
  showIndicators?: boolean;
  onSlideChange?: (index: number) => void;
}

/**
 * Rotating content display with navigation controls.
 */
export function Carousel({
  slides,
  autoPlay = 0,
  showArrows = true,
  showIndicators = true,
  onSlideChange,
  style,
  colors = theme.colors,
  ...props
}: CarouselProps & { colors?: ThemeColors }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay > 0);
  const scrollViewRef = useRef<ScrollView>(null);

  const goToSlide = useCallback(
    (index: number) => {
      const newIndex = (index + slides.length) % slides.length;
      setCurrentIndex(newIndex);
      scrollViewRef.current?.scrollTo({ x: newIndex * theme.spacing[320], animated: true });
      onSlideChange?.(newIndex);
    },
    [slides.length, onSlideChange]
  );

  const goNext = useCallback(() => goToSlide(currentIndex + 1), [currentIndex, goToSlide]);

  const goPrev = useCallback(() => goToSlide(currentIndex - 1), [currentIndex, goToSlide]);

  const togglePlay = useCallback(() => setIsPlaying((prev) => !prev), []);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const contentOffset = event.nativeEvent.contentOffset.x;
      const index = Math.round(contentOffset / theme.spacing[320]);
      if (index !== currentIndex) {
        setCurrentIndex(index);
        onSlideChange?.(index);
      }
    },
    [currentIndex, onSlideChange]
  );

  useEffect(() => {
    if (!isPlaying || autoPlay <= 0) return;

    const interval = setInterval(goNext, autoPlay);
    return () => clearInterval(interval);
  }, [isPlaying, autoPlay, goNext]);

  return (
    <View style={[{ position: 'relative', overflow: 'hidden', borderRadius: theme.radii.lg }, style]} {...props}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        style={{ flexDirection: 'row' }}
      >
        {slides.map((slide) => (
          <View key={slide.id} style={{ width: theme.spacing[320] }}>
            {slide.content}
          </View>
        ))}
      </ScrollView>

      {showArrows && slides.length > 1 && (
        <>
          <Pressable
            onPress={goPrev}
            style={{
              position: 'absolute',
              left: 12,
              top: '50%',
              transform: [{ translateY: -20 }],
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: colors.surface,
              borderWidth: 1,
              borderColor: colors.border,
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 3,
              elevation: 2,
            }}
            accessibilityLabel="Previous slide"
          >
            <View style={{ width: 8, height: 8, borderLeftWidth: 2, borderBottomWidth: 2, borderColor: colors.textPrimary, transform: [{ rotate: '45deg' }, { translateX: 2 }] }} />
          </Pressable>

          <Pressable
            onPress={goNext}
            style={{
              position: 'absolute',
              right: 12,
              top: '50%',
              transform: [{ translateY: -20 }],
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: colors.surface,
              borderWidth: 1,
              borderColor: colors.border,
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 3,
              elevation: 2,
            }}
            accessibilityLabel="Next slide"
          >
            <View style={{ width: 8, height: 8, borderRightWidth: 2, borderTopWidth: 2, borderColor: colors.textPrimary, transform: [{ rotate: '45deg' }, { translateX: -2 }] }} />
          </Pressable>
        </>
      )}

      {showIndicators && slides.length > 1 && (
        <View
          style={{
            position: 'absolute',
            bottom: 12,
            left: 0,
            right: 0,
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 8,
          }}
          accessibilityRole="tablist"
          accessibilityLabel="Slide indicators"
        >
          {slides.map((slide, index) => (
            <Pressable
              key={slide.id}
              onPress={() => goToSlide(index)}
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: index === currentIndex ? '#ffffff' : 'rgba(255, 255, 255, 0.5)',
                transform: [{ scale: index === currentIndex ? 1.2 : 1 }],
              }}
              accessibilityRole="tab"
              accessibilityState={{ selected: index === currentIndex }}
              accessibilityLabel={`Go to slide ${index + 1}`}
            />
          ))}
        </View>
      )}
    </View>
  );
}
