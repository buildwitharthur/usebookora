import type { ReactNode } from "react";
import { tv } from "tailwind-variants";

/** Estilos compartilhados pela lista, pelo skeleton e pelo vazio, para não haver salto ao carregar */
export const servicesList = tv({
  slots: {
    root: "overflow-hidden rounded-xl border border-border bg-surface shadow-xs",
    item: "border-t border-border first:border-t-0",
    row: "flex min-h-18 items-center gap-4 px-4 py-3",
    info: "flex min-w-0 flex-1 flex-col gap-1.5",
    name: "flex h-6 items-center font-medium",
    meta: "flex h-5 items-center gap-2 text-sm text-fg-muted",
    price: "flex h-6 items-center font-medium tabular",
  },
});

type ServicesSectionProps = {
  /** Mostra a instrução de escolher um serviço; sem serviços, ela não faz sentido */
  withHint?: boolean;
  children: ReactNode;
};

const ServicesSection = ({
  withHint = true,
  children,
}: ServicesSectionProps) => {
  return (
    <section aria-labelledby="services-heading" className="flex flex-col gap-3">
      <div className="flex flex-col gap-0.5">
        <h2
          id="services-heading"
          className="text-lg font-semibold tracking-tight"
        >
          Serviços
        </h2>
        {withHint && (
          <p className="text-sm text-fg-muted">
            Escolha um serviço para ver os horários de hoje e amanhã.
          </p>
        )}
      </div>

      {children}
    </section>
  );
};

export default ServicesSection;
