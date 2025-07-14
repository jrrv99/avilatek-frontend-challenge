import {
  Controller,
  Control,
  RegisterOptions,
  FieldValues,
  Path,
} from 'react-hook-form';

import ToggleField, { ToggleFieldProps } from '@/components/ui/toggle-field';

type RHFToggleFieldProps<T extends FieldValues> = Omit<
  ToggleFieldProps,
  'checked' | 'onChange'
> & {
  name: Path<T>;
  control: Control<T>;
  validations?: RegisterOptions<T, Path<T>>;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
};

const RHFToggleField = <T extends FieldValues>({
  name,
  control,
  validations,
  disabled = false,
  onChange,
  ...rest
}: RHFToggleFieldProps<T>): React.JSX.Element => (
  <Controller
    name={name}
    control={control}
    rules={validations}
    render={({ field }) => {
      const handleChange = (checked: boolean) => {
        field.onChange(checked); // RHF event

        if (onChange) {
          onChange(checked); // custom event
        }
      };

      return (
        <ToggleField
          {...rest}
          name={field.name}
          checked={!!field.value}
          disabled={disabled}
          onChange={handleChange}
        />
      );
    }}
  />
);

export default RHFToggleField;
