import { CircleAlert } from 'lucide-react';

type ErrorMessageProps = {
  message?: string;
  className?: string;
};

const ErrorMessage = ({ message, className }: ErrorMessageProps) => {
  if (!message) return null;

  return (
    <div
      role="alert"
      className={`border-destructive-foreground bg-destructive-foreground text-destructive flex h-9 items-center space-x-2 rounded-md border px-3 w-full ${className ?? ''}`}
    >
      <CircleAlert />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
};

export default ErrorMessage;
