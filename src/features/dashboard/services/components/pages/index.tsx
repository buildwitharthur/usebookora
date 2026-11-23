import { PlusIcon } from "lucide-react";
import { Suspense } from "react";
import { Button } from "@/shared/components/ui/button";
import ServiceDialog from "../ui/service-dialog";
import ServicesData from "../ui/services-data";
import ServicesTableSkeleton from "../ui/services-table-skeleton";

const ServicesPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <header className="flex items-center justify-between gap-4">
        <p className="text-pretty text-fg-secondary">
          Os serviços aparecem na sua página de agendamentos.
        </p>

        <ServiceDialog>
          <Button size="sm" className="shrink-0">
            <PlusIcon className="size-icon-sm" />
            Novo serviço
          </Button>
        </ServiceDialog>
      </header>

      <Suspense fallback={<ServicesTableSkeleton />}>
        <ServicesData />
      </Suspense>
    </div>
  );
};

export default ServicesPage;
