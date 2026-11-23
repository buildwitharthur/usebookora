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
import DeleteServiceDialog from "./delete-service-dialog";
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
          <DeleteServiceDialog service={service}>
            {/* preventDefault: o menu continua montado enquanto a confirmação está aberta */}
            <DropdownMenuItem
              variant="danger"
              onSelect={(event) => event.preventDefault()}
            >
              <Trash2Icon />
              Excluir
            </DropdownMenuItem>
          </DeleteServiceDialog>
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
