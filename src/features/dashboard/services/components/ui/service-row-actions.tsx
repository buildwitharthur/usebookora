import { EllipsisIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

type ServiceRowActionsProps = {
  serviceName: string;
};

// Editar e Excluir ainda sem ação: entram com o formulário e a exclusão
const ServiceRowActions = ({ serviceName }: ServiceRowActionsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label={`Ações de ${serviceName}`}
        >
          <EllipsisIcon className="size-icon-sm" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="min-w-40">
        <DropdownMenuItem>
          <PencilIcon />
          Editar
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="danger">
          <Trash2Icon />
          Excluir
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ServiceRowActions;
