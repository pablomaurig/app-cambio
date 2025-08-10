import { render, screen } from '../../../tests/test-utils';
import { InfoTooltip } from './InfoTooltip';
import { axe } from 'vitest-axe';

describe('InfoTooltip component', () => {
  it('renders correctly with role and aria-label', () => {
    render(<InfoTooltip />);
    const tooltip = screen.getByRole('note', {
      name: /rate conversion information/i,
    });
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveClass('hidden md:block');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<InfoTooltip />);
    const results = await axe(container);
    expect(results.violations.length).toBe(0);
  });
});
