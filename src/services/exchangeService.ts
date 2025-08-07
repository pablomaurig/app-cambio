import { CurrencySchema } from '../schemas/currencies';
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export async function fetchCurrencies() {
  const res = await fetch(`${baseUrl}/currencies`);

  if (!res.ok) {
    throw new Error('Error al obtener monedas');
  }

  const data = await res.json();
  return CurrencySchema.parse(data);
}
