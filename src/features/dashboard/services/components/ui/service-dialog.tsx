import type { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";

type ServiceDialogProps = {
  /** Elemento que abre o dialog (ex.: botão "Novo serviço" ou item "Editar") */
  trigger: ReactNode;
  title: string;
  description?: string;
  /** Conteúdo do dialog (o formulário de serviço) */
  children: ReactNode;
};

// Esqueleto: ainda não está em uso. Criar e editar entram com o formulário.
const ServiceDialog = ({
  trigger,
  title,
  description,
  children,
}: ServiceDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      {/* Sem descrição, avisa o Radix para não exigir `aria-describedby` */}
      <DialogContent {...(!description && { "aria-describedby": undefined })}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        {children}
      </DialogContent>
    </Dialog>
  );
};

export default ServiceDialog;
