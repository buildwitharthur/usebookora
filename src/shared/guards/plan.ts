import "server-only";

import { redirect } from "next/navigation";

/** Sem plano ativo, só a página de plano do dashboard fica acessível */
export const redirectIfNoActivePlan = async () => {
  // TODO: quando o model de assinatura existir, pegar o usuário com
  // `getSessionOrRedirect()` e consultar o plano por `user.id`
  const hasActivePlan = true;

  if (!hasActivePlan) {
    redirect("/dashboard/plan");
  }
};
