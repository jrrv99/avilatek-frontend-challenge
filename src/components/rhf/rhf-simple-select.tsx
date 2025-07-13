import { Controller } from 'react-hook-form';
import SimpleSelect from '@/components/ui/simple-select';

type Option = {
  value: string;
  label: string;
};

type RHFSimpleSelectProps = {
  name: string;
  control: any;
  label?: string;
  options: Option[];
  placeholder?: string;
  validations?: object;
  onChange?: (value: string) => void;
};

const RHFSimpleSelect = ({
  name,
  control,
  label,
  options,
  placeholder,
  validations,
  onChange,
}: RHFSimpleSelectProps) => (
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
          onChange={handleChange}
          error={error}
        />
      );
    }}
  />
);

export default RHFSimpleSelect;
