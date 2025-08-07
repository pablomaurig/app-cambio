import { SwapCurrencyIcon } from './icons/swap-currency-icon';

export function SwapButton({ onSwap }: { onSwap: () => void }) {
  return (
    <button
      onClick={onSwap}
      type="button"
      aria-label="Swap currencies"
      className="self-end flex items-center justify-center w-10 h-10 bg-white hover:bg-violet-50 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-100 border border-purple"
    >
      <SwapCurrencyIcon />
    </button>
  );
}
