import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/shared/utils/cn";

export const inputVariants = tv({
  base: "w-full min-w-0 rounded-md border border-border-strong bg-surface px-3 text-fg shadow-xs transition-colors outline-none placeholder:text-fg-muted hover:border-neutral-400 focus-visible:border-focus disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-danger",
  variants: {
    size: {
      sm: "h-control-sm sm:text-sm",
      md: "h-control-md sm:text-sm",
      lg: "h-control-lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type InputProps = Omit<ComponentProps<"input">, "size"> &
  VariantProps<typeof inputVariants>;

export const Input = ({
  className,
  size,
  type = "text",
  ...props
}: InputProps) => {
  return (
    <input
      data-slot="input"
      type={type}
      className={cn(inputVariants({ size }), className)}
      {...props}
    />
  );
};
