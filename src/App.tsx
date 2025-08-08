import { useCurrencies } from './hooks/useCurrencies';
import { useConversionState } from './hooks/useConversionState';
import { useConversion } from './hooks/useConversion';
import { AmountInput } from './components/amount-input';
import { CurrencyInput } from './components/currency-input';
import { SwapButton } from './components/swap-button';
import { Result } from './components/result';
import { InfoTooltip } from './components/info-tooltip';
import { ConversionInfo } from './components/conversion-info';
import { Toast } from './components/toast';

export default function App() {
  const {
    currencyOptions,
    data: currencies,
    isLoading: isCurrenciesLoading,
    refetch: refetchCurrencies,
    error: currenciesError,
  } = useCurrencies();
  const {
    amount,
    from,
    to,
    setAmountToConvert,
    setFromCurrency,
    setToCurrency,
    swap,
  } = useConversionState();
  const {
    conversionRate,
    convertedAmount,
    isLoading: isLoadingConversion,
    lastUpdated,
    error: conversionError,
    refetch: refetchConversion,
  } = useConversion(from, to, amount);

  const selectedFromOption = currencies?.[from];
  const selectedToOption = currencies?.[to];

  const errorConfig = [
    { error: currenciesError, refetch: refetchCurrencies },
    { error: conversionError, refetch: refetchConversion },
  ].find(({ error }) => !!error);

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
              onChange={setAmountToConvert}
              isLoading={isCurrenciesLoading}
            />
            <CurrencyInput
              label="From"
              value={from}
              onChange={setFromCurrency}
              isLoading={isCurrenciesLoading}
              currencyOptions={currencyOptions}
            />
            <SwapButton onSwap={swap} />
            <CurrencyInput
              label="To"
              value={to}
              onChange={setToCurrency}
              isLoading={isCurrenciesLoading}
              currencyOptions={currencyOptions}
            />
          </div>
          <div className="grid md:grid-cols-[1fr_1fr] items-center mt-6 md:mt-16 md:min-h-40">
            <Result
              conversionRate={conversionRate}
              convertedAmount={convertedAmount}
              loading={isLoadingConversion}
              amount={amount}
              from={selectedFromOption}
              to={selectedToOption}
            />
            <InfoTooltip />
          </div>
          <ConversionInfo
            className="hidden md:block"
            selectedFromOption={selectedFromOption}
            selectedToOption={selectedToOption}
            lastUpdated={lastUpdated}
            isLoading={isLoadingConversion}
          />
        </section>
        <ConversionInfo
          className="block md:hidden px-6"
          selectedFromOption={selectedFromOption}
          selectedToOption={selectedToOption}
          lastUpdated={lastUpdated}
          isLoading={isLoadingConversion}
        />
      </main>

      {errorConfig && (
        <Toast
          type="error"
          message={errorConfig.error?.message || 'Ocurrió un error'}
          onRetry={errorConfig.refetch}
          retryLabel="Intentar de nuevo"
        />
      )}
    </>
  );
}
