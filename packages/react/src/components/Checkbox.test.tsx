import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from './Checkbox';
import { Radio, RadioGroup } from './Radio';
import { Switch } from './Switch';

describe('Checkbox Component', () => {
  describe('Rendering', () => {
    it('renders checkbox input', () => {
      render(<Checkbox />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<Checkbox label="Accept terms" />);
      expect(screen.getByLabelText(/accept terms/i)).toBeInTheDocument();
    });

    it('renders with description', () => {
      render(<Checkbox label="Option" description="This is a description" />);
      expect(screen.getByText(/this is a description/i)).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<Checkbox className="custom-checkbox" />);
      expect(screen.getByRole('checkbox').closest('.ui-checkbox')).toHaveClass('custom-checkbox');
    });
  });

  describe('States', () => {
    it('renders as unchecked by default', () => {
      render(<Checkbox />);
      expect(screen.getByRole('checkbox')).not.toBeChecked();
    });

    it('renders as checked', () => {
      render(<Checkbox checked readOnly />);
      expect(screen.getByRole('checkbox')).toBeChecked();
    });

    it('renders as disabled', () => {
      render(<Checkbox disabled />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeDisabled();
      expect(checkbox.closest('.ui-checkbox')).toHaveClass('ui-checkbox--disabled');
    });

    it('can be controlled', () => {
      const handleChange = vi.fn();
      render(<Checkbox checked onChange={handleChange} />);
      fireEvent.click(screen.getByRole('checkbox'));
      expect(handleChange).toHaveBeenCalledTimes(1);
    });
  });

  describe('Indeterminate', () => {
    it('supports indeterminate state', () => {
      const ref = { current: null };
      render(<Checkbox indeterminate ref={ref} />);
      expect(ref.current?.indeterminate).toBe(true);
    });

    it('clears indeterminate when unchecked', () => {
      const ref = { current: null };
      render(<Checkbox indeterminate={false} ref={ref} />);
      expect(ref.current?.indeterminate).toBe(false);
    });
  });

  describe('Interaction', () => {
    it('calls onChange when clicked', () => {
      const handleChange = vi.fn();
      render(<Checkbox onChange={handleChange} />);
      fireEvent.click(screen.getByRole('checkbox'));
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('does not call onChange when disabled', () => {
      const handleChange = vi.fn();
      render(<Checkbox disabled onChange={handleChange} />);
      fireEvent.click(screen.getByRole('checkbox'));
      expect(handleChange).not.toHaveBeenCalled();
    });

    it('toggles on click', () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeChecked();
      fireEvent.click(checkbox);
      expect(checkbox).toBeChecked();
    });
  });

  describe('Accessibility', () => {
    it('links label to checkbox via htmlFor', () => {
      render(<Checkbox id="terms" label="Accept terms" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('id', 'terms');
    });

    it('supports aria-label', () => {
      render(<Checkbox aria-label="Toggle feature" />);
      expect(screen.getByRole('checkbox', { name: /toggle feature/i })).toBeInTheDocument();
    });
  });

  describe('Forward Ref', () => {
    it('forwards ref to checkbox input', () => {
      const ref = { current: null };
      render(<Checkbox ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });
  });
});

describe('Radio Component', () => {
  describe('Rendering', () => {
    it('renders radio input', () => {
      render(
        <RadioGroup name="test">
          <Radio value="option1" />
        </RadioGroup>
      );
      expect(screen.getByRole('radio')).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(
        <RadioGroup name="test">
          <Radio value="option1" label="Option 1" />
        </RadioGroup>
      );
      expect(screen.getByLabelText(/option 1/i)).toBeInTheDocument();
    });

    it('renders with description', () => {
      render(
        <RadioGroup name="test">
          <Radio value="option1" label="Option" description="Description text" />
        </RadioGroup>
      );
      expect(screen.getByText(/description text/i)).toBeInTheDocument();
    });
  });

  describe('States', () => {
    it('renders as unchecked by default', () => {
      render(
        <RadioGroup name="test">
          <Radio value="option1" />
        </RadioGroup>
      );
      expect(screen.getByRole('radio')).not.toBeChecked();
    });

    it('renders as checked when selected', () => {
      render(
        <RadioGroup name="test" value="option1">
          <Radio value="option1" />
          <Radio value="option2" />
        </RadioGroup>
      );
      expect(screen.getByRole('radio', { name: /option 1/i })).toBeChecked();
      expect(screen.getByRole('radio', { name: /option 2/i })).not.toBeChecked();
    });

    it('renders as disabled', () => {
      render(
        <RadioGroup name="test">
          <Radio value="option1" disabled />
        </RadioGroup>
      );
      const radio = screen.getByRole('radio');
      expect(radio).toBeDisabled();
      expect(radio.closest('.ui-radio')).toHaveClass('ui-radio--disabled');
    });
  });

  describe('RadioGroup', () => {
    it('renders group with role="radiogroup"', () => {
      render(
        <RadioGroup name="test">
          <Radio value="1" label="1" />
          <Radio value="2" label="2" />
        </RadioGroup>
      );
      expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    });

    it('renders group label', () => {
      render(
        <RadioGroup name="test" label="Choose one">
          <Radio value="1" />
        </RadioGroup>
      );
      expect(screen.getByText(/choose one/i)).toBeInTheDocument();
    });

    it('disables all radios when group is disabled', () => {
      render(
        <RadioGroup name="test" disabled>
          <Radio value="1" />
          <Radio value="2" />
        </RadioGroup>
      );
      const radios = screen.getAllByRole('radio');
      radios.forEach((radio) => expect(radio).toBeDisabled());
    });

    it('supports horizontal layout', () => {
      render(
        <RadioGroup name="test" direction="horizontal">
          <Radio value="1" />
        </RadioGroup>
      );
      expect(screen.getByRole('radiogroup')).toHaveClass('ui-radio-group--horizontal');
    });

    it('supports default value (uncontrolled)', () => {
      render(
        <RadioGroup name="test" defaultValue="2">
          <Radio value="1" label="1" />
          <Radio value="2" label="2" />
        </RadioGroup>
      );
      expect(screen.getByRole('radio', { name: /2/i })).toBeChecked();
    });
  });

  describe('Interaction', () => {
    it('selects radio on click', () => {
      render(
        <RadioGroup name="test">
          <Radio value="1" label="1" />
          <Radio value="2" label="2" />
        </RadioGroup>
      );
      fireEvent.click(screen.getByRole('radio', { name: /2/i }));
      expect(screen.getByRole('radio', { name: /2/i })).toBeChecked();
    });

    it('calls onChange with selected value', () => {
      const handleChange = vi.fn();
      render(
        <RadioGroup name="test" onChange={handleChange}>
          <Radio value="1" label="1" />
          <Radio value="2" label="2" />
        </RadioGroup>
      );
      fireEvent.click(screen.getByRole('radio', { name: /2/i }));
      expect(handleChange).toHaveBeenCalledWith('2');
    });

    it('deselects previous radio when selecting new one', () => {
      render(
        <RadioGroup name="test" defaultValue="1">
          <Radio value="1" label="1" />
          <Radio value="2" label="2" />
        </RadioGroup>
      );
      fireEvent.click(screen.getByRole('radio', { name: /2/i }));
      expect(screen.getByRole('radio', { name: /1/i })).not.toBeChecked();
      expect(screen.getByRole('radio', { name: /2/i })).toBeChecked();
    });

    it('does not select disabled radio', () => {
      const handleChange = vi.fn();
      render(
        <RadioGroup name="test" onChange={handleChange}>
          <Radio value="1" label="1" disabled />
        </RadioGroup>
      );
      fireEvent.click(screen.getByRole('radio', { name: /1/i }));
      expect(handleChange).not.toHaveBeenCalled();
      expect(screen.getByRole('radio', { name: /1/i })).not.toBeChecked();
    });
  });

  describe('Accessibility', () => {
    it('groups radios with same name', () => {
      render(
        <RadioGroup name="choice">
          <Radio value="1" label="1" />
          <Radio value="2" label="2" />
        </RadioGroup>
      );
      const radios = screen.getAllByRole('radio');
      radios.forEach((radio) => expect(radio).toHaveAttribute('name', 'choice'));
    });

    it('supports aria-label on group', () => {
      render(
        <RadioGroup name="test" label="Select option">
          <Radio value="1" />
        </RadioGroup>
      );
      expect(screen.getByRole('radiogroup')).toHaveAttribute('aria-label', 'Select option');
    });
  });
});

describe('Switch Component', () => {
  describe('Rendering', () => {
    it('renders switch with role="switch"', () => {
      render(<Switch />);
      expect(screen.getByRole('switch')).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<Switch label="Enable notifications" />);
      expect(screen.getByLabelText(/enable notifications/i)).toBeInTheDocument();
    });

    it('renders with description', () => {
      render(<Switch label="Toggle" description="Switch description" />);
      expect(screen.getByText(/switch description/i)).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<Switch className="custom-switch" />);
      expect(screen.getByRole('switch').closest('.ui-switch')).toHaveClass('custom-switch');
    });
  });

  describe('States', () => {
    it('renders as unchecked by default', () => {
      render(<Switch />);
      expect(screen.getByRole('switch')).not.toBeChecked();
    });

    it('renders as checked', () => {
      render(<Switch checked readOnly />);
      expect(screen.getByRole('switch')).toBeChecked();
    });

    it('renders as disabled', () => {
      render(<Switch disabled />);
      const switchEl = screen.getByRole('switch');
      expect(switchEl).toBeDisabled();
      expect(switchEl.closest('.ui-switch')).toHaveClass('ui-switch--disabled');
    });
  });

  describe('Interaction', () => {
    it('toggles on click', () => {
      render(<Switch />);
      const switchEl = screen.getByRole('switch');
      expect(switchEl).not.toBeChecked();
      fireEvent.click(switchEl);
      expect(switchEl).toBeChecked();
    });

    it('calls onChange when toggled', () => {
      const handleChange = vi.fn();
      render(<Switch onChange={handleChange} />);
      fireEvent.click(screen.getByRole('switch'));
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('does not toggle when disabled', () => {
      const handleChange = vi.fn();
      render(<Switch disabled onChange={handleChange} />);
      fireEvent.click(screen.getByRole('switch'));
      expect(handleChange).not.toBeCalled();
      expect(screen.getByRole('switch')).not.toBeChecked();
    });

    it('supports controlled mode', () => {
      const handleChange = vi.fn();
      render(<Switch checked onChange={handleChange} />);
      fireEvent.click(screen.getByRole('switch'));
      expect(handleChange).toHaveBeenCalledWith(expect.any(Object));
    });
  });

  describe('Accessibility', () => {
    it('has switch role', () => {
      render(<Switch />);
      expect(screen.getByRole('switch')).toBeInTheDocument();
    });

    it('links label to switch via htmlFor', () => {
      render(<Switch id="toggle" label="Toggle" />);
      expect(screen.getByRole('switch')).toHaveAttribute('id', 'toggle');
    });

    it('supports aria-label', () => {
      render(<Switch aria-label="Dark mode" />);
      expect(screen.getByRole('switch', { name: /dark mode/i })).toBeInTheDocument();
    });
  });

  describe('Forward Ref', () => {
    it('forwards ref to input element', () => {
      const ref = { current: null };
      render(<Switch ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });
  });
});
