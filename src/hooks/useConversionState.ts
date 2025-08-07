import { useState } from 'react';

const DEFAULT_CONVERSION: ConversionState = {
  from: 'USD',
  to: 'EUR',
  amount: 1,
};

export type ConversionState = {
  amount: number;
  from: string;
  to: string;
};

export function useConversionState(initialState = DEFAULT_CONVERSION) {
  const [conversionState, setConversionState] = useState(initialState);

  const setAmountToConvert = (amount: number) => {
    if (amount >= 0) {
      setConversionState((prev) => ({ ...prev, amount }));
    }
  };

  const setFromCurrency = (from: string) => {
    setConversionState((prev) => ({ ...prev, from }));
  };

  const setToCurrency = (to: string) => {
    setConversionState((prev) => ({ ...prev, to }));
  };

  const swap = () => {
    setConversionState(({ from, to, amount }) => ({
      from: to,
      to: from,
      amount,
    }));
  };

  return {
    ...conversionState,
    setAmountToConvert,
    setFromCurrency,
    setToCurrency,
    swap,
  };
}
