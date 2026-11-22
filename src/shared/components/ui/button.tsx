import Link from "next/link";
import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/shared/utils/cn";

export const buttonVariants = tv({
  base: "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors select-none active:translate-y-px disabled:pointer-events-none disabled:opacity-50",
  variants: {
    variant: {
      primary: "bg-brand text-brand-on shadow-sm hover:bg-brand-hover",
      secondary:
        "border border-border bg-surface text-fg shadow-xs hover:border-border-strong hover:bg-subtle",
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

type ButtonVariants = VariantProps<typeof buttonVariants>;

export type ButtonProps = ComponentProps<"button"> & ButtonVariants;

export const Button = ({
  className,
  variant,
  size,
  type = "button",
  ...props
}: ButtonProps) => (
  <button
    type={type}
    className={cn(buttonVariants({ variant, size }), className)}
    {...props}
  />
);

export type ButtonLinkProps = ComponentProps<typeof Link> & ButtonVariants;

export const ButtonLink = ({
  className,
  variant,
  size,
  ...props
}: ButtonLinkProps) => (
  <Link
    className={cn(buttonVariants({ variant, size }), className)}
    {...props}
  />
);
