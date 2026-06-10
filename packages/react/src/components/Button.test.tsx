import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
  describe('Rendering', () => {
    it('renders children correctly', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    });

    it('renders with default primary variant', () => {
      render(<Button>Primary</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('ui-btn--primary');
    });

    it('renders with custom variant', () => {
      render(<Button variant="secondary">Secondary</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('ui-btn--secondary');
    });

    it('renders all variants', () => {
      const variants = ['primary', 'secondary', 'ghost', 'destructive'] as const;
      variants.forEach((variant) => {
        const { unmount } = render(<Button variant={variant}>Test</Button>);
        const button = screen.getByRole('button');
        expect(button).toHaveClass(`ui-btn--${variant}`);
        unmount();
      });
    });
  });

  describe('Sizes', () => {
    it('renders with default md size (no size class)', () => {
      render(<Button>Medium</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('ui-btn');
      expect(button).not.toHaveClass('ui-btn--sm');
      expect(button).not.toHaveClass('ui-btn--lg');
    });

    it('renders with sm size', () => {
      render(<Button size="sm">Small</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('ui-btn--sm');
    });

    it('renders with lg size', () => {
      render(<Button size="lg">Large</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('ui-btn--lg');
    });
  });

  describe('States', () => {
    it('renders as disabled', () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveClass('ui-btn--disabled');
    });

    it('renders in loading state', () => {
      render(<Button loading>Loading</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('ui-btn--loading');
      expect(button).toHaveAttribute('aria-busy', 'true');
      expect(button).toBeDisabled();
    });

    it('disables button when loading', () => {
      render(<Button loading>Loading</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });
  });

  describe('Styling', () => {
    it('renders with block class when block prop is true', () => {
      render(<Button block>Full Width</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('ui-btn--block');
    });

    it('renders with icon-only class when iconOnly prop is true', () => {
      render(<Button iconOnly aria-label="Icon button">★</Button>);
      const button = screen.getByRole('button', { name: /icon button/i });
      expect(button).toHaveClass('ui-btn--icon-only');
    });

    it('applies custom className', () => {
      render(<Button className="custom-class">Custom</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
      expect(button).toHaveClass('ui-btn');
    });
  });

  describe('Interaction', () => {
    it('calls onClick when clicked', () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click</Button>);
      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', () => {
      const handleClick = vi.fn();
      render(<Button disabled onClick={handleClick}>Disabled</Button>);
      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('does not call onClick when loading', () => {
      const handleClick = vi.fn();
      render(<Button loading onClick={handleClick}>Loading</Button>);
      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('has correct role', () => {
      render(<Button>Button</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('supports aria-label', () => {
      render(<Button aria-label="Close">X</Button>);
      expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
    });

    it('supports aria-describedby', () => {
      render(
        <>
          <Button aria-describedby="description">Button</Button>
          <div id="description">Description</div>
        </>
      );
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-describedby', 'description');
    });
  });

  describe('Forward Ref', () => {
    it('forwards ref to button element', () => {
      const ref = { current: null };
      render(<Button ref={ref}>Button</Button>);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });

  describe('HTML Attributes', () => {
    it('passes through HTML button attributes', () => {
      render(
        <Button type="submit" form="my-form" data-testid="submit">
          Submit
        </Button>
      );
      const button = screen.getByTestId('submit');
      expect(button).toHaveAttribute('type', 'submit');
      expect(button).toHaveAttribute('form', 'my-form');
    });
  });
});
