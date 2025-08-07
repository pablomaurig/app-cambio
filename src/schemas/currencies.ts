import { z } from 'zod';

export const CurrencySchema = z.record(
  z.string(),
  z.object({
    name: z.string(),
    symbol: z.string(),
  })
);

export type CurrencyData = z.infer<typeof CurrencySchema>;
