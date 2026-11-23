import "server-only";

import { cache } from "react";

import { getCurrentEstablishmentOrThrow } from "@/shared/data-access/establishment/get-current-establishment-or-throw";
import { prisma } from "@/shared/lib/prisma";

/** Serviços do estabelecimento do usuário logado, ordenados por nome */
export const getServices = cache(async () => {
  const establishment = await getCurrentEstablishmentOrThrow();

  return prisma.service.findMany({
    where: { establishmentId: establishment.id },
    select: { id: true, name: true, durationMinutes: true, priceCents: true },
    orderBy: { name: "asc" },
  });
});

export type ServiceListItem = Awaited<ReturnType<typeof getServices>>[number];
