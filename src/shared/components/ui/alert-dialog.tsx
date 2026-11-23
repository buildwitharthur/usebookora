"use client";

import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import type { ComponentProps } from "react";
import { cn } from "@/shared/utils/cn";

/** Confirmação de ação destrutiva: não fecha ao clicar fora, só pelos botões ou Esc */
export const AlertDialog = AlertDialogPrimitive.Root;
export const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
export const AlertDialogCancel = AlertDialogPrimitive.Cancel;
export const AlertDialogAction = AlertDialogPrimitive.Action;

export const AlertDialogContent = ({
  className,
  ...props
}: ComponentProps<typeof AlertDialogPrimitive.Content>) => (
  <AlertDialogPrimitive.Portal>
    <AlertDialogPrimitive.Overlay
      data-slot="alert-dialog-overlay"
      className="fixed inset-0 z-(--z-overlay) bg-overlay"
    />
    <AlertDialogPrimitive.Content
      data-slot="alert-dialog-content"
      className={cn(
        "fixed top-1/2 left-1/2 z-(--z-modal) flex w-[calc(100%-2rem)] max-w-narrow -translate-x-1/2 -translate-y-1/2 flex-col gap-5 rounded-xl border border-border bg-surface p-5 text-sm text-fg shadow-lg outline-none",
        className,
      )}
      {...props}
    />
  </AlertDialogPrimitive.Portal>
);

export const AlertDialogHeader = ({
  className,
  ...props
}: ComponentProps<"div">) => (
  <div
    data-slot="alert-dialog-header"
    className={cn("flex flex-col gap-1", className)}
    {...props}
  />
);

export const AlertDialogFooter = ({
  className,
  ...props
}: ComponentProps<"div">) => (
  <div
    data-slot="alert-dialog-footer"
    className={cn(
      "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
      className,
    )}
    {...props}
  />
);

export const AlertDialogTitle = ({
  className,
  ...props
}: ComponentProps<typeof AlertDialogPrimitive.Title>) => (
  <AlertDialogPrimitive.Title
    data-slot="alert-dialog-title"
    className={cn("text-md leading-snug font-semibold", className)}
    {...props}
  />
);

export const AlertDialogDescription = ({
  className,
  ...props
}: ComponentProps<typeof AlertDialogPrimitive.Description>) => (
  <AlertDialogPrimitive.Description
    data-slot="alert-dialog-description"
    className={cn("text-sm text-pretty text-fg-secondary", className)}
    {...props}
  />
);
