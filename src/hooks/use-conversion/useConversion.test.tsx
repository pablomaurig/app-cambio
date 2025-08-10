import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi } from 'vitest';
import { useConversion } from './useConversion';
import * as exchangeService from '../../services/exchange-service';

describe('useConversion', () => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  const from = 'USD';
  const to = 'EUR';
  const amount = 10;

  beforeEach(() => {
    queryClient.clear();
  });

  it('fetches rates and returns correct conversion data', async () => {
    const fakeRates = { base: 'USD', date: '2023-01-01', rates: { EUR: 0.9 } };
    vi.spyOn(exchangeService, 'fetchRates').mockResolvedValueOnce(fakeRates);

    const { result } = renderHook(() => useConversion(from, to, amount), {
      wrapper,
    });

    await waitFor(() => !result.current.isLoading);

    expect(exchangeService.fetchRates).toHaveBeenCalledWith(from);
    expect(result.current.conversionRate).toBe(0.9);
    expect(result.current.convertedAmount).toBe(amount * 0.9);
    expect(result.current.error).toBeFalsy();
    expect(typeof result.current.refetch).toBe('function');
    expect(typeof result.current.prefetch).toBe('function');
  });

  it('prefetch calls queryClient.prefetchQuery if no data cached', async () => {
    vi.spyOn(exchangeService, 'fetchRates').mockResolvedValue({
      base: 'USD',
      date: '2023-01-01',
      rates: { EUR: 0.9 },
    });

    const spyPrefetch = vi.spyOn(queryClient, 'prefetchQuery');

    const { result } = renderHook(() => useConversion(from, to, amount), {
      wrapper,
    });

    act(() => {
      result.current.prefetch('GBP');
    });

    expect(spyPrefetch).toHaveBeenCalledWith({
      queryKey: ['rates', 'GBP'],
      queryFn: expect.any(Function),
    });

    spyPrefetch.mockRestore();
  });
});
