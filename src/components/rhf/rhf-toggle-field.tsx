import { Controller, Control, RegisterOptions } from 'react-hook-form';
import ToggleField, { ToggleFieldProps } from '@/components/ui/toggle-field';

type RHFToggleFieldProps = Omit<ToggleFieldProps, 'checked' | 'onChange'> & {
  name: string;
  control: Control<any>;
  validations?: RegisterOptions;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
};

const RHFToggleField: React.FC<RHFToggleFieldProps> = ({
  name,
  control,
  validations,
  disabled = false,
  onChange,
  ...rest
}) => (
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
          onChange={handleChange}
          disabled={disabled}
        />
      );
    }}
  />
);

export default RHFToggleField;
