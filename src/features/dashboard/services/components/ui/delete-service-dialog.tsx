"use client";

import { useState, type ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/components/ui/alert-dialog";
import type { ServiceListItem } from "../../data-access/get-services";
import DeleteServiceForm from "./delete-service-form";

type DeleteServiceDialogProps = {
  service: Pick<ServiceListItem, "id" | "name">;
  /** Elemento que abre a confirmação */
  children: ReactNode;
};

const DeleteServiceDialog = ({
  service,
  children,
}: DeleteServiceDialogProps) => {
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      {/* O form só existe com o dialog aberto: cada abertura começa sem erro */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir serviço?</AlertDialogTitle>
          <AlertDialogDescription>
            <strong className="font-medium text-fg">{service.name}</strong> sai
            da sua página de agendamentos, e os agendamentos dele também são
            apagados. Não é possível desfazer.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <DeleteServiceForm
          serviceId={service.id}
          onSuccess={() => setOpen(false)}
        />
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteServiceDialog;
