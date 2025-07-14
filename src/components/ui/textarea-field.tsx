import React from 'react';
import { Label } from './label';
import { Textarea } from './textarea';
import InputError from './input-error';

export type TextareaFieldProps = React.ComponentProps<typeof Textarea> & {
  label?: string;
  error?: { message?: string } | null;
  id?: string;
};

const TextareaField: React.FC<TextareaFieldProps> = ({
  label,
  error,
  id,
  ...props
}) => {
  const textareaId = id || props.name;

  return (
    <div className="grid w-full gap-1">
      {label && (
        <Label htmlFor={textareaId} className="text-sm font-medium">
          {label}
        </Label>
      )}
      <Textarea
        id={textareaId}
        aria-invalid={!!error}
        aria-describedby={error ? `${textareaId}-error` : undefined}
        {...props}
      />
      {error?.message && (
        <InputError fieldName={textareaId} message={error.message} />
      )}
    </div>
  );
};

export default TextareaField;
