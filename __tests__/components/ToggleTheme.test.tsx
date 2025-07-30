import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ToggleTheme } from '@/components/ToggleTheme';

const mockSetTheme = jest.fn();
const mockUseTheme = jest.fn();

jest.mock('next-themes', () => ({
  useTheme: () => mockUseTheme(),
}));

jest.mock('lucide-react', () => ({
  Sun: ({ className, ...props }: { className: string }) => (
    <svg data-testid="sun-icon" className={className} {...props}>
      <title>Sun</title>
    </svg>
  ),
  Moon: ({ className, ...props }: { className: string }) => (
    <svg data-testid="moon-icon" className={className} {...props}>
      <title>Moon</title>
    </svg>
  ),
}));

jest.mock('@/components/ui/button', () => ({
  Button: ({
    children,
    ...props
  }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button {...props}>{children}</button>
  ),
}));

jest.mock('@/components/ui/dropdown-menu', () => ({
  DropdownMenu: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dropdown-menu">{children}</div>
  ),
  DropdownMenuTrigger: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dropdown-trigger">{children}</div>
  ),
  DropdownMenuContent: ({
    children,
    align,
  }: {
    children: React.ReactNode;
    align: 'end';
  }) => (
    <div data-testid="dropdown-content" data-align={align}>
      {children}
    </div>
  ),
  DropdownMenuItem: ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
  }) => (
    <button data-testid="dropdown-item" onClick={onClick}>
      {children}
    </button>
  ),
}));

