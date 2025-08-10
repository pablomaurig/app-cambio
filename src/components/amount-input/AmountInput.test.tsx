import { render, screen } from '../../../tests/test-utils';
import userEvent from '@testing-library/user-event';
import { AmountInput } from './AmountInput';
import { axe } from 'vitest-axe';
import { expect, describe, it, vi } from 'vitest';

describe('AmountInput', () => {
  it('renders with initial value and label', () => {
    render(
      <AmountInput
        value={100}
        onChange={() => {}}
        label="Amount"
        isLoading={false}
      />
    );
    const input = screen.getByRole('textbox', { name: /amount/i });
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('100');

    const label = screen.getByText(/amount/i);
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('for', 'Amount');
  });

  it('calls onChange with valid normalized value when typing numbers and dot', async () => {
    const handleChange = vi.fn();
    render(
      <AmountInput
        value={0}
        onChange={handleChange}
        label="Amount"
        isLoading={false}
      />
    );
    const input = screen.getByRole('textbox', { name: /amount/i });

    await userEvent.clear(input);
    await userEvent.type(input, '250.5');

    expect(handleChange).toHaveBeenCalled();
    expect(handleChange).toHaveBeenLastCalledWith(250.5);
  });

  it('normalizes input with comma to dot and calls onChange with number', async () => {
    const handleChange = vi.fn();
    render(
      <AmountInput
        value={0}
        onChange={handleChange}
        label="Amount"
        isLoading={false}
      />
    );
    const input = screen.getByRole('textbox', { name: /amount/i });

    await userEvent.clear(input);
    await userEvent.type(input, '12,34');

    expect(handleChange).toHaveBeenCalled();
    expect(handleChange).toHaveBeenLastCalledWith(12.34);
  });

  it('ignores invalid characters automatically and calls onChange with valid number', async () => {
    const handleChange = vi.fn();
    render(
      <AmountInput
        value={0}
        onChange={handleChange}
        label="Amount"
        isLoading={false}
      />
    );
    const input = screen.getByRole('textbox', { name: /amount/i });

    await userEvent.clear(input);
    await userEvent.type(input, '1a2b3c4');

    expect(handleChange).toHaveBeenCalled();
    expect(handleChange).toHaveBeenLastCalledWith(1234);
    expect(input).toHaveValue('1234');
  });

  it('shows error and does not call onChange for zero or negative input', async () => {
    const handleChange = vi.fn();
    render(
      <AmountInput
        value={1}
        onChange={handleChange}
        label="Amount"
        isLoading={false}
      />
    );
    const input = screen.getByRole('textbox', { name: /amount/i });

    await userEvent.clear(input);
    await userEvent.type(input, '0');

    const errorMessage = await screen.findByText(
      /amount must be greater than zero/i
    );
    expect(errorMessage).toBeInTheDocument();
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', 'Amount-error');
    expect(handleChange).not.toHaveBeenCalled();

    await userEvent.clear(input);
    await userEvent.type(input, '-5');
    expect(handleChange).toHaveBeenCalledWith(5);
  });

  it('does not call onChange for empty input', async () => {
    const handleChange = vi.fn();
    render(
      <AmountInput
        value={1}
        onChange={handleChange}
        label="Amount"
        isLoading={false}
      />
    );
    const input = screen.getByRole('textbox', { name: /amount/i });

    await userEvent.clear(input);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('disables input when isLoading is true', () => {
    render(
      <AmountInput
        value={100}
        onChange={() => {}}
        label="Amount"
        isLoading={true}
      />
    );
    const input = screen.getByRole('textbox', { name: /amount/i });
    expect(input).toBeDisabled();
  });

  it('applies error CSS classes and accessibility attributes', async () => {
    render(
      <AmountInput
        value={1}
        onChange={() => {}}
        label="Amount"
        isLoading={false}
      />
    );
    const input = screen.getByRole('textbox', { name: /amount/i });

    await userEvent.clear(input);
    await userEvent.type(input, '0');

    expect(input.className).toMatch(/border-red-500/);
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <AmountInput
        value={100}
        onChange={() => {}}
        label="Amount"
        isLoading={false}
      />
    );
    const results = await axe(container);
    expect(results.violations.length).toBe(0);
  });
});
