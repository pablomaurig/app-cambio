import { describe, it, expect } from 'vitest';
import { RatesSchema } from './rates';
import { ZodError } from 'zod';

describe('RatesSchema', () => {
  it('parses valid rates data', () => {
    const validData = {
      base: 'USD',
      date: '2023-01-01',
      rates: {
        EUR: 0.9,
        GBP: 0.8,
      },
    };

    expect(() => RatesSchema.parse(validData)).not.toThrow();
    expect(RatesSchema.parse(validData)).toEqual(validData);
  });

  it('throws error if any required field is missing', () => {
    const missingBase = {
      date: '2023-01-01',
      rates: { EUR: 0.9 },
    };
    const missingDate = {
      base: 'USD',
      rates: { EUR: 0.9 },
    };
    const missingRates = {
      base: 'USD',
      date: '2023-01-01',
    };

    expect(() => RatesSchema.parse(missingBase)).toThrow(ZodError);
    expect(() => RatesSchema.parse(missingDate)).toThrow(ZodError);
    expect(() => RatesSchema.parse(missingRates)).toThrow(ZodError);
  });

  it('throws error if rates object is malformed', () => {
    const invalidRates1 = {
      base: 'USD',
      date: '2023-01-01',
      rates: { EUR: '0.9' },
    };

    const invalidRates2 = {
      base: 'USD',
      date: '2023-01-01',
      rates: null,
    };

    expect(() => RatesSchema.parse(invalidRates1)).toThrow(ZodError);
    expect(() => RatesSchema.parse(invalidRates2)).toThrow(ZodError);
  });
});
