import "server-only";

import { cache } from "react";

import { getCurrentEstablishmentOrThrow } from "@/shared/data-access/establishment/get-current-establishment-or-throw";
import { prisma } from "@/shared/lib/prisma";

/** Horário de funcionamento do estabelecimento do usuário logado; dia ausente está fechado */
export const getOpeningHours = cache(async () => {
  const establishment = await getCurrentEstablishmentOrThrow();

  return prisma.openingHours.findMany({
    where: { establishmentId: establishment.id },
    select: { weekday: true, opensAt: true, closesAt: true },
  });
});

export type OpeningHoursItem = Awaited<
  ReturnType<typeof getOpeningHours>
>[number];
