import "server-only";

import { cache } from "react";

import { prisma } from "@/shared/lib/prisma";

/**
 * Estabelecimento pelo slug, para a página pública.
 * Pública de propósito: não usa a sessão, qualquer visitante pode ler.
 * Selecione só o que pode aparecer para o cliente final.
 */
export const getPublicEstablishmentBySlug = cache(async (slug: string) =>
  prisma.establishment.findUnique({
    where: { slug },
    select: {
      name: true,
      description: true,
      address: true,
      phone: true,
      instagram: true,
      brandColor: true,
      services: {
        select: {
          id: true,
          name: true,
          durationMinutes: true,
          priceCents: true,
        },
        orderBy: { name: "asc" },
      },
    },
  }),
);

export type PublicEstablishment = NonNullable<
  Awaited<ReturnType<typeof getPublicEstablishmentBySlug>>
>;

export type PublicServiceListItem = PublicEstablishment["services"][number];
