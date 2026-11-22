"use client";

import * as LabelPrimitive from "@radix-ui/react-label";
import type { ComponentProps } from "react";
import { cn } from "@/shared/utils/cn";

export const Label = ({
  className,
  ...props
}: ComponentProps<typeof LabelPrimitive.Root>) => {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "text-sm font-medium text-fg select-none peer-disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
};
