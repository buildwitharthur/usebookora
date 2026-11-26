import { Input, type InputProps } from "../input";
import { Field, type FieldBaseProps } from "./field";

export type InputFieldProps = InputProps & FieldBaseProps;

/** Input com rótulo, dica e erro. `className` vai para o input */
export const InputField = ({
  id,
  label,
  error,
  hint,
  ...props
}: InputFieldProps) => {
  return (
    <Field id={id} label={label} error={error} hint={hint}>
      {(control) => <Input {...props} {...control} />}
    </Field>
  );
};
