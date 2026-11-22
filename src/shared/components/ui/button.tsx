import { Slot } from "@radix-ui/react-slot";
import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/shared/utils/cn";

export const buttonVariants = tv({
  base: "inline-flex items-center justify-center gap-2 rounded-md font-medium whitespace-nowrap transition-colors select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus active:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0",
  variants: {
    variant: {
      primary: "surface-brand text-brand-on",
      secondary: "surface-raised text-fg emboss active:surface-inset",
      ghost: "text-fg-secondary hover:bg-subtle hover:text-fg",
    },
    size: {
      sm: "h-control-sm px-3 text-sm",
      md: "h-control-md px-4 text-sm",
      lg: "h-control-lg px-6 text-md",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

export type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    /** Renderiza o filho (ex.: `<Link>`) com o visual do botão */
    asChild?: boolean;
  };

export const Button = ({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
};
