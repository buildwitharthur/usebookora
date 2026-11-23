"use client";

import { EllipsisIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import type { ServiceListItem } from "../../data-access/get-services";
import ServiceDialog from "./service-dialog";

type ServiceRowActionsProps = {
  service: ServiceListItem;
};

const ServiceRowActions = ({ service }: ServiceRowActionsProps) => {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={`Ações de ${service.name}`}
          >
            <EllipsisIcon className="size-icon-sm" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="min-w-40">
          <DropdownMenuItem onSelect={() => setEditOpen(true)}>
            <PencilIcon />
            Editar
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {/* Ainda sem ação: a exclusão entra na próxima etapa */}
          <DropdownMenuItem variant="danger">
            <Trash2Icon />
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Fora do menu: o menu fecha ao escolher "Editar" e levaria o dialog junto */}
      <ServiceDialog
        service={service}
        open={editOpen}
        onOpenChange={setEditOpen}
      />
    </>
  );
};

export default ServiceRowActions;
