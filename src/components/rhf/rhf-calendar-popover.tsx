'use client';

import { Controller, Control, FieldValues, Path } from 'react-hook-form';

import { CalendarPopover } from '@/components/ui/calendar-popover';

type DatePickerProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  placeholder?: string;
  label?: string;
  rules?: object;
};

const RHFCalendarPopover = <T extends FieldValues>({
  control,
  name,
  label,
  rules,
  placeholder = 'Selecciona una fecha',
}: DatePickerProps<T>): React.JSX.Element => (
  <Controller
    control={control}
    name={name}
    rules={rules}
    render={({ field, fieldState: { error } }) => (
      <CalendarPopover
        idName={name}
        label={label}
        selectedDate={field.value}
        placeholder={placeholder}
        error={error}
        onSelectDate={field.onChange}
      />
    )}
  />
);

export default RHFCalendarPopover;
