'use client';

import { RefreshCw, Loader } from 'lucide-react';

import { Button } from '@/components/ui/button';

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
}: ReloadButtonProps) => (
  <Button
    variant="default"
    size="icon"
    className={`mb-1 size-8 ${className}`}
    type="button"
    aria-label={ariaLabel}
    disabled={disabled}
    onClick={onClick}
  >
    {isLoading && <Loader className="animate-spin" />}
    {!isLoading && <RefreshCw />}
  </Button>
);

export default ReloadButton;
