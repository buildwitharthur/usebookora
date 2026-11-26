import "server-only";

import { cache } from "react";

import { prisma } from "@/shared/lib/prisma";

/**
 * Serviço de um estabelecimento, para a escolha do horário.
 * Pública de propósito: não usa a sessão, qualquer visitante pode ler.
 * Os ids do estabelecimento e do dono servem às consultas no servidor:
 * não repasse o estabelecimento inteiro para componentes de client.
 */
export const getPublicService = cache(
  async (slug: string, serviceId: string) => {
    const service = await prisma.service.findUnique({
      where: { id: serviceId },
      select: {
        id: true,
        name: true,
        durationMinutes: true,
        priceCents: true,
        establishment: {
          select: {
            id: true,
            userId: true,
            slug: true,
            name: true,
            brandColor: true,
            timeZone: true,
          },
        },
      },
    });

    // O id sozinho acharia o serviço em qualquer slug: confere o dono
    return service?.establishment.slug === slug ? service : null;
  },
);

export type PublicService = NonNullable<
  Awaited<ReturnType<typeof getPublicService>>
>;
