import type { BOOKING_FORM_FIELDS } from "../constants/booking-form-fields";

/** Valores como digitados no form, guardados pelo hook para repreencher após erro */
export type BookingFormValues = Record<
  (typeof BOOKING_FORM_FIELDS)[number],
  string
>;

/** Resumo do agendamento confirmado, mostrado no lugar do form */
export type BookingSummary = {
  clientName: string;
  serviceName: string;
  /** Ex.: "Hoje, quinta-feira, 26 de novembro" */
  dateLabel: string;
  /** Ex.: "15:30 – 17:00" */
  timeLabel: string;
};

/** Retorno da action de agendar */
export type BookingActionResult = {
  success?: boolean;
  summary?: BookingSummary;
  error?: string;
  fieldErrors?: {
    startsAt?: string[];
    clientName?: string[];
    clientPhone?: string[];
    clientEmail?: string[];
  };
};

/** Estado do form: o retorno da action + o que foi enviado */
export type BookingFormState = BookingActionResult & {
  values?: BookingFormValues;
};
