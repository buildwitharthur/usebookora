"use server";

import { revalidatePath } from "next/cache";

import { getCurrentEstablishmentOrThrow } from "@/shared/data-access/establishment/get-current-establishment-or-throw";
import { prisma } from "@/shared/lib/prisma";
import { getFormValues } from "@/shared/utils/get-form-values";
import { deleteServiceSchema } from "../schemas/delete-service-schema";

export type DeleteServiceState = {
  success?: boolean;
  error?: string;
};

const notFoundError = "Serviço não encontrado. Atualize a página.";

export const deleteServiceAction = async (
  _prevState: DeleteServiceState,
  formData: FormData,
): Promise<DeleteServiceState> => {
  const establishment = await getCurrentEstablishmentOrThrow();

  const parsed = deleteServiceSchema.safeParse(getFormValues(formData, ["id"]));

  if (!parsed.success) {
    return { error: notFoundError };
  }

  const { id } = parsed.data;

  // Só encontra serviços do estabelecimento do usuário logado
  const service = await prisma.service.findUnique({
    where: { id, establishmentId: establishment.id },
    select: { id: true },
  });

  if (!service) {
    return { error: notFoundError };
  }

  try {
    // Os agendamentos do serviço saem junto (onDelete: Cascade)
    await prisma.service.delete({
      where: { id, establishmentId: establishment.id },
    });
  } catch {
    return { error: "Não foi possível excluir o serviço. Tente novamente." };
  }

  revalidatePath("/dashboard/services");

  return { success: true };
};
