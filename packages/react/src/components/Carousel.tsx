import { useState, useEffect, useCallback, forwardRef, type HTMLAttributes, type ReactNode } from 'react';

export interface CarouselSlide {
  id: string | number;
  content: ReactNode;
  alt?: string;
}

export interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
  /** Array of slides to display */
  slides: CarouselSlide[];
  /** Auto-rotate interval in ms (0 to disable) */
  autoPlay?: number;
  /** Show navigation arrows */
  showArrows?: boolean;
  /** Show dot indicators */
  showIndicators?: boolean;
  /** Show play/pause button when autoPlay is enabled */
  showPlayPause?: boolean;
  /** Callback when slide changes */
  onSlideChange?: (index: number) => void;
}

/**
 * Rotating content display with navigation controls.
 */
export const Carousel = forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      slides,
      autoPlay = 0,
      showArrows = true,
      showIndicators = true,
      showPlayPause = true,
      onSlideChange,
      className = '',
      ...props
    },
    ref
  ) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(autoPlay > 0);

    const goToSlide = useCallback(
      (index: number) => {
        const newIndex = (index + slides.length) % slides.length;
        setCurrentIndex(newIndex);
        onSlideChange?.(newIndex);
      },
      [slides.length, onSlideChange]
    );

    const goNext = useCallback(() => goToSlide(currentIndex + 1), [currentIndex, goToSlide]);

    const goPrev = useCallback(() => goToSlide(currentIndex - 1), [currentIndex, goToSlide]);

    const togglePlay = useCallback(() => setIsPlaying((prev) => !prev), []);

    useEffect(() => {
      if (!isPlaying || autoPlay <= 0) return;

      const interval = setInterval(goNext, autoPlay);
      return () => clearInterval(interval);
    }, [isPlaying, autoPlay, goNext]);

    return (
      <div
        ref={ref}
        className={`ui-carousel ${className}`}
        role="region"
        aria-label="Carousel"
        aria-roledescription="carousel"
        {...props}
      >
        <div className="ui-carousel__track" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="ui-carousel__slide"
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${slides.length}`}
              aria-hidden={index !== currentIndex}
            >
              {slide.content}
            </div>
          ))}
        </div>

        {showArrows && slides.length > 1 && (
          <>
            <button
              className="ui-carousel__arrow ui-carousel__arrow--prev"
              onClick={goPrev}
              aria-label="Previous slide"
              type="button"
            >
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 4L6 10L12 16" />
              </svg>
            </button>
            <button
              className="ui-carousel__arrow ui-carousel__arrow--next"
              onClick={goNext}
              aria-label="Next slide"
              type="button"
            >
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 4L14 10L8 16" />
              </svg>
            </button>
          </>
        )}

        {showIndicators && slides.length > 1 && (
          <div className="ui-carousel__indicators" role="tablist" aria-label="Slide indicators">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                className={`ui-carousel__dot ${index === currentIndex ? 'ui-carousel__dot--active' : ''}`}
                onClick={() => goToSlide(index)}
                role="tab"
                aria-selected={index === currentIndex}
                aria-label={`Go to slide ${index + 1}`}
                type="button"
              />
            ))}
          </div>
        )}

        {showPlayPause && autoPlay > 0 && slides.length > 1 && (
          <button
            className="ui-carousel__play-pause"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause autoplay' : 'Start autoplay'}
            type="button"
          >
            {isPlaying ? (
              <svg viewBox="0 0 16 16" fill="currentColor">
                <rect x="3" y="2" width="4" height="12" rx="1" />
                <rect x="9" y="2" width="4" height="12" rx="1" />
              </svg>
            ) : (
              <svg viewBox="0 0 16 16" fill="currentColor">
                <path d="M4 2.5L13 8L4 13.5V2.5Z" />
              </svg>
            )}
          </button>
        )}
      </div>
    );
  }
);

Carousel.displayName = 'Carousel';
