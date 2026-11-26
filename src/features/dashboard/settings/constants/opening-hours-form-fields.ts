import { WEEKDAYS } from "./weekdays";

/** Campos do form de horário: por dia, se abre e os horários de abertura e fechamento */
export const OPENING_HOURS_FORM_FIELDS = WEEKDAYS.flatMap(
  ({ key }) => [`${key}Open`, `${key}OpensAt`, `${key}ClosesAt`] as const,
);

export type OpeningHoursFormField = (typeof OPENING_HOURS_FORM_FIELDS)[number];
