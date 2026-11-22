"use client";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { MenuIcon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet";

type MobileNavProps = {
  children: React.ReactNode;
};

const MobileNav = ({ children }: MobileNavProps) => {
  const [open, setOpen] = useState(false);

  /* Fecha o drawer ao navegar por qualquer link de dentro dele */
  const handleClickCapture = (event: React.MouseEvent) => {
    if ((event.target as HTMLElement).closest("a[href]")) {
      setOpen(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Abrir menu"
          className="-ml-1.5 lg:hidden"
        >
          <MenuIcon className="size-icon-sm" />
        </Button>
      </SheetTrigger>

      <SheetContent
        className="border-r border-sidebar-border"
        onClickCapture={handleClickCapture}
      >
        <VisuallyHidden>
          <SheetTitle>Menu</SheetTitle>
        </VisuallyHidden>
        {children}
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
