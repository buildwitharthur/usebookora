import type { MAGIC_LINK_LOGIN_FORM_FIELDS } from "../constants/magic-link-login-form-fields";

/** Valores como digitados no form, guardados pelo hook para repreencher após erro */
export type MagicLinkLoginFormValues = Record<
  (typeof MAGIC_LINK_LOGIN_FORM_FIELDS)[number],
  string
>;

/** Retorno da action de login por link de acesso */
export type MagicLinkLoginActionResult = {
  success?: boolean;
  error?: string;
  fieldErrors?: {
    email?: string[];
  };
};

/** Estado do form de login por link: o retorno da action + o que foi enviado */
export type MagicLinkLoginFormState = MagicLinkLoginActionResult & {
  values?: MagicLinkLoginFormValues;
};
