import "server-only";

import { cache } from "react";

import { getSessionOrThrow } from "@/shared/guards/session/get-session-or-throw";
import { prisma } from "@/shared/lib/prisma";

/**
 * Estabelecimento do usuário logado, deduplicado por requisição.
 * O dono vem sempre da sessão, nunca de um argumento: não há como pedir
 * o estabelecimento de outro usuário.
 */
export const getCurrentEstablishment = cache(async () => {
  const { user } = await getSessionOrThrow();

  return prisma.establishment.findUnique({ where: { userId: user.id } });
});
