import { Label } from './label';
import { Switch } from './switch';

export type ToggleFieldProps = {
  name: string;
  title: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
};

const ToggleField: React.FC<ToggleFieldProps> = ({
  name,
  title,
  description,
  checked,
  onChange,
  disabled = false,
}) => (
  <div className="flex flex-row items-center rounded-lg border p-4">
    <Label htmlFor={name} className="flex flex-col items-start space-y-0.5 w-full">
      {title}
      <p className="text-muted-foreground text-sm">{description || ''}</p>
    </Label>
    <Switch
      id={name}
      checked={checked}
      onCheckedChange={onChange}
      disabled={disabled}
    />
  </div>
);

export default ToggleField;
