import "server-only";

import { redirect } from "next/navigation";

import { getSession } from "@/shared/data-access/session";

/** Pages e layouts: sem sessão, redireciona para o login */
export const getSessionOrRedirect = async () => {
  const session = await getSession();

  if (!session?.user) {
    redirect("/login");
  }

  return { ...session, user: session.user };
};

/** Server actions: sem sessão, lança erro (não redireciona no meio de uma mutação) */
export const getSessionOrThrow = async () => {
  const session = await getSession();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  return { ...session, user: session.user };
};
