import { render, screen } from '../../../tests/test-utils';
import userEvent from '@testing-library/user-event';
import { SwapButton } from './SwapButton';
import { expect, describe, it, vi } from 'vitest';

describe('SwapButton', () => {
  it('renders button with aria-label and icon', () => {
    render(<SwapButton onSwap={() => {}} />);
    const button = screen.getByRole('button', { name: /swap currencies/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'button');
    expect(button.querySelector('svg')).toBeInTheDocument(); // ícono es SVG
  });

  it('is focusable and shows focus outline', async () => {
    render(<SwapButton onSwap={() => {}} />);
    const button = screen.getByRole('button', { name: /swap currencies/i });
    button.focus();
    expect(button).toHaveFocus();
    // opcional: test para clases o estilos de foco si se quiere
  });

  it('calls onSwap when clicked', async () => {
    const onSwap = vi.fn();
    render(<SwapButton onSwap={onSwap} />);
    const button = screen.getByRole('button', { name: /swap currencies/i });
    await userEvent.click(button);
    expect(onSwap).toHaveBeenCalledTimes(1);
  });

  it('calls onSwap when activated with keyboard (Enter and Space)', async () => {
    const onSwap = vi.fn();
    render(<SwapButton onSwap={onSwap} />);
    const button = screen.getByRole('button', { name: /swap currencies/i });

    button.focus();
    await userEvent.keyboard('{Enter}');
    expect(onSwap).toHaveBeenCalledTimes(1);

    await userEvent.keyboard(' ');
    expect(onSwap).toHaveBeenCalledTimes(2);
  });
});
