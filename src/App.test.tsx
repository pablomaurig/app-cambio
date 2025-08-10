import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi } from 'vitest';
import * as exchangeServiceModule from '@/services/exchange-service';
import { useConversion } from '@/hooks/use-conversion/';

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useConversion', () => {
  const from = 'USD';
  const to = 'EUR';
  const amount = 10;

  beforeEach(() => {
    queryClient.clear();
    vi.clearAllMocks();
  });

  it('fetches rates and returns correct conversion data', async () => {
    const fakeRates = { base: from, date: '2023-01-01', rates: { [to]: 0.9 } };
    vi.spyOn(exchangeServiceModule, 'fetchRates').mockResolvedValueOnce(
      fakeRates
    );

    const { result } = renderHook(() => useConversion(from, to, amount), {
      wrapper,
    });

    await waitFor(() => !result.current.isLoading);

    expect(exchangeServiceModule.fetchRates).toHaveBeenCalledWith(from);
    expect(result.current.conversionRate).toBe(0.9);
    expect(result.current.convertedAmount).toBe(amount * 0.9);
    expect(result.current.error).toBeNull();
    expect(typeof result.current.refetch).toBe('function');
    expect(typeof result.current.prefetch).toBe('function');
  });

  it('prefetch calls queryClient.prefetchQuery if no data cached', async () => {
    vi.spyOn(exchangeServiceModule, 'fetchRates').mockResolvedValue({
      base: from,
      date: '2023-01-01',
      rates: { EUR: 0.9 },
    });

    const { result } = renderHook(() => useConversion(from, to, amount), {
      wrapper,
    });

    const spyPrefetch = vi.spyOn(queryClient, 'prefetchQuery');

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
