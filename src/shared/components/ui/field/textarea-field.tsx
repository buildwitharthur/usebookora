import type { ComponentProps } from "react";
import { Textarea } from "../textarea";
import { Field, type FieldBaseProps } from "./field";

export type TextareaFieldProps = ComponentProps<typeof Textarea> &
  FieldBaseProps;

/** Textarea com rótulo, dica e erro. `className` vai para o textarea */
export const TextareaField = ({
  id,
  label,
  error,
  hint,
  ...props
}: TextareaFieldProps) => {
  return (
    <Field id={id} label={label} error={error} hint={hint}>
      {(control) => <Textarea {...props} {...control} />}
    </Field>
  );
};
