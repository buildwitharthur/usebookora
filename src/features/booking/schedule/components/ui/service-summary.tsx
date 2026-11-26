import { DurationSlots } from "@/shared/components/ui/duration-slots";
import { formatCurrency } from "@/shared/utils/format-currency";
import { formatDuration } from "@/shared/utils/format-duration";
import type { PublicService } from "../../data-access/get-public-service";
import { scheduleShell } from "./schedule-shell";

type ServiceSummaryProps = {
  service: Pick<PublicService, "name" | "durationMinutes" | "priceCents">;
};

const styles = scheduleShell();

/** O serviço escolhido, no topo da página: é o título dela */
const ServiceSummary = ({ service }: ServiceSummaryProps) => {
  return (
    <header className={styles.summary()}>
      <div className={styles.summaryInfo()}>
        <h1 className={styles.summaryName()}>{service.name}</h1>
        <p className={styles.summaryMeta()}>
          <DurationSlots minutes={service.durationMinutes} />
          <span className="tabular">
            {formatDuration(service.durationMinutes)}
          </span>
        </p>
      </div>

      <p className={styles.summaryPrice()}>
        {formatCurrency(service.priceCents)}
      </p>
    </header>
  );
};

export default ServiceSummary;
