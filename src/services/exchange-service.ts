import { CurrencySchema } from '../schemas/currencies';
import { RatesSchema } from '../schemas/rates';
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export type RatesResponse = {
  base: string;
  date: string;
  rates: Record<string, number>;
};

export async function fetchCurrencies() {
  const res = await fetch(`${baseUrl}/currencies`);

  if (!res.ok) {
    throw new Error('Error al obtener monedas');
  }

  const data = await res.json();

  return CurrencySchema.parse(data);
}

export async function fetchRates(base: string): Promise<RatesResponse> {
  const res = await fetch(`${baseUrl}/rates?base=${base}`);

  if (!res.ok) {
    throw new Error('Error al obtener tasas de cambio');
  }

  const data = await res.json();

  return RatesSchema.parse(data);
}
