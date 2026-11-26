import "server-only";

import { getCurrentEstablishmentOrThrow } from "@/shared/data-access/establishment/get-current-establishment-or-throw";
import { prisma } from "@/shared/lib/prisma";

/** Serviço pelo id, só se for do estabelecimento do usuário logado */
export const getServiceById = async (id: string) => {
  const establishment = await getCurrentEstablishmentOrThrow();

  return prisma.service.findUnique({
    where: { id, establishmentId: establishment.id },
    select: { id: true },
  });
};
