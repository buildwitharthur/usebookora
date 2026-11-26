import { Select, type SelectProps } from "../select";
import { Field, type FieldBaseProps } from "./field";

export type SelectFieldProps = SelectProps & FieldBaseProps;

/** Select com rótulo, dica e erro. `className` vai para o select */
export const SelectField = ({
  id,
  label,
  error,
  hint,
  ...props
}: SelectFieldProps) => {
  return (
    <Field id={id} label={label} error={error} hint={hint}>
      {(control) => <Select {...props} {...control} />}
    </Field>
  );
};
