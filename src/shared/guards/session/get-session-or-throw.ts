import "server-only";

import { getSession } from "@/shared/data-access/session/get-session";

/** Server actions: sem sessão, lança erro (não redireciona no meio de uma mutação) */
export const getSessionOrThrow = async () => {
  const session = await getSession();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  return { ...session, user: session.user };
};
