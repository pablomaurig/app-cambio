import { ChevronDownIcon } from '../icons/ChevronDownIcon';

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
  const hasNoCurrencyOptions = currencyOptions.length === 0;

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
          aria-label={label}
          aria-disabled={isLoading || hasNoCurrencyOptions}
          className="col-start-1 row-start-1 appearance-none w-full h-10 rounded border border-gray-300 px-3 text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-100"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={isLoading || hasNoCurrencyOptions}
        >
          {hasNoCurrencyOptions ? (
            <option disabled role="alert">
              No currencies available
            </option>
          ) : (
            currencyOptions.map(
              ({ value: optionValue, label: optionLabel }) => (
                <option key={optionValue} value={optionValue}>
                  {optionLabel}
                </option>
              )
            )
          )}
        </select>
        {hasNoCurrencyOptions && (
          <span aria-live="polite" className="sr-only">
            No currencies available to select
          </span>
        )}
        <ChevronDownIcon className="pointer-events-none col-start-1 row-start-1 mr-4 size-5 self-center justify-self-end text-gray-500 sm:size-4" />
      </div>
    </div>
  );
}
/**
 *
 * Especificaciones:
 * - Muestra un select con opciones de moneda.
 * - Si no hay opciones, muestra texto "No options available" y deshabilita el select.
 * - Deshabilita el select durante carga.
 *
 * - Pruebas cubiertas:
 *   renderiza correctamente con opciones y label,
 *   muestra select deshabilitado y texto cuando no hay opciones,
 *   cambia valor al seleccionar opción distinta,
 *   deshabilita select cuando está cargando,
 *   accesibilidad del label y select.
 */
