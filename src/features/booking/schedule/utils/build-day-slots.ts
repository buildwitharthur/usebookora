import { SLOT_MINUTES } from "@/shared/constants/slots";
import type { Dayjs } from "@/shared/lib/dayjs";
import { formatTime } from "@/shared/utils/format-time";
import { getZonedTime } from "./get-zoned-time";

type BuildDaySlotsParams = {
  /** Dia no fuso do estabelecimento, como "AAAA-MM-DD" */
  dateKey: string;
  /** Expediente do dia, em minutos desde 00:00 */
  opensAt: number;
  closesAt: number;
  durationMinutes: number;
  /** Agendamentos que podem ocupar o dia */
  bookings: { startsAt: Date; endsAt: Date }[];
  now: Dayjs;
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
    const startsAt = getZonedTime(dateKey, minutes, timeZone);
    const endsAt = startsAt.add(durationMinutes, "minute");

    const isFuture = startsAt.isAfter(now);
    const fitsBeforeClosing = minutes + durationMinutes <= closesAt;
    const isFree = !bookings.some(
      (booking) =>
        endsAt.isAfter(booking.startsAt) && startsAt.isBefore(booking.endsAt),
    );

    return {
      /** Valor do radio e chave do slot: o instante em ISO */
      value: startsAt.toISOString(),
      label: formatTime(startsAt, timeZone),
      endLabel: formatTime(endsAt, timeZone),
      available: isFuture && fitsBeforeClosing && isFree,
    };
  });
