import "server-only";

import { redirect } from "next/navigation";

import { getCurrentEstablishment } from "@/shared/data-access/establishment/get-current-establishment";
import { getSessionOrRedirect } from "@/shared/guards/session/get-session-or-redirect";

/** Pages e layouts do dashboard: sem estabelecimento, redireciona para o onboarding */
export const getEstablishmentOrRedirect = async () => {
  await getSessionOrRedirect();
  const establishment = await getCurrentEstablishment();

  if (!establishment) {
    redirect("/onboarding");
  }

  return establishment;
};
