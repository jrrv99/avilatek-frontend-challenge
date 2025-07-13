'use client';

import { Minus, Plus } from 'lucide-react';
import { Button } from './button';
import { Label } from './label';
import { Input } from './input';
import InputError from './input-error';
import { cn } from '@/lib/utils';

export interface StepperInputProps {
  name: string;
  label?: string;
  min?: number;
  max?: number;
  value: number;
  className?: string;
  error?: { message?: string } | null;
  onChange?: (value: number) => void;
}

const StepperInput: React.FC<StepperInputProps> = ({
  name,
  label,
  min,
  max,
  value = 0,
  error,
  className,
  onChange,
}) => {
  return (
    <div className={cn('flex w-full flex-col gap-1', className)}>
      {label && <Label>{label}</Label>}
      <div className="flex items-center space-x-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            const newValue = Math.max(min ?? -Infinity, value - 1);
            if (onChange) onChange(newValue);
          }}
          disabled={min !== undefined && value <= min}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Input
          type="number"
          name={name}
          min={min}
          max={max}
          value={value}
          className="w-20 text-center"
          onChange={e => {
            const value = Number.parseInt(e.target.value) || 1;
            const clampedValue = Math.max(1, Math.min(10, value));
            if (onChange) onChange(clampedValue);
          }}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            const newValue = Math.min(max ?? Infinity, value + 1);
            if (onChange) onChange(newValue);
          }}
          disabled={max !== undefined && value >= max}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <InputError fieldName={name} message={error?.message} />
    </div>
  );
};

export default StepperInput;
