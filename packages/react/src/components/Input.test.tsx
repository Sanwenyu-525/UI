import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input, Textarea, Field } from './Input';

describe('Input Component', () => {
  describe('Rendering', () => {
    it('renders input element', () => {
      render(<Input />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('renders with default md size', () => {
      render(<Input />);
      const input = screen.getByRole('textbox');
      expect(input.closest('.ui-input-wrap')).toHaveClass('ui-input-wrap');
      expect(input.closest('.ui-input-wrap')).not.toHaveClass('ui-input-wrap--sm');
    });

    it('renders with sm size', () => {
      render(<Input size="sm" />);
      const wrapper = screen.getByRole('textbox').closest('.ui-input-wrap');
      expect(wrapper).toHaveClass('ui-input-wrap--sm');
    });

    it('renders with lg size', () => {
      render(<Input size="lg" />);
      const wrapper = screen.getByRole('textbox').closest('.ui-input-wrap');
      expect(wrapper).toHaveClass('ui-input-wrap--lg');
    });

    it('applies custom className', () => {
      render(<Input className="custom-class" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('custom-class');
    });
  });

  describe('States', () => {
    it('renders as disabled', () => {
      render(<Input disabled />);
      expect(screen.getByRole('textbox')).toBeDisabled();
      expect(screen.getByRole('textbox').closest('.ui-input-wrap')).toHaveClass('ui-input-wrap--disabled');
    });

    it('renders in error state', () => {
      render(<Input error />);
      const wrapper = screen.getByRole('textbox').closest('.ui-input-wrap');
      expect(wrapper).toHaveClass('ui-input-wrap--error');
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
    });

    it('renders with value', () => {
      render(<Input value="test value" readOnly />);
      expect(screen.getByRole('textbox')).toHaveValue('test value');
    });
  });

  describe('Affixes', () => {
    it('renders prefix', () => {
      render(<Input prefix={<span data-testid="prefix">$</span>} />);
      expect(screen.getByTestId('prefix')).toBeInTheDocument();
      expect(screen.getByTestId('prefix').closest('.ui-input-wrap__prefix')).toBeInTheDocument();
    });

    it('renders suffix', () => {
      render(<Input suffix={<span data-testid="suffix">.com</span>} />);
      expect(screen.getByTestId('suffix')).toBeInTheDocument();
      expect(screen.getByTestId('suffix').closest('.ui-input-wrap__suffix')).toBeInTheDocument();
    });

    it('renders both prefix and suffix', () => {
      render(
        <Input
          prefix={<span data-testid="prefix">pre</span>}
          suffix={<span data-testid="suffix">suf</span>}
        />
      );
      expect(screen.getByTestId('prefix')).toBeInTheDocument();
      expect(screen.getByTestId('suffix')).toBeInTheDocument();
    });
  });

  describe('Labels and Helpers', () => {
    it('renders label', () => {
      render(<Input label="Email" />);
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    });

    it('renders required indicator', () => {
      render(<Input label="Name" required />);
      const label = screen.getByText(/name/i);
      expect(label).toHaveClass('ui-field__label--required');
    });

    it('renders helper text', () => {
      render(<Input helperText="Enter your email" />);
      expect(screen.getByText(/enter your email/i)).toBeInTheDocument();
    });

    it('renders error message', () => {
      render(<Input errorMessage="Invalid email" />);
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
    });

    it('error message replaces helper text', () => {
      render(<Input helperText="Help" errorMessage="Error" />);
      expect(screen.getByText(/error/i)).toBeInTheDocument();
      expect(screen.queryByText(/help/i)).not.toBeInTheDocument();
    });

    it('links label and input with id', () => {
      render(<Input label="Username" id="username" />);
      const input = screen.getByLabelText(/username/i);
      expect(input).toHaveAttribute('id', 'username');
    });

    it('auto-generates id from name', () => {
      render(<Input name="email" label="Email" />);
      const input = screen.getByLabelText(/email/i);
      expect(input).toHaveAttribute('id', 'email');
    });
  });

  describe('Accessibility', () => {
    it('sets aria-describedby to error message', () => {
      render(<Input id="email" errorMessage="Required" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-describedby', 'email-error');
    });

    it('sets aria-describedby to helper text', () => {
      render(<Input id="email" helperText="Help text" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-describedby', 'email-helper');
    });

    it('prefers error message over helper for aria-describedby', () => {
      render(<Input id="email" helperText="Help" errorMessage="Error" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-describedby', 'email-error');
    });
  });

  describe('Interaction', () => {
    it('calls onChange when value changes', () => {
      const handleChange = vi.fn();
      render(<Input onChange={handleChange} />);
      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } });
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('calls onFocus when focused', () => {
      const handleFocus = vi.fn();
      render(<Input onFocus={handleFocus} />);
      fireEvent.focus(screen.getByRole('textbox'));
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it('calls onBlur when blurred', () => {
      const handleBlur = vi.fn();
      render(<Input onBlur={handleBlur} />);
      const input = screen.getByRole('textbox');
      fireEvent.focus(input);
      fireEvent.blur(input);
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe('Forward Ref', () => {
    it('forwards ref to input element', () => {
      const ref = { current: null };
      render(<Input ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });
  });

  describe('HTML Attributes', () => {
    it('passes through HTML input attributes', () => {
      render(
        <Input
          type="email"
          placeholder="Enter email"
          maxLength={100}
          data-testid="email"
        />
      );
      const input = screen.getByTestId('email');
      expect(input).toHaveAttribute('type', 'email');
      expect(input).toHaveAttribute('placeholder', 'Enter email');
      expect(input).toHaveAttribute('maxlength', '100');
    });
  });
});

describe('Textarea Component', () => {
  it('renders textarea element', () => {
    render(<Textarea />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders with custom rows', () => {
    render(<Textarea rows={5} />);
    expect(screen.getByRole('textbox')).toHaveAttribute('rows', '5');
  });

  it('renders label', () => {
    render(<Textarea label="Description" />);
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
  });

  it('renders in error state', () => {
    render(<Textarea error />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('calls onChange when value changes', () => {
    const handleChange = vi.fn();
    render(<Textarea onChange={handleChange} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});

describe('Field Component', () => {
  it('renders label', () => {
    render(
      <Field label="Test Label">
        <input type="text" />
      </Field>
    );
    expect(screen.getByText(/test label/i)).toBeInTheDocument();
  });

  it('renders required indicator', () => {
    render(
      <Field label="Required" required>
        <input type="text" />
      </Field>
    );
    expect(screen.getByText(/required/i)).toHaveClass('ui-field__label--required');
  });

  it('renders helper text', () => {
    render(
      <Field helperText="Help text">
        <input type="text" />
      </Field>
    );
    expect(screen.getByText(/help text/i)).toBeInTheDocument();
  });

  it('renders error message with alert role', () => {
    render(
      <Field error="Error message">
        <input type="text" />
      </Field>
    );
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText(/error message/i)).toBeInTheDocument();
  });

  it('error replaces helper text', () => {
    render(
      <Field helperText="Help" error="Error">
        <input type="text" />
      </Field>
    );
    expect(screen.queryByText(/help/i)).not.toBeInTheDocument();
    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });

  it('links label to input via htmlFor', () => {
    render(
      <Field label="Test" id="test-input">
        <input type="text" id="test-input" />
      </Field>
    );
    const label = screen.getByText(/test/i);
    expect(label).toHaveAttribute('for', 'test-input');
  });

  it('applies custom className', () => {
    render(
      <Field className="custom-field">
        <input type="text" />
      </Field>
    );
    expect(screen.getByText(/custom-field/i).closest('.ui-field')).toHaveClass('custom-field');
  });
});
