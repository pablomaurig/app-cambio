type ResultProps = {
  conversionRate: number | null;
  convertedAmount: number;
  loading: boolean;
  amount: number;
  from?: {
    name: string;
    symbol: string;
  };
  to?: {
    name: string;
    symbol: string;
  };
};

export function Result({
  conversionRate,
  convertedAmount,
  loading,
  amount,
  from,
  to,
}: ResultProps) {
  if (loading) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="space-y-2 font-semibold text-2xl md:text-heading-lg animate-pulse"
      >
        <p className="h-7 w-1/2 bg-neutral-200 rounded" />
        <p className="h-7 w-4/5 bg-neutral-200 rounded" />
        <small className="block h-5 w-3/5 bg-neutral-200 rounded" />
      </div>
    );
  }

  const inverseRate = conversionRate ? 1 / conversionRate : 0;

  return (
    <div
      className="font-semibold text-2xl md:text-heading-lg"
      role="status"
      aria-live="polite"
    >
      <p>
        {amount.toFixed(2)} {from?.name} =
      </p>
      <p>
        {convertedAmount.toFixed(6)} {to?.name}
      </p>
      <small className="font-normal text-base text-neutral-500">
        1 {to?.symbol} = {inverseRate.toFixed(6)} {from?.symbol}
      </small>
    </div>
  );
}

/**
 *
 * Nota: La definición de mostrar la tasa inversa se tomó siguiendo el diseño
 */
