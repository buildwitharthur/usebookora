"use client";

import { LoaderCircle } from "lucide-react";
import {
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/shared/components/ui/alert-dialog";
import { Button } from "@/shared/components/ui/button";
import { useDeleteService } from "../../hooks/use-delete-service";

type DeleteServiceFormProps = {
  serviceId: string;
  onSuccess: () => void;
};

const DeleteServiceForm = ({
  serviceId,
  onSuccess,
}: DeleteServiceFormProps) => {
  const { formAction, isPending, formError } = useDeleteService({ onSuccess });

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="id" value={serviceId} />

      {formError && (
        <p
          role="alert"
          className="rounded-md border border-danger-border bg-danger-bg px-3 py-2 text-sm text-danger-fg"
        >
          {formError}
        </p>
      )}

      <AlertDialogFooter>
        <AlertDialogCancel asChild>
          <Button type="button" variant="ghost" disabled={isPending}>
            Cancelar
          </Button>
        </AlertDialogCancel>

        {/* Botão comum, não AlertDialogAction: o dialog só fecha depois que a exclusão termina */}
        <Button type="submit" variant="danger" disabled={isPending}>
          {isPending && (
            <LoaderCircle
              aria-hidden="true"
              className="size-icon-sm animate-spin"
            />
          )}
          {isPending ? "Excluindo..." : "Excluir serviço"}
        </Button>
      </AlertDialogFooter>
    </form>
  );
};

export default DeleteServiceForm;
