import { Label } from './label';
import { Input } from './input';
import InputError from './input-error';

export type SimpleInputProps = React.ComponentProps<typeof Input> & {
  label?: string;
  error?: { message?: string } | null;
  name?: string;
};

const SimpleInput: React.FC<SimpleInputProps> = ({
  name,
  label,
  error,
  ...props
}) => (
  <div className="grid w-full gap-1">
    {label && <Label>{label}</Label>}
    <Input
      id={name}
      aria-invalid={!!error}
      aria-describedby={error ? `${name}-error` : undefined}
      {...props}
    />
    {error?.message && <InputError fieldName={name} message={error?.message} />}
  </div>
);

export default SimpleInput;
