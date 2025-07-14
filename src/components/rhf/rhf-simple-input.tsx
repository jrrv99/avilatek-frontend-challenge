import { Controller, Control, RegisterOptions } from 'react-hook-form';
import SimpleInput, { SimpleInputProps } from '@/components/ui/simple-input';

type RHFSimpleInputProps = Omit<
  SimpleInputProps,
  'value' | 'error' | 'onChange'
> & {
  name: string;
  control: Control<any>;
  validations?: RegisterOptions;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const RHFSimpleInput = ({
  name,
  control,
  validations,
  onChange,
  ...rest
}: RHFSimpleInputProps) => (
  <Controller
    name={name}
    control={control}
    rules={validations}
    render={({ field, fieldState: { error } }) => (
      <SimpleInput
        {...rest}
        name={name}
        value={field.value ?? 0}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const value = e.target.value;

          field.onChange(value);

          if (onChange) {
            onChange(e);
          }
        }}
        error={error}
      />
    )}
  />
);

export default RHFSimpleInput;
