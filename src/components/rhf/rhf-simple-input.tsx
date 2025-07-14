import {
  Controller,
  Control,
  RegisterOptions,
  FieldValues,
  Path,
} from 'react-hook-form';

import SimpleInput, { SimpleInputProps } from '@/components/ui/simple-input';

type RHFSimpleInputProps<T extends FieldValues> = Omit<
  SimpleInputProps,
  'value' | 'error' | 'onChange'
> & {
  name: Path<T>;
  control: Control<T>;
  validations?: RegisterOptions<T, Path<T>>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const RHFSimpleInput = <T extends FieldValues>({
  name,
  control,
  validations,
  onChange,
  ...rest
}: RHFSimpleInputProps<T>): React.JSX.Element => (
  <Controller
    name={name}
    control={control}
    rules={validations}
    render={({ field, fieldState: { error } }) => (
      <SimpleInput
        {...rest}
        name={name}
        value={field.value ?? ''}
        error={error}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const { value } = e.target;
          field.onChange(value);
          if (onChange) {
            onChange(e);
          }
        }}
      />
    )}
  />
);

export default RHFSimpleInput;
