import {
  Controller,
  Control,
  RegisterOptions,
  FieldValues,
  Path,
} from 'react-hook-form';

import TextareaField, {
  TextareaFieldProps,
} from '@/components/ui/textarea-field';

type RHFTextareaFieldProps<T extends FieldValues> = Omit<
  TextareaFieldProps,
  'error' | 'id'
> & {
  name: Path<T>;
  control: Control<T>;
  validations?: RegisterOptions<T, Path<T>>;
};

const RHFTextareaField = <T extends FieldValues>({
  name,
  control,
  validations,
  ...rest
}: RHFTextareaFieldProps<T>): React.JSX.Element => (
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
