import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceAvailability } from "../../data-access/get-service-availability";
import BookingForm from "./booking-form";
import ScheduleShell, { scheduleShell } from "./schedule-shell";
import ScheduleUnavailable from "./schedule-unavailable";
import ServiceSummary from "./service-summary";

type ScheduleDataProps = {
  params: PageProps<"/[slug]/[serviceId]">["params"];
};

const styles = scheduleShell();

/** Busca o serviço e os horários no servidor; fica dentro do Suspense da página */
const ScheduleData = async ({ params }: ScheduleDataProps) => {
  const { slug, serviceId } = await params;
  const availability = await getServiceAvailability(slug, serviceId);

  if (!availability) {
    notFound();
  }

  const { service, acceptingBookings, days } = availability;

  return (
    <ScheduleShell brandColor={service.establishment.brandColor}>
      <div className={styles.backLink()}>
        <Link
          href={`/${slug}`}
          className="inline-flex items-center gap-1.5 rounded-sm text-sm text-fg-secondary transition-colors hover:text-fg"
        >
          <ArrowLeftIcon aria-hidden="true" className="size-icon-sm" />
          {service.establishment.name}
        </Link>
      </div>

      <ServiceSummary service={service} />

      {/* Só o que a tela usa vai para o client: nada de ids internos do estabelecimento */}
      {acceptingBookings ? (
        <BookingForm
          slug={slug}
          serviceId={service.id}
          serviceName={service.name}
          durationMinutes={service.durationMinutes}
          days={days}
        />
      ) : (
        <ScheduleUnavailable />
      )}
    </ScheduleShell>
  );
};

export default ScheduleData;
