import { DurationSlots } from "@/shared/components/ui/duration-slots";
import { formatCurrency } from "@/shared/utils/format-currency";
import { formatDuration } from "@/shared/utils/format-duration";
import type { ServiceListItem } from "../../data-access/get-services";
import ServiceRowActions from "./service-row-actions";
import ServicesTableHead, { servicesTable } from "./services-table-head";

type ServicesTableProps = {
  services: ServiceListItem[];
};

const styles = servicesTable();

const ServicesTable = ({ services }: ServicesTableProps) => {
  const count = services.length;

  return (
    <div className={styles.root()}>
      <table className={styles.table()}>
        <ServicesTableHead />

        <tbody>
          {services.map((service) => (
            <tr
              key={service.id}
              className={styles.row({
                class: "transition-colors hover:bg-canvas",
              })}
            >
              <td className={styles.cell({ class: "truncate font-medium" })}>
                {service.name}
              </td>
              <td className={styles.cell()}>
                <div className="flex items-center gap-3">
                  <DurationSlots
                    minutes={service.durationMinutes}
                    className="hidden sm:flex"
                  />
                  <span className="text-fg-secondary tabular">
                    {formatDuration(service.durationMinutes)}
                  </span>
                </div>
              </td>
              <td className={styles.cell({ class: "text-right tabular" })}>
                {formatCurrency(service.priceCents)}
              </td>
              <td className={styles.cell({ class: "pr-2 text-right" })}>
                <ServiceRowActions service={service} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className={styles.footer()}>
        {count} {count === 1 ? "serviço" : "serviços"}
      </p>
    </div>
  );
};

export default ServicesTable;
