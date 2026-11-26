import type { AgendaDay } from "../../constants/agenda-days";
import { getAgenda } from "../../data-access/get-agenda";
import AgendaEmpty from "./agenda-empty";
import AgendaTable from "./agenda-table";

type AgendaDayDataProps = {
  day: AgendaDay;
};

/**
 * Busca os agendamentos do dia no servidor; fica dentro do Suspense da página.
 * Os dois dias saem da mesma consulta (`cache`), então ela roda uma vez só.
 */
const AgendaDayData = async ({ day }: AgendaDayDataProps) => {
  const agenda = await getAgenda();
  const bookings = agenda[day.key];

  if (bookings.length === 0) {
    return <AgendaEmpty title={day.emptyTitle} />;
  }

  return <AgendaTable bookings={bookings} timeZone={agenda.timeZone} />;
};

export default AgendaDayData;
