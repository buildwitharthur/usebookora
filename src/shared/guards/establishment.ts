import "server-only";

import { redirect } from "next/navigation";

import { getEstablishmentByUserId } from "@/shared/data-access/establishment";
import { getSessionOrRedirect } from "@/shared/guards/session";

/** Pages e layouts do dashboard: sem estabelecimento, redireciona para o onboarding */
export const getEstablishmentOrRedirect = async () => {
  const { user } = await getSessionOrRedirect();
  const establishment = await getEstablishmentByUserId(user.id);

  if (!establishment) {
    redirect("/onboarding");
  }

  return establishment;
};

/** Onboarding: quem já tem estabelecimento vai para o dashboard */
export const redirectIfHasEstablishment = async () => {
  const { user } = await getSessionOrRedirect();
  const establishment = await getEstablishmentByUserId(user.id);

  if (establishment) {
    redirect("/dashboard");
  }
};
