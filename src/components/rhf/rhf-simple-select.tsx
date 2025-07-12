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
};

const RHFSimpleSelect = ({
  name,
  control,
  label,
  options,
  placeholder,
  validations,
}: RHFSimpleSelectProps) => (
  <Controller
    name={name}
    control={control}
    rules={validations}
    render={({ field, fieldState: { error } }) => (
      <SimpleSelect
        idName={name}
        label={label}
        options={options}
        placeholder={placeholder}
        value={field.value}
        onChange={field.onChange}
        error={error}
      />
    )}
  />
);

export default RHFSimpleSelect;
