"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import type { ComponentProps } from "react";
import { cn } from "@/shared/utils/cn";

/** Painel lateral (drawer) baseado no Dialog do Radix */
export const Sheet = DialogPrimitive.Root;
export const SheetTrigger = DialogPrimitive.Trigger;
export const SheetClose = DialogPrimitive.Close;

export const SheetTitle = ({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Title>) => (
  <DialogPrimitive.Title
    data-slot="sheet-title"
    className={cn("text-sm font-semibold", className)}
    {...props}
  />
);

export const SheetContent = ({
  className,
  children,
  ...props
}: ComponentProps<typeof DialogPrimitive.Content>) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay
      data-slot="sheet-overlay"
      className="fixed inset-0 z-(--z-overlay) bg-overlay"
    />
    <DialogPrimitive.Content
      data-slot="sheet-content"
      aria-describedby={undefined}
      className={cn(
        "fixed inset-y-0 left-0 z-(--z-modal) flex w-64 max-w-5/6 flex-col shadow-lg outline-none",
        className,
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
);
