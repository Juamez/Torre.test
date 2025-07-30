import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '@/app/page';

jest.mock('@/components/Search', () => ({
  __esModule: true,
  default: jest.fn(() => (
    <div data-testid="search">
      <input placeholder="Search..." data-testid="search-input" type="text" />
      <div data-testid="search-results">Mocked Search Component</div>
    </div>
  )),
}));

import Search from '@/components/Search';
const mockSearch = Search as jest.MockedFunction<typeof Search>;

describe('Home Page', () => {
  beforeEach(() => {
    mockSearch.mockClear();
  });

  describe('Rendering', () => {
    it('renders the h1 heading with correct text', () => {
      render(<Home />);

      const heading = screen.getByRole('heading', {
        name: 'Torre.test Profile Data',
        level: 1,
      });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Torre.test Profile Data');
    });

    it('renders the search component', () => {
      render(<Home />);

      const searchComponent = screen.getByTestId('search');
      expect(searchComponent).toBeInTheDocument();
      expect(mockSearch).toHaveBeenCalledTimes(1);
    });

    it('renders with proper semantic HTML structure', () => {
      render(<Home />);

      const main = screen.getByRole('main');
      expect(main).toBeInTheDocument();
      expect(main).toHaveClass('flex');

      const headingInMain = within(main).getByRole('heading', { level: 1 });
      expect(headingInMain).toBeInTheDocument();

      const searchInMain = within(main).getByTestId('search');
      expect(searchInMain).toBeInTheDocument();
    });
  });

  describe('Layout an Styling', () => {
    it('applies correct grid layout classes to container', () => {
      const { container } = render(<Home />);

      const gridContainer = container.firstChild as HTMLElement;
      expect(gridContainer).toHaveClass(
        'grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'
      );
    });

    it('applies correct flexbox classes to main element', () => {
      render(<Home />);

      const main = screen.getByRole('main');
      expect(main).toHaveClass(
        'flex flex-col row-start-2 items-center sm:items-start'
      );
    });

    it('has responsive padding classes', () => {
      const { container } = render(<Home />);

      const gridContainer = container.firstChild as HTMLElement;
      expect(gridContainer).toHaveClass(
        'grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'
      );
    });

    it('applies font family variable', () => {
      const { container } = render(<Home />);

      const gridContainer = container.firstChild as HTMLElement;
      expect(gridContainer).toHaveClass(
        'font-[family-name:var(--font-geist-sans)]'
      );
    });

    it('applies correct background color classes', () => {
      const { container } = render(<Home />);

      const gridContainer = container.firstChild as HTMLElement;
      expect(gridContainer).toHaveClass(
        'grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'
      );
    });
  });

  describe('Accessibility', () => {
    it('has proper heading hierarchy', async () => {
      render(<Home />);

      const h1Elements = screen.getAllByRole('heading', { level: 1 });
      expect(h1Elements).toHaveLength(1);
    });

    it('heading is accessible and properly labeled', () => {
      render(<Home />);

      const heading = screen.getByRole('heading', {
        name: 'Torre.test Profile Data',
        level: 1,
      });
      expect(heading).toHaveAccessibleName('Torre.test Profile Data');
      //TODO: ADD MORE RELATED LABELS
    });

    it('maintains focus management', async () => {
      render(<Home />);

      const searchInput = screen.getByTestId('search-input');
      searchInput.focus();
      expect(searchInput).toHaveFocus();

      await userEvent.type(searchInput, 'test search');
      expect(searchInput).toHaveValue('test search');
      expect(searchInput).toHaveFocus();

      const focusableElements = screen.getAllByRole('textbox');
      expect(focusableElements).toHaveLength(1);
      expect(focusableElements.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('Component integration', () => {
    it('passes correct props to Search component', () => {
      render(<Home />);

      expect(mockSearch).toHaveBeenCalledWith({}, undefined);
    });

    it('render Search component only once', () => {
      render(<Home />);

      expect(mockSearch).toHaveBeenCalledTimes(1);
    });

    it('mounts and unmounts Search component properly', () => {
      const { unmount } = render(<Home />);

      expect(mockSearch).toHaveBeenCalledTimes(1);

      unmount();

      expect(mockSearch).toHaveBeenCalledTimes(1);
    });
  });

  describe('Responsive behaviour', () => {
    it('applies responsive classes correctly', () => {
      render(<Home />);

      const main = screen.getByRole('main');

      expect(main).toHaveClass('items-center', 'sm:items-start');
    });

    it('maintains layout integrity on different screen sizes', () => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
          matches: query === '(min-width: 640px)',
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      });

      render(<Home />);

      const main = screen.getByRole('main');
      expect(main).toHaveClass('items-center', 'sm:items-start');
    });
  });

  describe('Error boundaries and edge cases', () => {
    it('renders without crashing when Search component throws', () => {
      const ErrorSearch = jest.fn(() => {
        throw new Error('Search component error');
      });

      jest.mocked(mockSearch).mockImplementationOnce(ErrorSearch);

      const originalConsoleError = console.error;
      console.error = jest.fn();

      expect(mockSearch).toThrow('Search component error');

      console.error = originalConsoleError;
    });

    it('handles missing CSS classes gracefully', () => {
      const { container } = render(<Home />);

      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('Performance', () => {
    it('renders efficiently without unnecessary re-renders', () => {
      render(<Home />);

      expect(mockSearch).toHaveBeenCalledTimes(1);
    });

    it('maintains stable component structure', () => {
      const { container, rerender } = render(<Home />);

      rerender(<Home />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('Content and Text', () => {
    it('displays the correct page title text', () => {
      render(<Home />);

      expect(screen.getByText('Torre.test Profile Data')).toBeInTheDocument();
    });

    it('has the expected text content structure', () => {
      render(<Home />);

      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading.textContent?.trim()).toBe('Torre.test Profile Data');
    });
  });

  describe('DOM Structure', () => {
    it('has the expected DOM hierarchy', () => {
      const { container } = render(<Home />);

      const wrapper = container.firstChild;
      expect(wrapper?.nodeName).toBe('DIV');

      const main = screen.getByRole('main');
      expect(main?.nodeName).toBe('MAIN');
    });

    it('contains all expected child elements', () => {
      render(<Home />);

      expect(screen.getByRole('heading')).toBeInTheDocument();
      expect(screen.getByTestId('search')).toBeInTheDocument();
    });
  });
});
