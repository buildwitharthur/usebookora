import type { SERVICE_FORM_FIELDS } from "../constants/service-form-fields";

/** Valores como digitados no form, devolvidos em caso de erro para repreencher */
export type ServiceFormValues = Record<
  (typeof SERVICE_FORM_FIELDS)[number],
  string
>;

/** Estado compartilhado pelas actions de criar e editar serviço */
export type ServiceFormState = {
  success?: boolean;
  error?: string;
  fieldErrors?: {
    name?: string[];
    durationMinutes?: string[];
    price?: string[];
  };
  values?: ServiceFormValues;
};
