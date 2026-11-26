/**
 * Dias da semana na ordem das Configurações (segunda primeiro).
 * `weekday` segue o `day()` do dayjs: 0 = domingo ... 6 = sábado.
 */
export const WEEKDAYS = [
  { key: "monday", weekday: 1, label: "Segunda" },
  { key: "tuesday", weekday: 2, label: "Terça" },
  { key: "wednesday", weekday: 3, label: "Quarta" },
  { key: "thursday", weekday: 4, label: "Quinta" },
  { key: "friday", weekday: 5, label: "Sexta" },
  { key: "saturday", weekday: 6, label: "Sábado" },
  { key: "sunday", weekday: 0, label: "Domingo" },
] as const;

export type Weekday = (typeof WEEKDAYS)[number];
export type WeekdayKey = Weekday["key"];
