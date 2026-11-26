import type { ReactNode } from "react";
import { cn } from "@/shared/utils/cn";
import { Label } from "../label";

/** Props que o Field liga no controle: id do rótulo e as mensagens de erro e dica */
export type FieldControlProps = {
  id: string;
  "aria-invalid": boolean;
  "aria-describedby"?: string;
};

/** Props comuns a todos os campos com rótulo, erro e dica */
export type FieldBaseProps = {
  /** Liga o rótulo ao controle e gera os ids da dica (`<id>-hint`) e do erro (`<id>-error`) */
  id: string;
  label: ReactNode;
  /** Mensagem de erro do campo; marca o controle como inválido */
  error?: string;
  /** Texto de apoio abaixo do controle */
  hint?: ReactNode;
};

type FieldProps = FieldBaseProps & {
  className?: string;
  /** Renderiza o controle com as props de acessibilidade já resolvidas */
  children: (control: FieldControlProps) => ReactNode;
};

/**
 * Rótulo, controle, dica e erro de um campo de form. Use direto só quando o
 * controle precisa de algo em volta (prefixo, addon); senão, use InputField,
 * TextareaField ou SelectField.
 */
export const Field = ({
  id,
  label,
  error,
  hint,
  className,
  children,
}: FieldProps) => {
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;

  const describedBy =
    [hint && hintId, error && errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div data-slot="field" className={cn("flex flex-col gap-1.5", className)}>
      <Label htmlFor={id}>{label}</Label>

      {children({
        id,
        "aria-invalid": !!error,
        "aria-describedby": describedBy,
      })}

      {hint && (
        <p id={hintId} className="text-xs text-fg-muted">
          {hint}
        </p>
      )}

      {error && (
        <p id={errorId} className="text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
};
