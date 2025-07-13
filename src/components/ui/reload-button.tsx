'use client';

import { Button } from '@/components/ui/button';
import { RefreshCw, Loader } from 'lucide-react';

type ReloadButtonProps = {
  onClick: () => void;
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
  isLoading?: boolean;
};

const ReloadButton = ({
  onClick,
  className = '',
  ariaLabel = 'Reload',
  disabled = false,
  isLoading = false,
}: ReloadButtonProps) => {
  return (
    <Button
      variant="default"
      size="icon"
      className={`mb-1 size-8 ${className}`}
      onClick={onClick}
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
    >
      {isLoading && <Loader className="animate-spin" />}
      {!isLoading && <RefreshCw />}
    </Button>
  );
};

export default ReloadButton;
