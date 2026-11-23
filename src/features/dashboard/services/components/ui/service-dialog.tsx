"use client";

import { useState, type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import type { ServiceListItem } from "../../data-access/get-services";
import ServiceForm from "./service-form";

type ServiceDialogProps = {
  /** Com serviço, edita; sem serviço, cria */
  service?: ServiceListItem;
  /** Elemento que abre o dialog. Sem ele, controle pelo `open` (ex.: a partir de um menu) */
  children?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const ServiceDialog = ({
  service,
  children,
  open: openProp,
  onOpenChange,
}: ServiceDialogProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = openProp ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}

      {/* O form só existe com o dialog aberto: cada abertura começa limpa */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {service ? "Editar serviço" : "Novo serviço"}
          </DialogTitle>
          <DialogDescription>
            {service
              ? "As mudanças aparecem na hora na sua página de agendamentos."
              : "O serviço aparece na sua página de agendamentos com duração e preço."}
          </DialogDescription>
        </DialogHeader>

        <ServiceForm service={service} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default ServiceDialog;
