'use client';

import * as SelectPrimitive from '@radix-ui/react-select';
import { forwardRef } from 'react';

import { cn } from '@/lib/utils'; // Asumo que tienes esta función para concatenar clases

import InputError from './input-error';
import { Label } from './label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from './select';

type Option = {
  value: string;
  label: string;
};

type SelectSimpleProps = React.ComponentProps<typeof SelectPrimitive.Root> & {
  idName: string;
  options: Option[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: { message?: string } | null;
  label?: string;
};

const SimpleSelect = forwardRef<HTMLButtonElement, SelectSimpleProps>(
  (
    { idName, options, placeholder, value, onChange, error, label, ...props },
    ref,
  ) => (
    <div className="grid w-full gap-1">
      {label && <Label htmlFor={idName}>{label}</Label>}
      <Select value={value ?? undefined} onValueChange={onChange} {...props}>
        <SelectTrigger
          id={idName}
          ref={ref}
          className={cn(
            'w-full',
            error ? 'border-destructive focus:ring-destructive' : '',
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${idName}-error` : undefined}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <InputError fieldName={idName} message={error?.message} />
    </div>
  ),
);

SimpleSelect.displayName = 'SimpleSelect';

export default SimpleSelect;
