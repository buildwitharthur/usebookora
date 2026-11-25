"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import type { Plan } from "@/shared/constants/plans";
import { getCurrentEstablishmentOrThrow } from "@/shared/data-access/establishment/get-current-establishment-or-throw";
import { getCurrentPlan } from "@/shared/data-access/subscription/get-current-plan";
import { prisma } from "@/shared/lib/prisma";
import { getFormValues } from "@/shared/utils/get-form-values";
import { SERVICE_FORM_FIELDS } from "../constants/service-form-fields";
import { createServiceSchema } from "../schemas/create-service-schema";
import type { ServiceFormState } from "../types/service-form-state";

type CreateServiceInput = z.infer<typeof createServiceSchema>;

const countServices = (establishmentId: string) =>
  prisma.service.count({ where: { establishmentId } });

// citext: a comparação ignora maiúsculas/minúsculas
const findServiceByName = (establishmentId: string, name: string) =>
  prisma.service.findUnique({
    where: { establishmentId_name: { establishmentId, name } },
    select: { id: true },
  });

const createService = (
  establishmentId: string,
  { name, durationMinutes, price }: CreateServiceInput,
) =>
  prisma.service.create({
    data: { establishmentId, name, durationMinutes, priceCents: price },
  });

/** Limite `null` no plano significa serviços ilimitados */
const canCreateService = (plan: Plan, servicesCount: number) => {
  const limit = plan.limits.services;

  return limit === null || servicesCount < limit;
};

export const createServiceAction = async (
  _prevState: ServiceFormState,
  formData: FormData,
): Promise<ServiceFormState> => {
  // O estabelecimento vem da sessão, nunca do form
  const establishment = await getCurrentEstablishmentOrThrow();

  const values = getFormValues(formData, SERVICE_FORM_FIELDS);

  const [plan, servicesCount] = await Promise.all([
    getCurrentPlan(),
    countServices(establishment.id),
  ]);

  if (!canCreateService(plan, servicesCount)) {
    return {
      error: "Você atingiu o limite de serviços do seu plano.",
      values,
    };
  }

  const parsed = createServiceSchema.safeParse(values);

  if (!parsed.success) {
    return {
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
      values,
    };
  }

  const nameTaken = await findServiceByName(establishment.id, parsed.data.name);

  if (nameTaken) {
    return {
      fieldErrors: { name: ["Já existe um serviço com esse nome."] },
      values,
    };
  }

  try {
    await createService(establishment.id, parsed.data);
  } catch {
    return {
      error: "Não foi possível criar o serviço. Tente novamente.",
      values,
    };
  }

  revalidatePath("/dashboard/services");

  return { success: true };
};
