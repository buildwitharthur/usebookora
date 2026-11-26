import { Suspense } from "react";
import { AGENDA_DAYS } from "../../constants/agenda-days";
import AgendaDayData from "../ui/agenda-day-data";
import AgendaTableSkeleton from "../ui/agenda-table-skeleton";

const  AgendaPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <header>
        <p className="text-pretty text-fg-secondary">
          Agendamentos de hoje e de amanhã do seu estabelecimento.
        </p>
      </header>

      {AGENDA_DAYS.map((day) => (
        <section
          key={day.key}
          aria-labelledby={`agenda-${day.key}-title`}
          className="flex flex-col gap-2"
        >
          <h2 id={`agenda-${day.key}-title`} className="text-md font-semibold">
            {day.title}
          </h2>

          <Suspense fallback={<AgendaTableSkeleton />}>
            <AgendaDayData day={day} />
          </Suspense>
        </section>
      ))}
    </div>
  );
};

export default AgendaPage;
