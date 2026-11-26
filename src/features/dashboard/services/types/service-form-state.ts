import type { SERVICE_FORM_FIELDS } from "../constants/service-form-fields";

/** Valores como digitados no form, guardados pelo hook para repreencher após erro */
export type ServiceFormValues = Record<
  (typeof SERVICE_FORM_FIELDS)[number],
  string
>;

/** Retorno das actions de criar e editar serviço */
export type ServiceActionResult = {
  success?: boolean;
  error?: string;
  fieldErrors?: {
    name?: string[];
    durationMinutes?: string[];
    price?: string[];
  };
};

/** Estado do form de serviço: o retorno da action + o que foi enviado */
export type ServiceFormState = ServiceActionResult & {
  values?: ServiceFormValues;
};
