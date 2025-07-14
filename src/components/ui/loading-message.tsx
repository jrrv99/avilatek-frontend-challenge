import { Loader } from 'lucide-react';

type LoadingMessageProps = {
  message?: string;
  className?: string;
};

const LoadingMessage = ({
  message = 'Loading...',
  className = '',
}: LoadingMessageProps) => (
  <div
    role="status"
    className={`border-input bg-primary-foreground text-primary flex h-9 items-center space-x-2 rounded border px-3 ${className ?? ''}`}
  >
    <Loader className="h-5 w-5 animate-spin" />
    <span>{message}</span>
  </div>
);

export default LoadingMessage;
