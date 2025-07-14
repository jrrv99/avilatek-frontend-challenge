'use client';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover'; // Ajusta import según tu estructura
import { cn } from '@/lib/utils';

import InputError from './input-error';
import { Label } from './label';

type CalendarPopoverProps = {
  selectedDate: Date | undefined;
  idName: string;
  label?: string;
  onSelectDate: (date: Date | undefined) => void;
  disabledDate?: (date: Date) => boolean;
  placeholder?: string;
  error?: { message?: string } | undefined;
};

export const CalendarPopover = ({
  selectedDate,
  onSelectDate,
  disabledDate,
  label,
  idName,
  placeholder = 'Pick a date',
  error,
}: CalendarPopoverProps) => (
  <div className="grid gap-1">
    {label && <Label htmlFor={idName}>{label}</Label>}
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id={idName}
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
          disabled={disabledDate}
          captionLayout="dropdown"
          onSelect={onSelectDate}
        />
      </PopoverContent>
    </Popover>
    <InputError fieldName={idName} message={error?.message} />
  </div>
);
