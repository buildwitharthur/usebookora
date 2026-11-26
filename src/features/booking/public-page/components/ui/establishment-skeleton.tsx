import { Skeleton } from "@/shared/components/ui/skeleton";
import EstablishmentShell, { establishmentShell } from "./establishment-shell";
import ServicesSection, { servicesList } from "./services-section";

const shell = establishmentShell();
const list = servicesList();

// Larguras variadas para o nome não parecer uma grade repetida
const nameWidths = ["w-3/5", "w-2/5", "w-1/2"];

const EstablishmentSkeleton = () => {
  return (
    <EstablishmentShell aria-busy="true">
      <span className="sr-only">Carregando estabelecimento</span>

      <div className={shell.profile()}>
        <Skeleton className={shell.avatar({ class: "rounded-full" })} />

        <div className={shell.heading()}>
          <div className={shell.name()}>
            <Skeleton className="h-6 w-48" />
          </div>
          <div className="flex h-6 items-center">
            <Skeleton className="h-4 w-64" />
          </div>
        </div>

        <div className="flex h-5 items-center">
          <Skeleton className="h-3.5 w-56" />
        </div>
      </div>

      <ServicesSection>
        <div className={list.root()}>
          {nameWidths.map((width) => (
            <div key={width} className={list.item()}>
              <div className={list.row()}>
                <div className={list.info()}>
                  <div className={list.name()}>
                    <Skeleton className={`h-4 ${width}`} />
                  </div>
                  <div className={list.meta()}>
                    <Skeleton className="h-3 w-10" />
                  </div>
                </div>
                <div className={list.price()}>
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </ServicesSection>
    </EstablishmentShell>
  );
};

export default EstablishmentSkeleton;
