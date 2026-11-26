import type { ESTABLISHMENT_FORM_FIELDS } from "../constants/establishment-form-fields";

/** Valores como digitados no form, guardados pelo hook para repreencher após erro */
export type EstablishmentFormValues = Record<
  (typeof ESTABLISHMENT_FORM_FIELDS)[number],
  string
>;

/** Retorno da action de criar o estabelecimento */
export type EstablishmentActionResult = {
  success?: boolean;
  error?: string;
  fieldErrors?: {
    name?: string[];
  };
};

/** Estado do form do estabelecimento: o retorno da action + o que foi enviado */
export type EstablishmentFormState = EstablishmentActionResult & {
  values?: EstablishmentFormValues;
};
