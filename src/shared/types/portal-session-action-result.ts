/** Retorno da action que abre o portal de assinatura do Stripe */
export type PortalSessionActionResult = {
  success?: boolean;
  error?: string;
  /** Página do portal no Stripe, para o client navegar (URL externa) */
  url?: string;
};
