import React from 'react';
import { Controller, Control, RegisterOptions } from 'react-hook-form';
import TextareaField, {
  TextareaFieldProps,
} from '@/components/ui/textarea-field';

type RHFTextareaFieldProps = Omit<TextareaFieldProps, 'error' | 'id'> & {
  name: string;
  control: Control<any>;
  validations?: RegisterOptions;
};

const RHFTextareaField: React.FC<RHFTextareaFieldProps> = ({
  name,
  control,
  validations,
  ...rest
}) => (
  <Controller
    name={name}
    control={control}
    rules={validations}
    render={({ field, fieldState: { error } }) => (
      <TextareaField id={name} error={error} {...rest} {...field} />
    )}
  />
);

export default RHFTextareaField;
