import { useState } from 'react';
import {
  CurrencyInput,
  AmountInput,
  SwapButton,
  Result,
  InfoTooltip,
  ConversionInfo,
  Toast,
} from './components/Components';
import { useCurrencies } from './hooks/useCurrencies';

export default function App() {
  const {
    currencyOptions,
    data: currencies,
    isLoading,
    refetch,
    error,
  } = useCurrencies();
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState('1');

  const selectedFromOption = currencies?.[fromCurrency];
  const selectedToOption = currencies?.[toCurrency];

  return (
    <>
      <header className="flex justify-between items-center bg-purple-dark mb-0 py-5 px-4 md:px-12">
        <h1 className="font-semibold text-header-lg text-white">
          Currency Converter
        </h1>
      </header>

      <main>
        <section className="text-white bg-purple text-center px-4 md:px-12 min-h-72 flex items-center justify-center pb-overlap">
          <h2 className="font-semibold text-heading-lg leading-none text-center min-w-[75%]">
            {`${amount} ${selectedFromOption?.symbol} to ${selectedToOption?.symbol} - Convert ${selectedFromOption?.name} to ${selectedToOption?.name}`}
          </h2>
        </section>
        <section className="text-dark bg-white px-4 md:px-9 mx-6 md:mx-auto py-6 md:pt-8 md:pb-4 max-w-6xl rounded-lg shadow-md opacity-100 mt-overlap">
          <div className="grid gap-6 md:gap-x-12 md:grid-cols-[1fr_1fr_auto_1fr]">
            <AmountInput
              label="Amount"
              value={amount}
              onChange={setAmount}
              isLoading={isLoading}
            />
            <CurrencyInput
              label="From"
              value={fromCurrency}
              onChange={setFromCurrency}
              isLoading={isLoading}
              currencyOptions={currencyOptions}
            />
            <SwapButton />
            <CurrencyInput
              label="to"
              value={toCurrency}
              onChange={setToCurrency}
              isLoading={isLoading}
              currencyOptions={currencyOptions}
            />
          </div>
          <div className="grid md:grid-cols-[1fr_1fr] items-center mt-6 md:mt-16 md:min-h-40">
            <Result />
            <InfoTooltip />
          </div>
          <ConversionInfo className="hidden md:block" />
        </section>
        <ConversionInfo className="block md:hidden px-6" />
      </main>

      {error && (
        <Toast
          type="error"
          message={error.message}
          onRetry={refetch}
          retryLabel="Intentar de nuevo"
        />
      )}
    </>
  );
}
