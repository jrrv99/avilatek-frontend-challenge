'use client';

import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

type ReloadButtonProps = {
  onClick: () => void;
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
};

const ReloadButton = ({
  onClick,
  className = '',
  ariaLabel = 'Reload',
  disabled = false,
}: ReloadButtonProps) => {
  return (
    <Button
      variant="secondary"
      size="icon"
      className={`mb-1 size-8 ${className}`}
      onClick={onClick}
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
    >
      <RefreshCw className="text-primary" />
    </Button>
  );
};

export default ReloadButton;
