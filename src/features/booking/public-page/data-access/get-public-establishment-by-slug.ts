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
    select: { name: true },
  }),
);
