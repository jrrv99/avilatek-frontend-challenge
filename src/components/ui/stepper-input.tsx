'use client';

import { Minus, Plus } from 'lucide-react';

import { cn } from '@/lib/utils';

import { Button } from './button';
import { Input } from './input';
import InputError from './input-error';
import { Label } from './label';

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
  value,
  error,
  className,
  onChange,
}) => (
  <div className={cn('flex w-full flex-col gap-1', className)}>
    {label && <Label>{label}</Label>}
    <div className="flex items-center space-x-2">
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={min !== undefined && value <= min}
        onClick={() => {
          const newValue = Math.max(min ?? -Infinity, value - 1);
          if (onChange) onChange(newValue);
        }}
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
        onChange={onChange ? e => onChange(Number(e.target.value)) : undefined}
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={max !== undefined && value >= max}
        onClick={() => {
          const newValue = Math.min(max ?? Infinity, value + 1);
          if (onChange) onChange(newValue);
        }}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
    <InputError fieldName={name} message={error?.message} />
  </div>
);

export default StepperInput;
