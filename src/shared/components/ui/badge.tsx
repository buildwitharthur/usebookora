import { Slot } from "@radix-ui/react-slot";
import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/shared/utils/cn";

export const badgeVariants = tv({
  base: "inline-flex w-fit shrink-0 items-center justify-center gap-1.5 rounded-full border font-medium whitespace-nowrap [&_svg]:size-3 [&_svg]:shrink-0",
  variants: {
    variant: {
      brand: "border-transparent bg-brand text-brand-on",
      subtle: "border-transparent bg-brand-subtle text-brand",
      outline: "border-border bg-surface text-fg-secondary shadow-xs",
      success: "border-success-border bg-success-bg text-success-fg",
    },
    size: {
      sm: "px-2 py-0.5 text-xs",
      md: "px-3 py-1 text-xs",
    },
  },
  defaultVariants: {
    variant: "outline",
    size: "md",
  },
});

export type BadgeProps = ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    /** Renderiza o filho com o visual do badge */
    asChild?: boolean;
  };

export const Badge = ({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: BadgeProps) => {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
};
