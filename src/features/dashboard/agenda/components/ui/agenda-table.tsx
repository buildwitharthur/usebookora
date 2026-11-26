import { cn } from "@/shared/utils/cn";
import { formatPhone } from "@/shared/utils/format-phone";
import type { AgendaBooking } from "../../data-access/get-agenda";
import { formatTime } from "../../utils/format-time";
import AgendaTableHead, { agendaTable } from "./agenda-table-head";

type AgendaTableProps = {
  bookings: AgendaBooking[];
  /** Fuso do estabelecimento, para mostrar os horários como o dono vê o relógio */
  timeZone: string;
};

const styles = agendaTable();

const AgendaTable = ({ bookings, timeZone }: AgendaTableProps) => {
  const count = bookings.length;

  return (
    <div className={styles.root()}>
      <table className={styles.table()}>
        <AgendaTableHead />

        <tbody>
          {bookings.map((booking) => {
            const phone = formatPhone(booking.clientPhone);
            // Os que já terminaram ficam esmaecidos: o dia segue visível, mas o foco é o que vem
            const secondary = !booking.hasEnded && "text-fg-secondary";

            return (
              <tr
                key={booking.id}
                className={styles.row({
                  class: cn(
                    "transition-colors hover:bg-canvas",
                    booking.hasEnded && "text-fg-muted",
                  ),
                })}
              >
                <td className={styles.cell({ class: "tabular" })}>
                  {formatTime(booking.startsAt, timeZone)}–
                  {formatTime(booking.endsAt, timeZone)}
                  {booking.hasEnded && (
                    <span className="sr-only"> (encerrado)</span>
                  )}
                </td>
                <td className={styles.cell({ class: "py-1.5" })}>
                  <span className="block truncate font-medium">
                    {booking.clientName}
                  </span>
                  <span
                    className={cn(
                      "block truncate text-xs tabular sm:hidden",
                      secondary,
                    )}
                  >
                    {phone}
                  </span>
                </td>
                <td
                  className={styles.cell({
                    class: cn("hidden tabular sm:table-cell", secondary),
                  })}
                >
                  {phone}
                </td>
                <td
                  className={styles.cell({ class: cn("truncate", secondary) })}
                >
                  {booking.service.name}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <p className={styles.footer()}>
        {count} {count === 1 ? "agendamento" : "agendamentos"}
      </p>
    </div>
  );
};

export default AgendaTable;
