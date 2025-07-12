'use client';

import { Controller, Control } from 'react-hook-form';
import { CalendarPopover } from '@/components/ui/calendar-popover';

type DatePickerProps = {
  control: Control<any>;
  name: string;
  placeholder?: string;
  label?: string;
  rules?: object;
};

export default function RHFCalendarPopover({
  control,
  name,
  label,
  rules,
  placeholder = 'Selecciona una fecha',
}: DatePickerProps) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState: { error } }) => {
        return (
            <CalendarPopover
              idName={name}
              label={label}
              selectedDate={field.value}
              onSelectDate={field.onChange}
              placeholder={placeholder}
              error={error}
            />
        );
      }}
    />
  );
}
