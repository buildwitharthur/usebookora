"use server";

import { z } from "zod";

import { DEFAULT_OPENING_HOURS } from "@/shared/constants/default-opening-hours";
import { getCurrentEstablishment } from "@/shared/data-access/establishment/get-current-establishment";
import { getSessionOrThrow } from "@/shared/guards/session/get-session-or-throw";
import { prisma } from "@/shared/lib/prisma";
import { generateSlug } from "@/shared/utils/generate-slug";
import {
  type CreateEstablishmentInput,
  type CreateEstablishmentOutput,
  createEstablishmentSchema,
} from "../schemas/create-establishment-schema";
import type { EstablishmentActionResult } from "../types/establishment-form-state";

// O slug é único entre todos os estabelecimentos, não só os do usuário
const getEstablishmentBySlug = (slug: string) =>
  prisma.establishment.findUnique({ where: { slug }, select: { id: true } });

// Já nasce em horário comercial: o dono só ajusta nas Configurações
const createEstablishment = (
  userId: string,
  slug: string,
  { name }: CreateEstablishmentOutput,
) =>
  prisma.establishment.create({
    data: {
      name,
      slug,
      userId,
      openingHours: { createMany: { data: DEFAULT_OPENING_HOURS } },
    },
  });

export const createEstablishmentAction = async (
  input: CreateEstablishmentInput,
): Promise<EstablishmentActionResult> => {
  // O dono vem da sessão, nunca do input
  const { user } = await getSessionOrThrow();

  // Um estabelecimento por usuário: quem já tem segue para o dashboard
  if (await getCurrentEstablishment()) {
    return { success: true };
  }

  // O tipo do input não vale no servidor: qualquer cliente pode chamar a action
  const parsed = createEstablishmentSchema.safeParse(input);

  if (!parsed.success) {
    return { fieldErrors: z.flattenError(parsed.error).fieldErrors };
  }

  const slug = generateSlug(parsed.data.name);

  if (await getEstablishmentBySlug(slug)) {
    return {
      fieldErrors: {
        name: ["Já existe um estabelecimento com esse nome. Tente outro."],
      },
    };
  }

  try {
    await createEstablishment(user.id, slug, parsed.data);
  } catch {
    return {
      error: "Não foi possível criar o estabelecimento. Tente novamente.",
    };
  }

  return { success: true };
};
