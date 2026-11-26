import "server-only";

import { cache } from "react";

import { getCurrentEstablishmentOrThrow } from "@/shared/data-access/establishment/get-current-establishment-or-throw";
import { prisma } from "@/shared/lib/prisma";

/**
 * Total de agendamentos do estabelecimento do usuário logado.
 * Conta todos, de qualquer data: o limite do Basic é no total da conta e não reinicia por mês.
 */
export const getBookingsCount = cache(async () => {
  const establishment = await getCurrentEstablishmentOrThrow();

  return prisma.booking.count({
    where: { establishmentId: establishment.id },
  });
});
