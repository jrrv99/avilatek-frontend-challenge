'use client';

import * as React from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover'; // Ajusta import según tu estructura
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { Label } from './label';
import InputError from './input-error';

type CalendarPopoverProps = {
  selectedDate: Date | undefined;
  idName: string;
  label?: string;
  onSelectDate: (date: Date | undefined) => void;
  disabledDate?: (date: Date) => boolean;
  placeholder?: string;
  error?: { message?: string } | null;
};

export function CalendarPopover({
  selectedDate,
  onSelectDate,
  disabledDate,
  label,
  idName,
  placeholder = 'Pick a date',
  error,
}: CalendarPopoverProps) {
  return (
    <div className="grid gap-1">
      {label && <Label htmlFor={idName}>{label}</Label>}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="idName"
            variant="outline"
            className={cn(
              'w-full pl-3 text-left font-normal',
              !selectedDate && 'text-muted-foreground',
            )}
          >
            {selectedDate ? (
              format(selectedDate, 'PPP')
            ) : (
              <span>{placeholder}</span>
            )}
            <CalendarIcon className="text-primary ml-auto h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={onSelectDate}
            disabled={disabledDate}
            captionLayout="dropdown"
          />
        </PopoverContent>
      </Popover>
      <InputError fieldName={idName} message={error?.message} />
    </div>
  );
}
