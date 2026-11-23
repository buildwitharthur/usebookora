"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { getCurrentEstablishmentOrThrow } from "@/shared/data-access/establishment/get-current-establishment-or-throw";
import { prisma } from "@/shared/lib/prisma";
import { getFormValues } from "@/shared/utils/get-form-values";
import { SERVICE_FORM_FIELDS } from "../constants/service-form-fields";
import { createServiceSchema } from "../schemas/create-service-schema";
import type { ServiceFormState } from "../types/service-form-state";

export const createServiceAction = async (
  _prevState: ServiceFormState,
  formData: FormData,
): Promise<ServiceFormState> => {
  // O estabelecimento vem da sessão, nunca do form
  const establishment = await getCurrentEstablishmentOrThrow();

  const values = getFormValues(formData, SERVICE_FORM_FIELDS);
  const parsed = createServiceSchema.safeParse(values);

  if (!parsed.success) {
    return {
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
      values,
    };
  }

  const { name, durationMinutes, price } = parsed.data;

  // citext: a comparação ignora maiúsculas/minúsculas
  const nameTaken = await prisma.service.findUnique({
    where: {
      establishmentId_name: { establishmentId: establishment.id, name },
    },
    select: { id: true },
  });

  if (nameTaken) {
    return {
      fieldErrors: { name: ["Já existe um serviço com esse nome."] },
      values,
    };
  }

  try {
    await prisma.service.create({
      data: {
        establishmentId: establishment.id,
        name,
        durationMinutes,
        priceCents: price,
      },
    });
  } catch {
    return {
      error: "Não foi possível criar o serviço. Tente novamente.",
      values,
    };
  }

  revalidatePath("/dashboard/services");

  return { success: true };
};
