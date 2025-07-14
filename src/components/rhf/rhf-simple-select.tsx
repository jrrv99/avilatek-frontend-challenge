import {
  Controller,
  Control,
  RegisterOptions,
  FieldValues,
  Path,
} from 'react-hook-form';

import SimpleSelect from '@/components/ui/simple-select';

type Option = {
  value: string;
  label: string;
};

type RHFSimpleSelectProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  options: Option[];
  placeholder?: string;
  validations?: RegisterOptions<T, Path<T>>;
  onChange?: (value: string) => void;
};

const RHFSimpleSelect = <T extends FieldValues>({
  name,
  control,
  label,
  options,
  placeholder,
  validations,
  onChange,
}: RHFSimpleSelectProps<T>): React.JSX.Element => (
  <Controller
    name={name}
    control={control}
    rules={validations}
    render={({ field, fieldState: { error } }) => {
      const handleChange = (value: string) => {
        if (onChange) {
          onChange(value);
        }
        field.onChange(value);
      };

      return (
        <SimpleSelect
          idName={name}
          label={label}
          options={options}
          placeholder={placeholder}
          value={field.value}
          error={error}
          onChange={handleChange}
        />
      );
    }}
  />
);

export default RHFSimpleSelect;
