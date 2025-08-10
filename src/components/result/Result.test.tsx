import { render, screen } from '../../../tests/test-utils';
import { Result } from './Result';
import { describe, it, expect } from 'vitest';

describe('Result component', () => {
  const from = { name: 'US Dollar', symbol: 'USD' };
  const to = { name: 'Euro', symbol: 'EUR' };

  it('renders loading state with placeholders and accessibility attributes', () => {
    render(
      <Result
        loading={true}
        amount={0}
        convertedAmount={0}
        conversionRate={null}
      />
    );

    const container = screen.queryByRole('status');
    expect(container).toBeInTheDocument();
    expect(container).toHaveAttribute('aria-live', 'polite');

    expect(container?.querySelectorAll('p')).toHaveLength(2);
    expect(container?.querySelectorAll('small')).toHaveLength(1);
  });

  it('renders conversion data correctly when loading is false', () => {
    render(
      <Result
        loading={false}
        amount={100}
        convertedAmount={90.123456}
        conversionRate={0.9}
        from={from}
        to={to}
      />
    );

    expect(screen.getByText('100.00 US Dollar =')).toBeInTheDocument();
    expect(screen.getByText('90.123456 Euro')).toBeInTheDocument();
    expect(
      screen.getByText(
        (content) =>
          content.includes('1 EUR =') && content.includes('1.111111 USD')
      )
    ).toBeInTheDocument();
  });

  it('handles null conversionRate by showing inverse rate as 0', () => {
    render(
      <Result
        loading={false}
        amount={50}
        convertedAmount={0}
        conversionRate={null}
        from={from}
        to={to}
      />
    );

    expect(
      screen.getByText(
        (content) =>
          content.includes('1 EUR =') && content.includes('0.000000 USD')
      )
    ).toBeInTheDocument();
  });

  it('handles missing from or to props gracefully', () => {
    render(
      <Result
        loading={false}
        amount={10}
        convertedAmount={20}
        conversionRate={2}
      />
    );

    expect(screen.getByText('10.00 =')).toBeInTheDocument();
    expect(screen.getByText('20.000000')).toBeInTheDocument();
    expect(
      screen.getByText(
        (content) =>
          content.includes('1') &&
          content.includes('=') &&
          content.includes('0.500000')
      )
    ).toBeInTheDocument();
  });
});
