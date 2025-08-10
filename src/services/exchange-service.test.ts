import { fetchCurrencies, fetchRates } from './exchange-service';
import { CurrencySchema } from '../schemas/currencies';
import { RatesSchema } from '../schemas/rates';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

global.fetch = vi.fn();

describe('exchange-service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('fetchCurrencies', () => {
    it('fetches and parses currencies correctly', async () => {
      const mockData = {
        USD: { name: 'US Dollar', symbol: '$' },
        EUR: { name: 'Euro', symbol: '€' },
      };

      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const result = await fetchCurrencies();

      expect(fetch).toHaveBeenCalledWith(`${baseUrl}/currencies`);
      expect(result).toEqual(CurrencySchema.parse(mockData));
    });

    it('throws error when response is not ok', async () => {
      (fetch as any).mockResolvedValueOnce({
        ok: false,
      });

      await expect(fetchCurrencies()).rejects.toThrow(
        'Error al obtener monedas'
      );
    });

    it('throws error when data fails schema validation', async () => {
      const invalidData = { invalid: 'data' };
      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => invalidData,
      });

      await expect(fetchCurrencies()).rejects.toThrow();
    });
  });

  describe('fetchRates', () => {
    const base = 'USD';

    it('fetches and parses rates correctly', async () => {
      const mockData = {
        base,
        date: '2023-01-01',
        rates: { EUR: 0.9, GBP: 0.8 },
      };
      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const result = await fetchRates(base);

      expect(fetch).toHaveBeenCalledWith(`${baseUrl}/rates?base=${base}`);
      expect(result).toEqual(RatesSchema.parse(mockData));
    });

    it('throws error when response is not ok', async () => {
      (fetch as any).mockResolvedValueOnce({
        ok: false,
      });

      await expect(fetchRates(base)).rejects.toThrow(
        'Error al obtener tasas de cambio'
      );
    });

    it('throws error when data fails schema validation', async () => {
      const invalidData = { base, date: 'bad date', rates: 'not an object' };
      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => invalidData,
      });

      await expect(fetchRates(base)).rejects.toThrow();
    });
  });
});
