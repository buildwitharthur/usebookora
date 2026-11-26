"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { getCurrentEstablishmentOrThrow } from "@/shared/data-access/establishment/get-current-establishment-or-throw";
import { prisma } from "@/shared/lib/prisma";
import {
  type UpdateEstablishmentInput,
  type UpdateEstablishmentOutput,
  updateEstablishmentSchema,
} from "../schemas/update-establishment-schema";
import type { EstablishmentActionResult } from "../types/establishment-form-state";

/** O slug é único entre todos os estabelecimentos; o próprio pode mantê-lo */
const isSlugTakenByAnotherEstablishment = async (id: string, slug: string) => {
  const establishmentWithSlug = await prisma.establishment.findUnique({
    where: { slug },
    select: { id: true },
  });

  return !!establishmentWithSlug && establishmentWithSlug.id !== id;
};

const updateEstablishment = (
  id: string,
  {
    name,
    description,
    address,
    phone,
    instagram,
    slug,
    brandColor,
  }: UpdateEstablishmentOutput,
) =>
  prisma.establishment.update({
    where: { id },
    data: { name, description, address, phone, instagram, slug, brandColor },
  });

export const updateEstablishmentAction = async (
  input: UpdateEstablishmentInput,
): Promise<EstablishmentActionResult> => {
  const establishment = await getCurrentEstablishmentOrThrow();

  // O tipo do input não vale no servidor: qualquer cliente pode chamar a action
  const parsed = updateEstablishmentSchema.safeParse(input);

  if (!parsed.success) {
    return { fieldErrors: z.flattenError(parsed.error).fieldErrors };
  }

  if (
    await isSlugTakenByAnotherEstablishment(establishment.id, parsed.data.slug)
  ) {
    return {
      fieldErrors: { slug: ["Esse link já está em uso. Escolha outro."] },
    };
  }

  try {
    await updateEstablishment(establishment.id, parsed.data);
  } catch {
    return { error: "Não foi possível salvar as alterações. Tente novamente." };
  }

  // O slug aparece no shell do dashboard e os dados na página pública
  revalidatePath("/", "layout");

  return { success: true };
};
