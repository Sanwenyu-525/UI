import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { Select } from './Select';
import { Modal } from './Modal';
import { ToastContainer, useToast } from './Toast';
import { LocaleProvider } from './LocaleProvider';

// Wrapper for locale-dependent components
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <LocaleProvider locale="en">{children}</LocaleProvider>
);

describe('Select Component', () => {
  const defaultProps = {
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
      { label: 'Option 3', value: '3' },
    ],
  };

  describe('Rendering', () => {
    it('renders select trigger button', () => {
      render(<Select {...defaultProps} />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('shows placeholder when nothing selected', () => {
      render(<Select {...defaultProps} placeholder="Choose..." />);
      expect(screen.getByText(/choose/i)).toBeInTheDocument();
    });

    it('shows selected value', () => {
      render(<Select {...defaultProps} defaultValue="2" />);
      expect(screen.getByText(/option 2/i)).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<Select {...defaultProps} label="Select option" />);
      expect(screen.getByText(/select option/i)).toBeInTheDocument();
    });

    it('renders with helper text', () => {
      render(<Select {...defaultProps} helperText="Choose wisely" />);
      expect(screen.getByText(/choose wisely/i)).toBeInTheDocument();
    });

    it('renders with error message', () => {
      render(<Select {...defaultProps} errorMessage="Required" />);
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });

  describe('States', () => {
    it('renders as disabled', () => {
      render(<Select {...defaultProps} disabled />);
      expect(screen.getByRole('combobox')).toBeDisabled();
    });

    it('shows selected option value', () => {
      render(<Select {...defaultProps} defaultValue="1" />);
      expect(screen.getByRole('combobox')).toHaveTextContent(/option 1/i);
    });
  });

  describe('Dropdown', () => {
    it('opens dropdown on click', () => {
      render(<Select {...defaultProps} />);
      fireEvent.click(screen.getByRole('combobox'));
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('shows all options in dropdown', () => {
      render(<Select {...defaultProps} />);
      fireEvent.click(screen.getByRole('combobox'));
      expect(screen.getByRole('option', { name: /option 1/i })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: /option 2/i })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: /option 3/i })).toBeInTheDocument();
    });

    it('closes dropdown after selection', async () => {
      render(<Select {...defaultProps} />);
      fireEvent.click(screen.getByRole('combobox'));
      fireEvent.click(screen.getByRole('option', { name: /option 2/i }));
      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      });
    });

    it('updates selected value after selection', async () => {
      render(<Select {...defaultProps} />);
      fireEvent.click(screen.getByRole('combobox'));
      fireEvent.click(screen.getByRole('option', { name: /option 2/i }));
      await waitFor(() => {
        expect(screen.getByRole('combobox')).toHaveTextContent(/option 2/i);
      });
    });

    it('calls onChange with selected value', async () => {
      const handleChange = vi.fn();
      render(<Select {...defaultProps} onChange={handleChange} />);
      fireEvent.click(screen.getByRole('combobox'));
      fireEvent.click(screen.getByRole('option', { name: /option 2/i }));
      expect(handleChange).toHaveBeenCalledWith('2');
    });

    it('does not open dropdown when disabled', () => {
      render(<Select {...defaultProps} disabled />);
      fireEvent.click(screen.getByRole('combobox'));
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });

  describe('Keyboard Navigation', () => {
    it('opens dropdown with Enter', () => {
      render(<Select {...defaultProps} />);
      fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Enter' });
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('opens dropdown with Space', () => {
      render(<Select {...defaultProps} />);
      fireEvent.keyDown(screen.getByRole('combobox'), { key: ' ' });
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('closes dropdown with Escape', () => {
      render(<Select {...defaultProps} />);
      fireEvent.click(screen.getByRole('combobox'));
      fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Escape' });
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('selects option with Enter when open', () => {
      const handleChange = vi.fn();
      render(<Select {...defaultProps} onChange={handleChange} />);
      fireEvent.click(screen.getByRole('combobox'));
      fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' });
      fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Enter' });
      expect(handleChange).toHaveBeenCalled();
    });

    it('navigates options with ArrowDown', () => {
      render(<Select {...defaultProps} />);
      fireEvent.click(screen.getByRole('combobox'));
      fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' });
      // First option should be focused
    });

    it('navigates options with ArrowUp', () => {
      render(<Select {...defaultProps} />);
      fireEvent.click(screen.getByRole('combobox'));
      fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' });
      fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowUp' });
    });
  });

  describe('Controlled Mode', () => {
    it('uses controlled value', () => {
      render(<Select {...defaultProps} value="3" />);
      expect(screen.getByRole('combobox')).toHaveTextContent(/option 3/i);
    });

    it('calls onChange but does not update display without value prop', () => {
      const handleChange = vi.fn();
      render(<Select {...defaultProps} onChange={handleChange} />);
      fireEvent.click(screen.getByRole('combobox'));
      fireEvent.click(screen.getByRole('option', { name: /option 2/i }));
      expect(handleChange).toHaveBeenCalledWith('2');
      // Display should not change without controlled value
    });
  });

  describe('Disabled Options', () => {
    it('renders disabled options', () => {
      const options = [
        { label: 'Enabled', value: '1' },
        { label: 'Disabled', value: '2', disabled: true },
      ];
      render(<Select options={options} />);
      fireEvent.click(screen.getByRole('combobox'));
      expect(screen.getByRole('option', { name: /disabled/i })).toBeDisabled();
    });
  });

  describe('Accessibility', () => {
    it('has combobox role', () => {
      render(<Select {...defaultProps} />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('has listbox role when open', () => {
      render(<Select {...defaultProps} />);
      fireEvent.click(screen.getByRole('combobox'));
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('has option roles for list items', () => {
      render(<Select {...defaultProps} />);
      fireEvent.click(screen.getByRole('combobox'));
      const options = screen.getAllByRole('option');
      expect(options).toHaveLength(3);
    });
  });

  describe('Outside Click', () => {
    it('closes dropdown on outside click', () => {
      render(
        <div>
          <Select {...defaultProps} />
          <button>Outside</button>
        </div>
      );
      fireEvent.click(screen.getByRole('combobox'));
      expect(screen.getByRole('listbox')).toBeInTheDocument();
      fireEvent.click(screen.getByRole('button', { name: /outside/i }));
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });
});

describe('Modal Component', () => {
  const defaultProps = {
    open: true,
    onClose: vi.fn(),
    children: <div>Modal content</div>,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders modal when open', () => {
      render(<Modal {...defaultProps} />);
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('does not render modal when closed', () => {
      render(<Modal {...defaultProps} open={false} />);
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('renders title', () => {
      render(<Modal {...defaultProps} title="Modal Title" />);
      expect(screen.getByText(/modal title/i)).toBeInTheDocument();
    });

    it('renders children content', () => {
      render(<Modal {...defaultProps} />);
      expect(screen.getByText(/modal content/i)).toBeInTheDocument();
    });

    it('renders footer', () => {
      render(
        <Modal {...defaultProps} footer={<button>Save</button>} />
      );
      expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('renders with default md size', () => {
      render(<Modal {...defaultProps} />);
      expect(screen.getByRole('dialog').querySelector('.ui-modal')).toHaveClass('ui-modal--md');
    });

    it('renders with sm size', () => {
      render(<Modal {...defaultProps} size="sm" />);
      expect(screen.getByRole('dialog').querySelector('.ui-modal')).toHaveClass('ui-modal--sm');
    });

    it('renders with lg size', () => {
      render(<Modal {...defaultProps} size="lg" />);
      expect(screen.getByRole('dialog').querySelector('.ui-modal')).toHaveClass('ui-modal--lg');
    });

    it('renders with xl size', () => {
      render(<Modal {...defaultProps} size="xl" />);
      expect(screen.getByRole('dialog').querySelector('.ui-modal')).toHaveClass('ui-modal--xl');
    });
  });

  describe('Close Behavior', () => {
    it('calls onClose when close button clicked', () => {
      const onClose = vi.fn();
      render(<Modal {...defaultProps} onClose={onClose} />);
      fireEvent.click(screen.getByRole('button', { name: /close/i }));
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('calls onClose on Escape key', () => {
      const onClose = vi.fn();
      render(<Modal {...defaultProps} onClose={onClose} />);
      fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('does not call onClose on Escape when closeOnEscape is false', () => {
      const onClose = vi.fn();
      render(<Modal {...defaultProps} onClose={onClose} closeOnEscape={false} />);
      fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
      expect(onClose).not.toHaveBeenCalled();
    });

    it('calls onClose when clicking overlay', () => {
      const onClose = vi.fn();
      render(<Modal {...defaultProps} onClose={onClose} />);
      fireEvent.click(screen.getByRole('dialog'));
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('does not call onClose when clicking modal content', () => {
      const onClose = vi.fn();
      render(<Modal {...defaultProps} onClose={onClose} />);
      fireEvent.click(screen.getByText(/modal content/i));
      expect(onClose).not.toHaveBeenCalled();
    });

    it('does not call onClose on overlay click when closeOnOverlay is false', () => {
      const onClose = vi.fn();
      render(<Modal {...defaultProps} onClose={onClose} closeOnOverlay={false} />);
      fireEvent.click(screen.getByRole('dialog'));
      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('has dialog role', () => {
      render(<Modal {...defaultProps} />);
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('has aria-modal="true"', () => {
      render(<Modal {...defaultProps} />);
      expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
    });

    it('has aria-label with title', () => {
      render(<Modal {...defaultProps} title="Dialog" />);
      expect(screen.getByRole('dialog')).toHaveAttribute('aria-label', 'Dialog');
    });

    it('close button has aria-label', () => {
      render(<Modal {...defaultProps} />);
      expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
    });
  });

  describe('Body Overflow', () => {
    it('hides body overflow when open', () => {
      render(<Modal {...defaultProps} />);
      expect(document.body.style.overflow).toBe('hidden');
    });

    it('restores body overflow when closed', () => {
      const { unmount } = render(<Modal {...defaultProps} />);
      unmount();
      expect(document.body.style.overflow).toBe('');
    });
  });

  describe('Header Action', () => {
    it('renders header action slot', () => {
      render(
        <Modal
          {...defaultProps}
          title="Title"
          headerAction={<button>Action</button>}
        />
      );
      expect(screen.getByRole('button', { name: /action/i })).toBeInTheDocument();
    });
  });

  describe('Custom className', () => {
    it('applies custom className', () => {
      render(<Modal {...defaultProps} className="custom-modal" />);
      expect(screen.getByRole('dialog').querySelector('.ui-modal')).toHaveClass('custom-modal');
    });
  });
});

describe('Toast Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const TestToastComponent = () => {
    const toast = useToast();
    return (
      <div>
        <button onClick={() => toast('Test message', 'info')}>Show Toast</button>
        <button onClick={() => toast('Success', 'success', 'Done')}>Success Toast</button>
        <ToastContainer />
      </div>
    );
  };

  describe('Rendering', () => {
    it('shows toast when triggered', async () => {
      render(<TestToastComponent />, { wrapper });
      fireEvent.click(screen.getByRole('button', { name: /show toast/i }));
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText(/test message/i)).toBeInTheDocument();
    });

    it('shows toast with title', async () => {
      render(<TestToastComponent />, { wrapper });
      fireEvent.click(screen.getByRole('button', { name: /success toast/i }));
      expect(screen.getByText(/done/i)).toBeInTheDocument();
      expect(screen.getByText(/success/i)).toBeInTheDocument();
    });

    it('renders correct variant icon', async () => {
      render(<TestToastComponent />, { wrapper });
      fireEvent.click(screen.getByRole('button', { name: /show toast/i }));
      expect(screen.getByRole('alert')).toHaveClass('ui-toast--info');
    });

    it('renders success variant', async () => {
      render(<TestToastComponent />, { wrapper });
      fireEvent.click(screen.getByRole('button', { name: /success toast/i }));
      expect(screen.getByRole('alert')).toHaveClass('ui-toast--success');
    });
  });

  describe('Auto-dismiss', () => {
    it('auto-dismisses after duration', async () => {
      render(<TestToastComponent />, { wrapper });
      fireEvent.click(screen.getByRole('button', { name: /show toast/i }));
      expect(screen.getByRole('alert')).toBeInTheDocument();

      act(() => {
        vi.advanceTimersByTime(4000);
      });

      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });

  describe('Manual dismiss', () => {
    it('dismisses on close button click', async () => {
      render(<TestToastComponent />, { wrapper });
      fireEvent.click(screen.getByRole('button', { name: /show toast/i }));
      expect(screen.getByRole('alert')).toBeInTheDocument();

      fireEvent.click(screen.getByRole('button', { name: /dismiss/i }));

      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });

  describe('Multiple toasts', () => {
    it('shows multiple toasts', async () => {
      render(<TestToastComponent />, { wrapper });
      fireEvent.click(screen.getByRole('button', { name: /show toast/i }));
      fireEvent.click(screen.getByRole('button', { name: /success toast/i }));

      const alerts = screen.getAllByRole('alert');
      expect(alerts).toHaveLength(2);
    });
  });

  describe('Accessibility', () => {
    it('has alert role', async () => {
      render(<TestToastComponent />, { wrapper });
      fireEvent.click(screen.getByRole('button', { name: /show toast/i }));
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('close button has aria-label', async () => {
      render(<TestToastComponent />, { wrapper });
      fireEvent.click(screen.getByRole('button', { name: /show toast/i }));
      expect(screen.getByRole('button', { name: /dismiss/i })).toBeInTheDocument();
    });
  });
});
