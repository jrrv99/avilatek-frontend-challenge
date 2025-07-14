import React from 'react';
import { Controller, Control, RegisterOptions } from 'react-hook-form';
import ToggleField, { ToggleFieldProps } from '@/components/ui/toggle-field';

type RHFToggleFieldProps = Omit<ToggleFieldProps, 'checked' | 'onChange'> & {
  name: string;
  control: Control<any>;
  validations?: RegisterOptions;
  disabled?: boolean;
};

const RHFToggleField: React.FC<RHFToggleFieldProps> = ({
  name,
  control,
  validations,
  disabled = false,
  ...rest
}) => (
  <Controller
    name={name}
    control={control}
    rules={validations}
    render={({ field }) => (
      <ToggleField
        {...rest}
        name={field.name}
        checked={!!field.value}
        onChange={field.onChange}
        disabled={disabled}
      />
    )}
  />
);

export default RHFToggleField;
