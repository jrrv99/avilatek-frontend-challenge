import { Label } from './label';
import { Switch } from './switch';

export type ToggleFieldProps = {
  name: string;
  title: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  disabled?: boolean;
};

const ToggleField: React.FC<ToggleFieldProps> = ({
  name,
  title,
  description,
  checked,
  icon: Icon,
  onChange,
  disabled = false,
}) => (
  <div className="flex flex-row items-center rounded-lg border p-4">
    <Label
      htmlFor={name}
      className="flex w-full items-start space-y-0.5"
    >
      {Icon && <Icon className="h-8 w-8 text-blue-600" />}
      <div className="flex w-full flex-col items-start space-y-0.5">
        {title}
        <p className="text-muted-foreground text-sm">{description || ''}</p>
      </div>
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
