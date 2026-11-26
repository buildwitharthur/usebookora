import type { ComponentProps } from "react";
import { SLOT_MINUTES } from "@/shared/constants/slots";
import { cn } from "@/shared/utils/cn";

type DurationSlotsProps = ComponentProps<"span"> & {
  minutes: number;
};

/**
 * Um bloco por slot de 30 minutos que o serviço ocupa na agenda (decorativo).
 * Usa a cor da marca: na página pública, acompanha a cor do estabelecimento.
 */
export const DurationSlots = ({
  minutes,
  className,
  ...props
}: DurationSlotsProps) => {
  const slots = Math.ceil(minutes / SLOT_MINUTES);

  return (
    <span
      data-slot="duration-slots"
      aria-hidden="true"
      className={cn("flex gap-0.5", className)}
      {...props}
    >
      {Array.from({ length: slots }, (_, index) => (
        <span key={index} className="h-3 w-1.5 rounded-sm bg-brand" />
      ))}
    </span>
  );
};
