export function InfoTooltip() {
  return (
    <div
      role="note"
      aria-label="Rate conversion information"
      className="hidden md:block text-sm leading-9 py-4 px-6 bg-purple-light rounded-lg shadow-sm self-end"
    >
      We use the mid-market rate for our Converter. This is for informational
      purposes only. You won’t receive this rate when sending money.
    </div>
  );
}
