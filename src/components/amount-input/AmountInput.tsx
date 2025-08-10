import { useState } from 'react';

export function AmountInput({
  value,
  label,
  onChange,
  isLoading,
}: {
  value: number;
  label: string;
  isLoading: boolean;
  onChange: (amount: number) => void;
}) {
  const [internalValue, setInternalValue] = useState(value.toString());
  const [error, setError] = useState<string | null>(null);

  function normalizeAmountPreservingDecimals(input: string): string {
    let [intPart, decimalPart] = input.replace(',', '.').split('.');
    intPart = intPart.replace(/^0+(?!$)/, '');

    return decimalPart !== undefined ? `${intPart}.${decimalPart}` : intPart;
  }
  function cleanInput(input: string): string {
    let cleaned = input.replace(/,/g, '.');
    cleaned = cleaned.replace(/[^0-9.]/g, '');
    const parts = cleaned.split('.');
    if (parts.length > 2) {
      cleaned = parts[0] + '.' + parts.slice(1).join('');
    }

    return cleaned;
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let rawValue = e.target.value;

    rawValue = cleanInput(rawValue);

    const normalized = normalizeAmountPreservingDecimals(rawValue);

    setInternalValue(normalized);

    const num = Number(normalized);

    if (isNaN(num)) {
      setError('Please enter a valid number');
      return;
    }
    if (num <= 0) {
      setError('Amount must be greater than zero');
      return;
    }

    onChange(num);
    setError(null);
  };

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
        <div>
          <input
            type="text"
            inputMode="decimal"
            pattern="[0-9.,]*"
            id={label}
            className={`appearance-none w-full h-10 rounded border pl-7 pr-3 text-base font-semibold text-gray-900
            ${error ? 'border-red-500' : 'border-gray-300'}
            focus-visible:outline-none focus-visible:ring-1 ${
              error
                ? 'focus-visible:ring-red-200'
                : 'focus-visible:ring-purple-100'
            }`}
            value={internalValue}
            onChange={handleOnChange}
            disabled={isLoading}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${label}-error` : undefined}
          />
          <div className="h-0 relative">
            {error && (
              <p id={`${label}-error`} className="text-sm text-red-600 mt-1">
                {error}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
/**
 *
 * Especificaciones:
 * - Formato de entrada: solo números y punto decimal ('.'),
 *   caracteres no permitidos se eliminan automáticamente,
 *   no se permiten números negativos,
 *   se conserva punto decimal aunque esté al final (ej: "12.").
 *
 * - Comportamiento:
 *   input con type="text" por compatibilidad (especialmente Safari),
 *   usa inputMode="decimal" para teclado numérico en móviles,
 *   validación manual y limpieza con regex.
 *
 * - Normalización:
 *   función normalizeAmountPreservingDecimals reemplaza coma por punto y elimina ceros a la izquierda.
 *
 * - Pruebas cubiertas:
 *   ingreso números válidos,
 *   ingreso caracteres inválidos se ignoran,
 *   manejo correcto de separador decimal '.' y ',',
 *   rechazo de números negativos,
 *   conserva decimales incompletos (ej: "12.").
 *
 * - Notas técnicas:
 *   input cambió de number a text para mejor control y evitar problemas con locales,
 *   se agrega función cleanInput para eliminar caracteres inválidos,
 *   manejo de estados internos para validación y errores,
 *   accesibilidad con aria-invalid y aria-describedby.
 */
