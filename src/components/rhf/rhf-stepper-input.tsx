import { Controller } from 'react-hook-form';
import StepperInput, { StepperInputProps } from '@/components/ui/stepper-input';

type RHFSimpleStepperProps = Omit<StepperInputProps, 'value' | 'error'> & {
  name: string;
  control: any;
  validations?: object;
};

const RHFSimpleInput = ({
  name,
  control,
  validations,
  onChange,
  ...rest
}: RHFSimpleStepperProps) => (
  <Controller
    name={name}
    control={control}
    rules={validations}
    render={({ field, fieldState: { error } }) => (
      <StepperInput
        {...rest}
        name={name}
        value={field.value ?? 0}
        onChange={(value: number) => {
          field.onChange(value);

          if (onChange) {
            onChange(value);
          }
        }}
        error={error}
      />
    )}
  />
);

export default RHFSimpleInput;
