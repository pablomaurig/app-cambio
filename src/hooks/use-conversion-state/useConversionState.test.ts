import { renderHook, act } from '@testing-library/react';
import { useConversionState, type ConversionState } from './useConversionState';

describe('useConversionState hook', () => {
  const initialState: ConversionState = {
    from: 'USD',
    to: 'EUR',
    amount: 1,
  };

  it('returns the default initial state when no argument is provided', () => {
    const { result } = renderHook(() => useConversionState());
    expect(result.current.from).toBe(initialState.from);
    expect(result.current.to).toBe(initialState.to);
    expect(result.current.amount).toBe(initialState.amount);
  });

  it('returns the given initial state when provided', () => {
    const customState = { from: 'GBP', to: 'JPY', amount: 100 };
    const { result } = renderHook(() => useConversionState(customState));
    expect(result.current.from).toBe(customState.from);
    expect(result.current.to).toBe(customState.to);
    expect(result.current.amount).toBe(customState.amount);
  });

  it('setAmountToConvert updates amount only if >= 0', () => {
    const { result } = renderHook(() => useConversionState());

    act(() => {
      result.current.setAmountToConvert(10);
    });
    expect(result.current.amount).toBe(10);

    act(() => {
      result.current.setAmountToConvert(-5);
    });
    // No change because amount < 0
    expect(result.current.amount).toBe(10);
  });

  it('setFromCurrency updates the from value', () => {
    const { result } = renderHook(() => useConversionState());

    act(() => {
      result.current.setFromCurrency('JPY');
    });
    expect(result.current.from).toBe('JPY');
  });

  it('setToCurrency updates the to value', () => {
    const { result } = renderHook(() => useConversionState());

    act(() => {
      result.current.setToCurrency('AUD');
    });
    expect(result.current.to).toBe('AUD');
  });

  it('swap exchanges from and to values, keeps amount', () => {
    const { result } = renderHook(() =>
      useConversionState({ from: 'USD', to: 'EUR', amount: 5 })
    );

    act(() => {
      result.current.swap();
    });

    expect(result.current.from).toBe('EUR');
    expect(result.current.to).toBe('USD');
    expect(result.current.amount).toBe(5);
  });
});
