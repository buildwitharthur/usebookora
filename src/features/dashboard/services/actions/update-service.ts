"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { getCurrentEstablishmentOrThrow } from "@/shared/data-access/establishment/get-current-establishment-or-throw";
import { prisma } from "@/shared/lib/prisma";
import { getServiceById } from "../data-access/get-service-by-id";
import { getServiceByName } from "../data-access/get-service-by-name";
import {
  type UpdateServiceInput,
  type UpdateServiceOutput,
  updateServiceSchema,
} from "../schemas/update-service-schema";
import type { ServiceActionResult } from "../types/service-form-state";

const notFoundError = "Serviço não encontrado. Atualize a página.";

/** O próprio serviço pode manter o nome */
const isNameTakenByAnotherService = async (id: string, name: string) => {
  const serviceWithName = await getServiceByName(name);

  return !!serviceWithName && serviceWithName.id !== id;
};

const updateService = (
  establishmentId: string,
  { id, name, durationMinutes, price }: UpdateServiceOutput,
) =>
  prisma.service.update({
    where: { id, establishmentId },
    data: { name, durationMinutes, priceCents: price },
  });

export const updateServiceAction = async (
  input: UpdateServiceInput,
): Promise<ServiceActionResult> => {
  const establishment = await getCurrentEstablishmentOrThrow();

  // O tipo do input não vale no servidor: qualquer cliente pode chamar a action
  const parsed = updateServiceSchema.safeParse(input);

  if (!parsed.success) {
    const { id: idErrors, ...fieldErrors } = z.flattenError(
      parsed.error,
    ).fieldErrors;

    return {
      error: idErrors ? notFoundError : undefined,
      fieldErrors,
    };
  }

  const { id, name } = parsed.data;

  const service = await getServiceById(id);

  if (!service) {
    return { error: notFoundError };
  }

  if (await isNameTakenByAnotherService(id, name)) {
    return { fieldErrors: { name: ["Já existe um serviço com esse nome."] } };
  }

  try {
    await updateService(establishment.id, parsed.data);
  } catch {
    return { error: "Não foi possível salvar o serviço. Tente novamente." };
  }

  revalidatePath("/dashboard/services");

  return { success: true };
};
