import { ChevronDownIcon } from "lucide-react";
import type { ComponentProps } from "react";
import type { VariantProps } from "tailwind-variants";
import { cn } from "@/shared/utils/cn";
import { inputVariants } from "./input";

export type SelectProps = Omit<ComponentProps<"select">, "size"> &
  VariantProps<typeof inputVariants>;

/**
 * Select nativo no mesmo visual do Input. Nativo para funcionar com forms
 * não controlados (`defaultValue`) e ser lido pelo `FormData` como os outros campos.
 */
export const Select = ({
  className,
  size,
  children,
  ...props
}: SelectProps) => {
  return (
    <div className="relative">
      <select
        data-slot="select"
        className={cn(
          inputVariants({ size }),
          "peer cursor-pointer appearance-none pr-9",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDownIcon
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-3 my-auto size-icon-sm text-fg-muted peer-disabled:opacity-50"
      />
    </div>
  );
};
