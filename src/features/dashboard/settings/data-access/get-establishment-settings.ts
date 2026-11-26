import "server-only";

import { cache } from "react";

import { getCurrentEstablishmentOrThrow } from "@/shared/data-access/establishment/get-current-establishment-or-throw";
import { prisma } from "@/shared/lib/prisma";

/** Dados editáveis do estabelecimento do usuário logado */
export const getEstablishmentSettings = cache(async () => {
  const establishment = await getCurrentEstablishmentOrThrow();

  return prisma.establishment.findUniqueOrThrow({
    where: { id: establishment.id },
    select: {
      name: true,
      description: true,
      address: true,
      phone: true,
      instagram: true,
      slug: true,
      brandColor: true,
      timeZone: true,
    },
  });
});

export type EstablishmentSettings = Awaited<
  ReturnType<typeof getEstablishmentSettings>
>;
