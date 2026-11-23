"use server";

import { z } from "zod";

import { getEstablishmentByUserId } from "@/shared/data-access/establishment";
import { getSessionOrThrow } from "@/shared/guards/session";
import { prisma } from "@/shared/lib/prisma";
import { generateSlug } from "@/shared/utils/generate-slug";
import { createEstablishmentSchema } from "../schemas/create-establishment-schema";

export type CreateEstablishmentState = {
  success?: boolean;
  error?: string;
  fieldErrors?: {
    name?: string[];
  };
  name?: string;
};

export const createEstablishmentAction = async (
  _prevState: CreateEstablishmentState,
  formData: FormData,
): Promise<CreateEstablishmentState> => {
  const { user } = await getSessionOrThrow();

  // Um estabelecimento por usuário: quem já tem segue para o dashboard
  if (await getEstablishmentByUserId(user.id)) {
    return { success: true };
  }

  const rawName = formData.get("name");
  const name = typeof rawName === "string" ? rawName : "";

  const parsed = createEstablishmentSchema.safeParse({ name });

  if (!parsed.success) {
    return {
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
      name,
    };
  }

  const slug = generateSlug(parsed.data.name);

  const slugTaken = await prisma.establishment.findUnique({
    where: { slug },
    select: { id: true },
  });

  if (slugTaken) {
    return {
      fieldErrors: {
        name: ["Já existe um estabelecimento com esse nome. Tente outro."],
      },
      name,
    };
  }

  try {
    await prisma.establishment.create({
      data: { name: parsed.data.name, slug, userId: user.id },
    });
  } catch {
    return {
      error: "Não foi possível criar o estabelecimento. Tente novamente.",
      name,
    };
  }

  return { success: true };
};
