import { SLOT_MINUTES } from "@/shared/constants/slots";
import { formatTime } from "@/shared/utils/format-time";
import { zonedTimeToDate } from "./zoned-time-to-date";

type BuildDaySlotsParams = {
  /** Dia no fuso do estabelecimento, como "AAAA-MM-DD" */
  dateKey: string;
  /** Expediente do dia, em minutos desde 00:00 */
  opensAt: number;
  closesAt: number;
  durationMinutes: number;
  /** Agendamentos que podem ocupar o dia */
  bookings: { startsAt: Date; endsAt: Date }[];
  now: Date;
  timeZone: string;
};

/**
 * Todos os horários do expediente, de 30 em 30 minutos. Um horário está
 * disponível se ainda não passou, se o serviço cabe inteiro antes do
 * fechamento e se nenhum dos slots que ele ocupa já está marcado.
 */
export const buildDaySlots = ({
  dateKey,
  opensAt,
  closesAt,
  durationMinutes,
  bookings,
  now,
  timeZone,
}: BuildDaySlotsParams) =>
  Array.from({ length: (closesAt - opensAt) / SLOT_MINUTES }, (_, index) => {
    const minutes = opensAt + index * SLOT_MINUTES;
    const startsAt = zonedTimeToDate(dateKey, minutes, timeZone);
    const endsAt = new Date(startsAt.getTime() + durationMinutes * 60_000);

    const isFuture = startsAt > now;
    const fitsBeforeClosing = minutes + durationMinutes <= closesAt;
    const isFree = !bookings.some(
      (booking) => booking.startsAt < endsAt && booking.endsAt > startsAt,
    );

    return {
      /** Valor do radio e chave do slot: o instante em ISO */
      value: startsAt.toISOString(),
      label: formatTime(startsAt, timeZone),
      endLabel: formatTime(endsAt, timeZone),
      available: isFuture && fitsBeforeClosing && isFree,
    };
  });
