"use client";

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import type { ComponentProps } from "react";
import { cn } from "@/shared/utils/cn";

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuGroup = DropdownMenuPrimitive.Group;

export const DropdownMenuContent = ({
  className,
  sideOffset = 6,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Content>) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      data-slot="dropdown-menu-content"
      sideOffset={sideOffset}
      className={cn(
        // Mesmo z do modal: abre também de dentro do drawer no mobile
        "z-(--z-modal) min-w-48 overflow-hidden rounded-md border border-border bg-surface p-1 text-sm text-fg shadow-md outline-none focus-visible:shadow-md",
        className,
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
);

export const DropdownMenuItem = ({
  className,
  variant = "default",
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  variant?: "default" | "danger";
}) => (
  <DropdownMenuPrimitive.Item
    data-slot="dropdown-menu-item"
    data-variant={variant}
    className={cn(
      "flex h-8 cursor-default items-center gap-2 rounded-sm px-2 text-sm outline-none select-none focus-visible:shadow-none data-disabled:pointer-events-none data-disabled:opacity-50 data-highlighted:bg-subtle data-[variant=danger]:text-danger [&_svg]:size-icon-sm [&_svg]:shrink-0 [&_svg]:text-fg-muted data-[variant=danger]:[&_svg]:text-danger",
      className,
    )}
    {...props}
  />
);

export const DropdownMenuLabel = ({
  className,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Label>) => (
  <DropdownMenuPrimitive.Label
    data-slot="dropdown-menu-label"
    className={cn("px-2 py-1.5 text-xs", className)}
    {...props}
  />
);

export const DropdownMenuSeparator = ({
  className,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Separator>) => (
  <DropdownMenuPrimitive.Separator
    data-slot="dropdown-menu-separator"
    className={cn("-mx-1 my-1 h-px bg-border", className)}
    {...props}
  />
);
