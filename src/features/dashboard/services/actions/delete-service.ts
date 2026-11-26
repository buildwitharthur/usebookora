"use server";

import { revalidatePath } from "next/cache";

import { getCurrentEstablishmentOrThrow } from "@/shared/data-access/establishment/get-current-establishment-or-throw";
import { prisma } from "@/shared/lib/prisma";
import { getServiceById } from "../data-access/get-service-by-id";
import {
  type DeleteServiceInput,
  deleteServiceSchema,
} from "../schemas/delete-service-schema";
import type { DeleteServiceActionResult } from "../types/delete-service-state";

const notFoundError = "Serviço não encontrado. Atualize a página.";

// Os agendamentos do serviço saem junto (onDelete: Cascade)
const deleteService = (establishmentId: string, id: string) =>
  prisma.service.delete({ where: { id, establishmentId } });

export const deleteServiceAction = async (
  input: DeleteServiceInput,
): Promise<DeleteServiceActionResult> => {
  const establishment = await getCurrentEstablishmentOrThrow();

  // O tipo do input não vale no servidor: qualquer cliente pode chamar a action
  const parsed = deleteServiceSchema.safeParse(input);

  if (!parsed.success) {
    return { error: notFoundError };
  }

  const { id } = parsed.data;

  const service = await getServiceById(id);

  if (!service) {
    return { error: notFoundError };
  }

  try {
    await deleteService(establishment.id, id);
  } catch {
    return { error: "Não foi possível excluir o serviço. Tente novamente." };
  }

  revalidatePath("/dashboard/services");

  return { success: true };
};
