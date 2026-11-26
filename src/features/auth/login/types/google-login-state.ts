/** Retorno da action de login com o Google */
export type GoogleLoginActionResult = {
  success?: boolean;
  /** URL de autorização do Google, para onde o hook navega */
  url?: string;
  error?: string;
};
