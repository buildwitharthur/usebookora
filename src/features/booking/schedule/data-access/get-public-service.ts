import "server-only";

import { cache } from "react";

import { prisma } from "@/shared/lib/prisma";

/**
 * Serviço de um estabelecimento, para a escolha do horário.
 * Pública de propósito: não usa a sessão, qualquer visitante pode ler.
 * Selecione só o que pode aparecer para o cliente final.
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
        establishment: { select: { slug: true, name: true } },
      },
    });

    // O id sozinho acharia o serviço em qualquer slug: confere o dono
    return service?.establishment.slug === slug ? service : null;
  },
);

export type PublicService = NonNullable<
  Awaited<ReturnType<typeof getPublicService>>
>;
