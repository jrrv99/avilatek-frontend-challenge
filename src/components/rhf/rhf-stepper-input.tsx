import {
  Controller,
  Control,
  RegisterOptions,
  FieldValues,
  Path,
} from 'react-hook-form';

import StepperInput, { StepperInputProps } from '@/components/ui/stepper-input';

type RHFSimpleStepperProps<T extends FieldValues> = Omit<
  StepperInputProps,
  'value' | 'error' | 'onChange'
> & {
  name: Path<T>;
  control: Control<T>;
  validations?: RegisterOptions<T, Path<T>>;
  onChange?: (value: number) => void;
};

const RHFSimpleStepper = <T extends FieldValues>({
  name,
  control,
  validations,
  onChange,
  ...rest
}: RHFSimpleStepperProps<T>): React.JSX.Element => (
  <Controller
    name={name}
    control={control}
    rules={validations}
    render={({ field, fieldState: { error } }) => (
      <StepperInput
        {...rest}
        name={name}
        value={field.value ?? 0}
        error={error}
        onChange={(value: number) => {
          field.onChange(value);
          if (onChange) {
            onChange(value);
          }
        }}
      />
    )}
  />
);

export default RHFSimpleStepper;
