import "server-only";

import { redirect } from "next/navigation";

import { getCurrentEstablishment } from "@/shared/data-access/establishment/get-current-establishment";
import { getSessionOrRedirect } from "@/shared/guards/session/get-session-or-redirect";

/** Onboarding: quem já tem estabelecimento vai para o dashboard */
export const redirectIfHasEstablishment = async () => {
  await getSessionOrRedirect();
  const establishment = await getCurrentEstablishment();

  if (establishment) {
    redirect("/dashboard");
  }
};
