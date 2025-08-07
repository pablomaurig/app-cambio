import { z } from 'zod';

export const RatesSchema = z.object({
  base: z.string(),
  date: z.string(),
  rates: z.record(z.string(), z.number()),
});

export type Rates = z.infer<typeof RatesSchema>;
