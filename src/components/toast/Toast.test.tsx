import { render, screen, fireEvent } from '../../../tests/test-utils';
import { Toast } from './Toast';
import { axe } from 'vitest-axe';

describe('Toast component', () => {
  const message = 'Test message';

  it('renders message and default info style', () => {
    render(<Toast message={message} />);
    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent(message);
    expect(alert).toHaveClass('bg-blue-100', 'text-blue-800');
  });

  it('applies correct styles for success and error types', () => {
    const { rerender } = render(<Toast message={message} type="success" />);
    expect(screen.getByRole('alert')).toHaveClass(
      'bg-green-100',
      'text-green-800'
    );

    rerender(<Toast message={message} type="error" />);
    expect(screen.getByRole('alert')).toHaveClass('bg-red-100', 'text-red-800');
  });

  it('renders retry button when onRetry is provided and calls it on click', () => {
    const onRetry = vi.fn();
    render(
      <Toast message={message} onRetry={onRetry} retryLabel="Try again" />
    );

    const button = screen.getByRole('button', { name: /try again/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('does not render retry button if onRetry is not provided', () => {
    render(<Toast message={message} />);
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('has no obvious accessibility violations', async () => {
    const { container } = render(<Toast message={message} />);
    const results = await axe(container);
    expect(results.violations.length).toBe(0);
  });
});
