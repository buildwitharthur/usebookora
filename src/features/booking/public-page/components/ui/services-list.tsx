import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { DurationSlots } from "@/shared/components/ui/duration-slots";
import { formatCurrency } from "@/shared/utils/format-currency";
import { formatDuration } from "@/shared/utils/format-duration";
import type { PublicServiceListItem } from "../../data-access/get-public-establishment-by-slug";
import { servicesList } from "./services-section";

type ServicesListProps = {
  slug: string;
  services: PublicServiceListItem[];
};

const styles = servicesList();

/** Cada serviço leva à escolha do horário dele */
const ServicesList = ({ slug, services }: ServicesListProps) => {
  return (
    <ul className={styles.root()}>
      {services.map((service) => (
        <li key={service.id} className={styles.item()}>
          {/* Outline por dentro: o overflow-hidden da lista cortaria o anel de foco */}
          <Link
            href={`/${slug}/${service.id}`}
            className={styles.row({
              class:
                "group transition-colors hover:bg-brand-subtle focus-visible:bg-brand-subtle focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-focus",
            })}
          >
            <div className={styles.info()}>
              <span className={styles.name({ class: "truncate" })}>
                {service.name}
              </span>
              <span className={styles.meta()}>
                <DurationSlots minutes={service.durationMinutes} />
                <span className="tabular">
                  {formatDuration(service.durationMinutes)}
                </span>
              </span>
            </div>

            <span className={styles.price()}>
              {formatCurrency(service.priceCents)}
            </span>

            <ChevronRightIcon
              aria-hidden="true"
              className="size-icon-sm shrink-0 text-fg-muted transition-transform group-hover:translate-x-0.5 group-hover:text-brand"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ServicesList;
