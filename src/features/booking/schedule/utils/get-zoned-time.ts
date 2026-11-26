import { dayjs } from "@/shared/lib/dayjs";

/**
 * Instante de um horário do relógio no fuso, sem depender do fuso do servidor
 * (ex.: "2026-11-26", 540 (09:00), "America/Sao_Paulo" → 2026-11-26T12:00Z).
 * Minutos além de 23:59 passam para o dia seguinte (1440 → 00:00 do outro dia).
 */
export const getZonedTime = (
  dateKey: string,
  minutes: number,
  timeZone: string,
) => {
  // Em UTC a soma é só de relógio; o fuso entra depois, ao ler esse horário nele
  const wallClock = dayjs
    .utc(dateKey)
    .add(minutes, "minute")
    .format("YYYY-MM-DDTHH:mm");

  return dayjs.tz(wallClock, timeZone);
};
