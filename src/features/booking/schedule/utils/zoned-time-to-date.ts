/** Diferença do fuso em relação ao UTC naquele instante, em ms (ex.: Brasília → -3h) */
const getTimeZoneOffset = (time: number, timeZone: string) => {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(time);

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value);

  const local = Date.UTC(
    get("year"),
    get("month") - 1,
    get("day"),
    get("hour"),
    get("minute"),
    get("second"),
  );

  return local - time;
};

/**
 * Instante de um horário do relógio no fuso, sem depender do fuso do servidor
 * (ex.: "2026-11-26", 540 (09:00), "America/Sao_Paulo" → 2026-11-26T12:00Z).
 * Minutos além de 23:59 passam para o dia seguinte (1440 → 00:00 do outro dia).
 */
export const zonedTimeToDate = (
  dateKey: string,
  minutes: number,
  timeZone: string,
) => {
  const [year, month, day] = dateKey.split("-").map(Number);

  // Primeiro como se o relógio fosse UTC; depois desconta a diferença do fuso
  const asUtc = Date.UTC(year, month - 1, day, 0, minutes);

  return new Date(asUtc - getTimeZoneOffset(asUtc, timeZone));
};
