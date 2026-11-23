"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/shared/utils/cn";

/** Modal centralizado baseado no Dialog do Radix */
export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

export const DialogContent = ({
  className,
  children,
  ...props
}: ComponentProps<typeof DialogPrimitive.Content>) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className="fixed inset-0 z-(--z-overlay) bg-overlay"
    />
    <DialogPrimitive.Content
      data-slot="dialog-content"
      className={cn(
        "fixed top-1/2 left-1/2 z-(--z-modal) flex w-[calc(100%-2rem)] max-w-narrow -translate-x-1/2 -translate-y-1/2 flex-col gap-5 rounded-xl border border-border bg-surface p-5 text-sm text-fg shadow-lg outline-none",
        className,
      )}
      {...props}
    >
      {children}

      <DialogPrimitive.Close
        aria-label="Fechar"
        className="absolute top-3 right-3 inline-flex size-control-sm items-center justify-center rounded-md text-fg-muted transition-colors hover:bg-subtle hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
      >
        <XIcon className="size-icon-sm" />
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
);

export const DialogHeader = ({
  className,
  ...props
}: ComponentProps<"div">) => (
  <div
    data-slot="dialog-header"
    className={cn("flex flex-col gap-1 pr-8", className)}
    {...props}
  />
);

export const DialogFooter = ({
  className,
  ...props
}: ComponentProps<"div">) => (
  <div
    data-slot="dialog-footer"
    className={cn(
      "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
      className,
    )}
    {...props}
  />
);

export const DialogTitle = ({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Title>) => (
  <DialogPrimitive.Title
    data-slot="dialog-title"
    className={cn("text-md leading-snug font-semibold", className)}
    {...props}
  />
);

export const DialogDescription = ({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Description>) => (
  <DialogPrimitive.Description
    data-slot="dialog-description"
    className={cn("text-sm text-pretty text-fg-secondary", className)}
    {...props}
  />
);
