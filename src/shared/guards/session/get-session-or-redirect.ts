import "server-only";

import { redirect } from "next/navigation";

import { getSession } from "@/shared/data-access/session/get-session";

/** Pages e layouts: sem sessão, redireciona para o login */
export const getSessionOrRedirect = async () => {
  const session = await getSession();

  if (!session?.user) {
    redirect("/login");
  }

  return { ...session, user: session.user };
};
