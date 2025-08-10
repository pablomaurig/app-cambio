import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchRates } from '../../services/exchange-service';

interface UseConversionResult {
  conversionRate: number | null;
  convertedAmount: number;
  isLoading: boolean;
  error: unknown;
  prefetch: (currency: string) => void;
  refetch: () => void;
  lastUpdated: number;
}

export function useConversion(
  from: string,
  to: string,
  amount: number
): UseConversionResult {
  const queryClient = useQueryClient();

  const { data, isLoading, error, dataUpdatedAt, refetch } = useQuery({
    queryKey: ['rates', from],
    queryFn: () => fetchRates(from),
    staleTime: 1000 * 60 * 60,
  });

  const conversionRate = data?.rates?.[to] ?? null;
  const convertedAmount = conversionRate ? amount * conversionRate : 0;

  const prefetch = (currency: string) => {
    if (!queryClient.getQueryData(['rates', currency])) {
      queryClient.prefetchQuery({
        queryKey: ['rates', currency],
        queryFn: () => fetchRates(currency),
      });
    }
  };

  return {
    conversionRate,
    convertedAmount,
    isLoading,
    error,
    prefetch,
    refetch,
    lastUpdated: dataUpdatedAt,
  };
}
