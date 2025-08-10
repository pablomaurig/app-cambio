import { describe, it, expect } from 'vitest';
import { CurrencySchema } from './currencies';
import { ZodError } from 'zod';

describe('CurrencySchema', () => {
  it('parses valid currency data', () => {
    const validData = {
      USD: { name: 'US Dollar', symbol: '$' },
      EUR: { name: 'Euro', symbol: '€' },
    };

    expect(() => CurrencySchema.parse(validData)).not.toThrow();
    expect(CurrencySchema.parse(validData)).toEqual(validData);
  });

  it('throws error if any currency object is missing required fields', () => {
    const invalidData1 = {
      USD: { name: 'US Dollar' },
    };

    const invalidData2 = {
      USD: { symbol: '$' },
    };

    const invalidData3 = {
      USD: { name: 123, symbol: '$' },
    };

    expect(() => CurrencySchema.parse(invalidData1)).toThrow(ZodError);
    expect(() => CurrencySchema.parse(invalidData2)).toThrow(ZodError);
    expect(() => CurrencySchema.parse(invalidData3)).toThrow(ZodError);
  });
});
