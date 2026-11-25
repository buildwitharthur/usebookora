import { Progress } from "@/shared/components/ui/progress";
import type { Plan } from "@/shared/constants/plans";

type PlanUsageProps = {
  plan: Plan;
  bookingsCount: number;
};

const PlanUsage = ({ plan, bookingsCount }: PlanUsageProps) => {
  const limit = plan.limits.bookings;

  return (
    <div className="rounded-md px-2.5 py-2">
      <div className="flex items-center justify-between gap-2 text-xs">
        <span className="font-medium text-sidebar-fg-active">
          Plano {plan.name}
        </span>
        <span className="tabular">
          {limit === null ? "Ilimitado" : `${bookingsCount}/${limit}`}
        </span>
      </div>

      {limit !== null && (
        <Progress
          value={bookingsCount}
          max={limit}
          aria-label="Agendamentos usados do plano"
          className="mt-2 bg-sidebar-item-active"
        />
      )}
    </div>
  );
};

export default PlanUsage;
