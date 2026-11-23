import "server-only";

import { cache } from "react";

import { getSessionOrThrow } from "@/shared/guards/session";
import { prisma } from "@/shared/lib/prisma";
import { getEstablishmentByUserIdSchema } from "@/shared/schemas/get-establishment-by-user-id-schema";

/**
 * Estabelecimento do usuário, deduplicado por requisição.
 * Exige sessão e só devolve o estabelecimento do próprio usuário.
 * Recebe uma string (não objeto) porque o `cache()` compara argumentos por referência.
 */
export const getEstablishmentByUserId = cache(async (userId: string) => {
  const input = getEstablishmentByUserIdSchema.parse({ userId });
  const { user } = await getSessionOrThrow();

  if (user.id !== input.userId) {
    throw new Error("Forbidden");
  }

  return prisma.establishment.findUnique({ where: { userId: input.userId } });
});
