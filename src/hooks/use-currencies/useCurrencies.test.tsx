import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi } from 'vitest';
import { useCurrencies } from './useCurrencies';
import * as exchangeService from '../../services/exchange-service';

describe('useCurrencies hook', () => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  beforeEach(() => {
    queryClient.clear();
  });

  it('fetches and returns currencies with currencyOptions mapped', async () => {
    const fakeData = {
      USD: { name: 'US Dollar', symbol: '$' },
      EUR: { name: 'Euro', symbol: '€' },
    };
    vi.spyOn(exchangeService, 'fetchCurrencies').mockResolvedValueOnce(
      fakeData
    );

    const { result } = renderHook(() => useCurrencies(), { wrapper });

    // Esperar a que cargue
    await waitFor(() => !result.current.isLoading);

    expect(exchangeService.fetchCurrencies).toHaveBeenCalled();
    expect(result.current.data).toEqual(fakeData);

    expect(result.current.currencyOptions).toEqual([
      { value: 'USD', label: 'US Dollar' },
      { value: 'EUR', label: 'Euro' },
    ]);

    expect(result.current.isError).toBe(false);
  });

  it('returns empty currencyOptions if no data', async () => {
    vi.spyOn(exchangeService, 'fetchCurrencies').mockResolvedValueOnce({});

    const { result } = renderHook(() => useCurrencies(), { wrapper });

    await waitFor(() => !result.current.isLoading);

    expect(result.current.currencyOptions).toEqual([]);
  });
});
