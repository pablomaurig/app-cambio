type ToastType = 'info' | 'success' | 'error';

interface ToastProps {
  message: string;
  type?: ToastType;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
}

const colors = {
  info: 'bg-blue-100 text-blue-800',
  success: 'bg-green-100 text-green-800',
  error: 'bg-red-100 text-red-800',
};

export function Toast({
  message,
  type = 'info',
  onRetry,
  retryLabel = 'Reintentar',
  className = '',
}: ToastProps) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`fixed bottom-4 right-4 max-w-xs p-4 rounded shadow-md flex items-center justify-between ${colors[type]} ${className}`}
    >
      <p className="mr-4 text-sm">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="font-semibold underline text-sm hover:text-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500 rounded"
          aria-label={retryLabel}
        >
          {retryLabel}
        </button>
      )}
    </div>
  );
}
