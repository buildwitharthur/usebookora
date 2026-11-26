import "server-only";

import { getCurrentEstablishmentOrThrow } from "@/shared/data-access/establishment/get-current-establishment-or-throw";
import { prisma } from "@/shared/lib/prisma";

/** Serviço pelo nome no estabelecimento do usuário logado (citext: ignora maiúsculas/minúsculas) */
export const getServiceByName = async (name: string) => {
  const establishment = await getCurrentEstablishmentOrThrow();

  return prisma.service.findUnique({
    where: {
      establishmentId_name: { establishmentId: establishment.id, name },
    },
    select: { id: true },
  });
};
