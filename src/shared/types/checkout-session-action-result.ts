/** Retorno da action que cria o checkout do Pro no Stripe */
export type CheckoutSessionActionResult = {
  success?: boolean;
  error?: string;
  /** Página do checkout no Stripe, para o client navegar (URL externa) */
  url?: string;
};
