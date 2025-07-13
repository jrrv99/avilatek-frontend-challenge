type InputErrorProps = {
  fieldName?: string;
  message?: string;
  className?: string;
};

const InputError = ({ fieldName, message, className }: InputErrorProps) => {
  if (!message) {
    return null;
  }

  return (
    <p
      id={fieldName ? `${fieldName}-error` : undefined}
      className={`text-sm text-destructive ${className ?? ''}`}
      role="alert"
    >
      {message}
    </p>
  );
};

export default InputError;
