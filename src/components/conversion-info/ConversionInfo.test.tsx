import { render, screen } from '../../../tests/test-utils';
import { ConversionInfo } from './ConversionInfo';
import { axe } from 'vitest-axe';

describe('ConversionInfo component', () => {
  const selectedFromOption = { name: 'US Dollar', symbol: 'USD' };
  const selectedToOption = { name: 'Euro', symbol: 'EUR' };
  const lastUpdated = Date.UTC(2023, 0, 1, 12, 0);

  it('renders links correctly with formatted URLs and date', () => {
    render(
      <ConversionInfo
        selectedFromOption={selectedFromOption}
        selectedToOption={selectedToOption}
        lastUpdated={lastUpdated}
        className="test-class"
      />
    );

    const fromLink = screen.getByText(selectedFromOption.name);
    expect(fromLink).toHaveAttribute(
      'href',
      expect.stringContaining('/usd-us-dollar/')
    );
    expect(fromLink).toHaveClass('underline');
    expect(fromLink).toHaveAttribute('target', '_blank');
    expect(fromLink).toHaveAttribute('rel', 'noopener noreferrer');

    const toLink = screen.getByText(selectedToOption.name);
    expect(toLink).toHaveAttribute(
      'href',
      expect.stringContaining('/eur-euro/')
    );

    const conversionText = screen.getByText(/conversion/);
    expect(conversionText.textContent).toMatch(
      /— Last updated Jan 1, 2023, 12:00 PM UTC/
    );
  });

  it('renders names without links if selected options missing', () => {
    render(<ConversionInfo lastUpdated={lastUpdated} />);

    expect(screen.getByText(/conversion/)).toBeInTheDocument();
  });

  it('renders without date if lastUpdated is 0 or missing', () => {
    render(
      <ConversionInfo
        selectedFromOption={selectedFromOption}
        selectedToOption={selectedToOption}
        lastUpdated={0}
      />
    );

    expect(screen.getByText(/conversion/)).not.toHaveTextContent(
      'Last updated'
    );
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <ConversionInfo
        selectedFromOption={selectedFromOption}
        selectedToOption={selectedToOption}
        lastUpdated={lastUpdated}
      />
    );

    const results = await axe(container);
    expect(results.violations.length).toBe(0);
  });
});
