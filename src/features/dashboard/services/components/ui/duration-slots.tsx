import { SLOT_MINUTES } from "@/shared/constants/slots";
import { cn } from "@/shared/utils/cn";

type DurationSlotsProps = {
  minutes: number;
  className?: string;
};

/** Um bloco por slot de 30 minutos que o serviço ocupa na agenda (decorativo) */
const DurationSlots = ({ minutes, className }: DurationSlotsProps) => {
  const slots = Math.ceil(minutes / SLOT_MINUTES);

  return (
    <span aria-hidden="true" className={cn("flex gap-0.5", className)}>
      {Array.from({ length: slots }, (_, index) => (
        <span key={index} className="h-3 w-1.5 rounded-[2px] bg-brand" />
      ))}
    </span>
  );
};

export default DurationSlots;
