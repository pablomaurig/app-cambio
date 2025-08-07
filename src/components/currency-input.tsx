import { ChevronDownIcon } from './icons/chevron-down-icon';

export function CurrencyInput({
  label,
  value,
  onChange,
  isLoading,
  currencyOptions,
}: {
  label: string;
  value: string;
  isLoading: boolean;
  onChange: (v: string) => void;
  currencyOptions: { value: string; label: string }[];
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
          disabled={isLoading}
        >
          {currencyOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDownIcon className="pointer-events-none col-start-1 row-start-1 mr-4 size-5 self-center justify-self-end text-gray-500 sm:size-4" />
      </div>
    </div>
  );
}
