import { useRef } from 'react';
const currencyUrl = import.meta.env.VITE_CURRENCY_URL;

type ConversionInfoProps = {
  lastUpdated: number;
  className?: string;
  isLoading?: boolean;
  selectedFromOption?: { name: string; symbol: string };
  selectedToOption?: { name: string; symbol: string };
};

export function ConversionInfo({
  selectedFromOption,
  selectedToOption,
  lastUpdated,
  className,
  isLoading = false,
}: ConversionInfoProps) {
  const lastUpdatedRef = useRef<number | null>(null);
  function getCurrencyLink(selectedOption?: { name: string; symbol: string }) {
    if (!selectedOption) return null;

    const formattedSymbol = selectedOption.symbol.toLowerCase();
    const formattedName = selectedOption.name
      .toLowerCase()
      .replace(/\s+/g, '-');
    return `${currencyUrl}/${formattedSymbol}-${formattedName}/`;
  }
  const fromLink = getCurrencyLink(selectedFromOption);
  const toLink = getCurrencyLink(selectedToOption);

  console.log('fromLink', fromLink);

  if (!isLoading && lastUpdated && lastUpdatedRef.current !== lastUpdated) {
    lastUpdatedRef.current = lastUpdated;
  }

  const formattedDate = lastUpdatedRef.current
    ? new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
        timeZone: 'UTC',
      }).format(new Date(lastUpdatedRef.current))
    : null;

  return (
    <div className={`mt-8 md:text-right text-xs ${className}`}>
      {fromLink ? (
        <a href={fromLink} target="_blank" className="underline">
          {selectedFromOption?.name}
        </a>
      ) : (
        selectedFromOption?.name
      )}{' '}
      to{' '}
      {toLink ? (
        <a href={toLink} target="_blank" className="underline">
          {selectedToOption?.name}
        </a>
      ) : (
        selectedToOption?.name
      )}{' '}
      {` conversion ${formattedDate ? '— Last updated ' + formattedDate + ' UTC' : ''}`}
    </div>
  );
}