describe('ToggleTheme Component', () => {
  beforeEach(() => {
    mockSetTheme.mockClear();
    mockUseTheme.mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
      resolvedTheme: 'light',
      themes: ['light', 'dark', 'system'],
    });
  });

  describe('Rendering', () => {
    it('renders the toggle button', () => {
      render(<ToggleTheme />);

      const buttons = screen.getAllByRole('button');
      expect(buttons[0]).toBeInTheDocument();
      expect(buttons[0]).toHaveClass('bg-amber-50', 'dark:bg-slate-800');
    });

    it('renders both sun and moon icons', () => {
      render(<ToggleTheme />);

      expect(screen.getByTestId('sun-icon')).toBeInTheDocument();
      expect(screen.getByTestId('moon-icon')).toBeInTheDocument();
    });

    it('has proper accessibility attributes', () => {
      render(<ToggleTheme />);

      const buttons = screen.getAllByRole('button');
      expect(buttons[0]).toHaveAccessibleName('Sun Moon Toggle theme');

      const srText = screen.getByText('Toggle theme');
      expect(srText).toHaveClass('sr-only');
    });

    it('renders dropdown menu structure', () => {
      render(<ToggleTheme />);

      expect(screen.getByTestId('dropdown-menu')).toBeInTheDocument();
      expect(screen.getByTestId('dropdown-trigger')).toBeInTheDocument();
      expect(screen.getByTestId('dropdown-content')).toBeInTheDocument();
    });

    it('renders all theme options', () => {
      render(<ToggleTheme />);

      expect(screen.getByText('Light')).toBeInTheDocument();
      expect(screen.getByText('Dark')).toBeInTheDocument();
      expect(screen.getByText('System')).toBeInTheDocument();
    });
  });

  describe('Icon Styling', () => {
    it('applies correct classes to sun icon', () => {
      render(<ToggleTheme />);

      const sunIcon = screen.getByTestId('sun-icon');
      expect(sunIcon).toHaveClass(
        'h-[1.2rem]',
        'w-[1.2rem]',
        'scale-100',
        'rotate-0',
        'transition-all',
        'dark:scale-0',
        'dark:-rotate-90'
      );
    });

    it('applies correct classes to moon icon', () => {
      render(<ToggleTheme />);

      const moonIcon = screen.getByTestId('moon-icon');
      expect(moonIcon).toHaveClass(
        'absolute',
        'h-[1.2rem]',
        'w-[1.2rem]',
        'scale-0',
        'rotate-90',
        'transition-all',
        'dark:scale-100',
        'dark:rotate-0'
      );
    });
  });

  describe('Button Styling', () => {
    it('applies correct button classes', () => {
      render(<ToggleTheme />);

      const buttons = screen.getAllByRole('button');
      expect(buttons[0]).toHaveClass(
        'bg-amber-50',
        'dark:bg-slate-800',
        'hover:bg-amber-100',
        'dark:hover:bg-slate-700',
        'transition-colors',
        'relative'
      );
    });
  });

  describe('Dropdown Behavior', () => {
    it('sets dropdown content alignment to end', () => {
      render(<ToggleTheme />);

      const dropdownContent = screen.getByTestId('dropdown-content');
      expect(dropdownContent).toHaveAttribute('data-align', 'end');
    });
  });

  describe('Theme Switching', () => {
    it('calls setTheme with light when Light is clicked', async () => {
      const user = userEvent.setup();
      render(<ToggleTheme />);

      const lightButton = screen.getByText('Light');
      await user.click(lightButton);

      expect(mockSetTheme).toHaveBeenCalledWith('light');
      expect(mockSetTheme).toHaveBeenCalledTimes(1);
    });

    it('calls setTheme with dark when Dark is clicked', async () => {
      const user = userEvent.setup();
      render(<ToggleTheme />);

      const darkButton = screen.getByText('Dark');
      await user.click(darkButton);

      expect(mockSetTheme).toHaveBeenCalledWith('dark');
      expect(mockSetTheme).toHaveBeenCalledTimes(1);
    });

    it('calls setTheme with system when System is clicked', async () => {
      const user = userEvent.setup();
      render(<ToggleTheme />);

      const systemButton = screen.getByText('System');
      await user.click(systemButton);

      expect(mockSetTheme).toHaveBeenCalledWith('system');
      expect(mockSetTheme).toHaveBeenCalledTimes(1);
    });

    it('handles multiple theme switches', async () => {
      const user = userEvent.setup();
      render(<ToggleTheme />);

      await user.click(screen.getByText('Dark'));
      await user.click(screen.getByText('Light'));
      await user.click(screen.getByText('System'));

      expect(mockSetTheme).toHaveBeenCalledTimes(3);
      expect(mockSetTheme).toHaveBeenNthCalledWith(1, 'dark');
      expect(mockSetTheme).toHaveBeenNthCalledWith(2, 'light');
      expect(mockSetTheme).toHaveBeenNthCalledWith(3, 'system');
    });
  });

  describe('Different Theme States', () => {
    it('renders correctly when theme is dark', () => {
      mockUseTheme.mockReturnValue({
        theme: 'dark',
        setTheme: mockSetTheme,
        resolvedTheme: 'dark',
        themes: ['light', 'dark', 'system'],
      });

      render(<ToggleTheme />);

      expect(screen.getAllByRole('button')[0]).toBeInTheDocument();
      expect(screen.getByTestId('sun-icon')).toBeInTheDocument();
      expect(screen.getByTestId('moon-icon')).toBeInTheDocument();
    });

    it('renders correctly when theme is system', () => {
      mockUseTheme.mockReturnValue({
        theme: 'system',
        setTheme: mockSetTheme,
        resolvedTheme: 'light',
        themes: ['light', 'dark', 'system'],
      });

      render(<ToggleTheme />);

      expect(screen.getAllByRole('button')[0]).toBeInTheDocument();
      expect(screen.getByText('Light')).toBeInTheDocument();
      expect(screen.getByText('Dark')).toBeInTheDocument();
      expect(screen.getByText('System')).toBeInTheDocument();
    });
  });

  describe('Keyboard Navigation', () => {
    it('is keyboard accessible', async () => {
      const user = userEvent.setup();
      render(<ToggleTheme />);

      const button = screen.getAllByRole('button')[0];

      await user.tab();
      expect(button).toHaveFocus();

      await user.keyboard('{Enter}');

      const lightOption = screen.getByText('Light');
      await user.tab();
      expect(lightOption).toHaveFocus();
    });

    it('handles space key activation', async () => {
      const user = userEvent.setup();
      render(<ToggleTheme />);

      await user.tab();
      await user.keyboard(' '); // Space key

      expect(screen.getByText('Light')).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('handles missing setTheme function gracefully', () => {
      mockUseTheme.mockReturnValue({
        theme: 'light',
        setTheme: undefined,
        resolvedTheme: 'light',
        themes: ['light', 'dark', 'system'],
      });

      expect(() => render(<ToggleTheme />)).not.toThrow();
    });

    it('handles when useTheme throws an error', () => {
      mockUseTheme.mockImplementation(() => {
        throw new Error('Theme provider not found');
      });

      expect(() => render(<ToggleTheme />)).toThrow('Theme provider not found');
    });
  });

  describe('Component Props', () => {
    it('passes asChild prop to DropdownMenuTrigger', () => {
      render(<ToggleTheme />);

      const trigger = screen.getByTestId('dropdown-trigger');
      const button = screen.getAllByRole('button')[0];
      expect(trigger).toContainElement(button);
    });
  });
});
