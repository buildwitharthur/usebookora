import type { ComponentProps } from "react";
import { cn } from "@/shared/utils/cn";

/** Campo de texto com várias linhas, no mesmo visual do Input */
export const Textarea = ({
  className,
  ...props
}: ComponentProps<"textarea">) => {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "min-h-24 w-full min-w-0 resize-y rounded-md border border-border-strong bg-surface px-3 py-2 text-fg shadow-xs transition-colors outline-none placeholder:text-fg-muted hover:border-neutral-400 focus-visible:border-focus disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-danger sm:text-sm",
        className,
      )}
      {...props}
    />
  );
};
