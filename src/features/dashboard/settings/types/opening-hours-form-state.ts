import type { OpeningHoursFormField } from "../constants/opening-hours-form-fields";

/** Valores como enviados no form, guardados pelo hook para repreencher após erro */
export type OpeningHoursFormValues = Record<OpeningHoursFormField, string>;

/** Retorno da action de salvar o horário de funcionamento */
export type OpeningHoursActionResult = {
  success?: boolean;
  error?: string;
  fieldErrors?: Partial<Record<OpeningHoursFormField, string[]>>;
};

/** Valores iniciais de um dia no form; horários em minutos desde 00:00, como texto (valor do select) */
export type OpeningHoursDayDefaults = {
  open: boolean;
  opensAt: string;
  closesAt: string;
};

/** Erros de um dia, já resolvidos pelo hook: um por select */
export type OpeningHoursDayErrors = { opensAt?: string; closesAt?: string };

/** Estado do form: o retorno da action + o que foi enviado */
export type OpeningHoursFormState = OpeningHoursActionResult & {
  values?: OpeningHoursFormValues;
};
