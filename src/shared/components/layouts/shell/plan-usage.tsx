import { Progress } from "@/shared/components/ui/progress";
import type { Plan } from "@/shared/constants/plans";

type PlanUsageProps = {
  plan: Plan;
  monthlyBookings: number;
};

const PlanUsage = ({ plan, monthlyBookings }: PlanUsageProps) => {
  const limit = plan.limits.monthlyBookings;

  return (
    <div className="rounded-md px-2.5 py-2">
      <div className="flex items-center justify-between gap-2 text-xs">
        <span className="font-medium text-sidebar-fg-active">
          Plano {plan.name}
        </span>
        <span className="tabular">
          {limit === null ? "Ilimitado" : `${monthlyBookings}/${limit}`}
        </span>
      </div>

      {limit !== null && (
        <Progress
          value={monthlyBookings}
          max={limit}
          aria-label="Agendamentos usados no mês"
          className="mt-2 bg-sidebar-item-active"
        />
      )}
    </div>
  );
};

export default PlanUsage;
