import { SLOT_MINUTES } from "@/shared/constants/slots";

/** Duração máxima de um serviço (8h) */
export const MAX_SERVICE_DURATION_MINUTES = 480;

/** Opções do select de duração: de 30 em 30 minutos até o máximo */
export const SERVICE_DURATION_OPTIONS = Array.from(
  { length: MAX_SERVICE_DURATION_MINUTES / SLOT_MINUTES },
  (_, index) => (index + 1) * SLOT_MINUTES,
);
