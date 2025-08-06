import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { SwapCurrencyIcon } from './icons/SwapCurrencyIcon';

export function CurrencyInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="gap-4 flex flex-col">
      <label
        htmlFor={label}
        className="font-semibold text-base leading-5 text-left text-gray-800"
      >
        {label}
      </label>
      <div className="grid grid-cols-1">
        <select
          id={label}
          className="col-start-1 row-start-1 appearance-none w-full h-10 rounded border border-gray-300 px-3 text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-100"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="ARS">ARS</option>
        </select>

        <ChevronDownIcon className="pointer-events-none col-start-1 row-start-1 mr-4 size-5 self-center justify-self-end text-gray-500 sm:size-4" />
      </div>
    </div>
  );
}

export function AmountInput({
  value,
  label,
  onChange,
}: {
  value: string;
  label: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="gap-4 flex flex-col">
      <label
        htmlFor={label}
        className="text-base font-semibold leading-5 text-left text-gray-800"
      >
        {label}
      </label>
      <div className="relative w-full">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 select-none">
          $
        </span>
        <input
          type="number"
          id={label}
          className="appearance-none w-full h-10 rounded border border-gray-300 pl-7 pr-3 text-base font-semibold text-gray-900
      focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-100"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}

export function SwapButton() {
  return (
    <button
      type="button"
      aria-label="Swap currencies"
      className="self-end flex items-center justify-center w-10 h-10 bg-white hover:bg-violet-50 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-100 border border-purple"
    >
      <SwapCurrencyIcon />
    </button>
  );
}

export function Result() {
  return (
    <div className="font-semibold text-2xl md:text-heading-lg">
      <p>1.00 Euro =</p>
      <p>1.0627478 US Dollars</p>
      <small className="font-normal text-base text-neutral-500">
        1 USD = 0.941004 EUR
      </small>
    </div>
  );
}

export function InfoTooltip() {
  return (
    <div className="hidden md:block text-sm leading-9 py-4 px-6 bg-purple-light rounded-lg shadow-sm self-end">
      We use the mid-market rate for our Converter. This is for informational
      purposes only. You won’t receive this rate when sending money.
    </div>
  );
}

export function ConversionInfo({ className = '' }: { className?: string }) {
  return (
    <div className={`mt-8 md:text-right text-xs ${className}`}>
      <a href="#" className="underline">
        Euro
      </a>{' '}
      to{' '}
      <a href="#" className="underline">
        US Dollar
      </a>{' '}
      conversion — Last updated Dec 15, 2022, 19:17 UTC
    </div>
  );
}
