import { useQuery } from '@tanstack/react-query';
import type { CurrencyData } from '../../schemas/currencies';
import { fetchCurrencies } from '../../services/exchange-service';

export function useCurrencies() {
  const query = useQuery<CurrencyData>({
    queryKey: ['currencies'],
    queryFn: fetchCurrencies,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });

  const currencyOptions = query.data
    ? Object.entries(query.data).map(([key, { name }]) => ({
        value: key,
        label: name,
      }))
    : [];

  return {
    ...query,
    currencyOptions,
  };
}
