import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { fetchCurrencies } from './services/exchange-service.ts';
import { CurrencySchema } from './schemas/currencies.ts';

const queryClient = new QueryClient();

async function init() {
  await queryClient.prefetchQuery({
    queryKey: ['currencies'],
    queryFn: async () => {
      const data = await fetchCurrencies();
      return CurrencySchema.parse(data);
    },
    staleTime: 1000 * 60 * 60,
  });

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </StrictMode>
  );
}

init();
