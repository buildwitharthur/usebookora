"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { getCurrentEstablishmentOrThrow } from "@/shared/data-access/establishment/get-current-establishment-or-throw";
import { prisma } from "@/shared/lib/prisma";
import { getFormValues } from "@/shared/utils/get-form-values";
import { SERVICE_FORM_FIELDS } from "../constants/service-form-fields";
import { updateServiceSchema } from "../schemas/update-service-schema";
import type { ServiceFormState } from "../types/service-form-state";

const notFoundError = "Serviço não encontrado. Atualize a página.";

export const updateServiceAction = async (
  _prevState: ServiceFormState,
  formData: FormData,
): Promise<ServiceFormState> => {
  const establishment = await getCurrentEstablishmentOrThrow();

  const values = getFormValues(formData, SERVICE_FORM_FIELDS);
  const { id: rawId } = getFormValues(formData, ["id"]);
  const parsed = updateServiceSchema.safeParse({ ...values, id: rawId });

  if (!parsed.success) {
    const { id: idErrors, ...fieldErrors } = z.flattenError(
      parsed.error,
    ).fieldErrors;

    return {
      error: idErrors ? notFoundError : undefined,
      fieldErrors,
      values,
    };
  }

  const { id, name, durationMinutes, price } = parsed.data;

  // Só encontra serviços do estabelecimento do usuário logado
  const service = await prisma.service.findUnique({
    where: { id, establishmentId: establishment.id },
    select: { id: true },
  });

  if (!service) {
    return { error: notFoundError, values };
  }

  const serviceWithName = await prisma.service.findUnique({
    where: {
      establishmentId_name: { establishmentId: establishment.id, name },
    },
    select: { id: true },
  });

  // O próprio serviço pode manter o nome
  if (serviceWithName && serviceWithName.id !== id) {
    return {
      fieldErrors: { name: ["Já existe um serviço com esse nome."] },
      values,
    };
  }

  try {
    await prisma.service.update({
      where: { id, establishmentId: establishment.id },
      data: { name, durationMinutes, priceCents: price },
    });
  } catch {
    return {
      error: "Não foi possível salvar o serviço. Tente novamente.",
      values,
    };
  }

  revalidatePath("/dashboard/services");

  return { success: true };
};
