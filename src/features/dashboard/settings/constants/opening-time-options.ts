import { SLOT_MINUTES } from "@/shared/constants/slots";

const DAY_MINUTES = 24 * 60;

/** Abertura, em minutos desde 00:00: de 00:00 a 23:30, no tamanho do slot */
export const OPENS_AT_OPTIONS = Array.from(
  { length: DAY_MINUTES / SLOT_MINUTES },
  (_, index) => index * SLOT_MINUTES,
);

/** Fechamento: de 00:30 a 24:00, para o último slot poder começar às 23:30 */
export const CLOSES_AT_OPTIONS = OPENS_AT_OPTIONS.map(
  (minutes) => minutes + SLOT_MINUTES,
);
