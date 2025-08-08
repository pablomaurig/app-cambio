import { render, screen } from '../../../tests/test-utils';
import userEvent from '@testing-library/user-event';
import { AmountInput } from './AmountInput';

describe('AmountInput', () => {
  it('renders with initial value', () => {
    render(
      <AmountInput
        value={100}
        onChange={() => {}}
        label="Amount"
        isLoading={false}
      />
    );
    const input = screen.getByRole('spinbutton', { name: /amount/i });
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(100);
  });

  it('updates value when user types', async () => {
    const handleChange = vi.fn();
    render(
      <AmountInput
        value={0}
        onChange={handleChange}
        label="Amount"
        isLoading={false}
      />
    );
    const input = screen.getByRole('spinbutton', { name: /amount/i });

    await userEvent.clear(input);
    await userEvent.type(input, '250');

    expect(handleChange).toHaveBeenCalledWith(250);
  });
});
