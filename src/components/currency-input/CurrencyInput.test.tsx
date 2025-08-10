import { render, screen } from '../../../tests/test-utils';
import userEvent from '@testing-library/user-event';
import { CurrencyInput } from './CurrencyInput';
import { expect, describe, it, vi } from 'vitest';

describe('CurrencyInput', () => {
  const label = 'Currency';
  const options = [
    { value: 'USD', label: 'US Dollar' },
    { value: 'EUR', label: 'Euro' },
  ];

  it('renders label and select with options', () => {
    render(
      <CurrencyInput
        label={label}
        value="USD"
        onChange={() => {}}
        isLoading={false}
        currencyOptions={options}
      />
    );

    expect(screen.getByLabelText(label)).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveValue('USD');
    options.forEach((opt) =>
      expect(
        screen.getByRole('option', { name: opt.label })
      ).toBeInTheDocument()
    );
  });

  it('calls onChange when user selects a different option', async () => {
    const handleChange = vi.fn();
    render(
      <CurrencyInput
        label={label}
        value="USD"
        onChange={handleChange}
        isLoading={false}
        currencyOptions={options}
      />
    );

    const select = screen.getByRole('combobox');
    await userEvent.selectOptions(select, 'EUR');
    expect(handleChange).toHaveBeenCalledWith('EUR');
  });

  it('disables select and shows message when no options', () => {
    render(
      <CurrencyInput
        label={label}
        value=""
        onChange={() => {}}
        isLoading={false}
        currencyOptions={[]}
      />
    );

    const select = screen.getByRole('combobox');
    expect(select).toBeDisabled();
    expect(screen.getByRole('alert')).toHaveTextContent(
      'No currencies available'
    );
  });

  it('disables select when loading', () => {
    render(
      <CurrencyInput
        label={label}
        value="USD"
        onChange={() => {}}
        isLoading={true}
        currencyOptions={options}
      />
    );

    const select = screen.getByRole('combobox');
    expect(select).toBeDisabled();
  });

  it('has correct aria-disabled attribute', () => {
    const { rerender } = render(
      <CurrencyInput
        label={label}
        value="USD"
        onChange={() => {}}
        isLoading={false}
        currencyOptions={options}
      />
    );
    expect(screen.getByRole('combobox')).toHaveAttribute(
      'aria-disabled',
      'false'
    );

    rerender(
      <CurrencyInput
        label={label}
        value=""
        onChange={() => {}}
        isLoading={false}
        currencyOptions={[]}
      />
    );
    expect(screen.getByRole('combobox')).toHaveAttribute(
      'aria-disabled',
      'true'
    );

    rerender(
      <CurrencyInput
        label={label}
        value="USD"
        onChange={() => {}}
        isLoading={true}
        currencyOptions={options}
      />
    );
    expect(screen.getByRole('combobox')).toHaveAttribute(
      'aria-disabled',
      'true'
    );
  });
});
