"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import type { Plan } from "@/shared/constants/plans";
import { getCurrentEstablishmentOrThrow } from "@/shared/data-access/establishment/get-current-establishment-or-throw";
import { getCurrentPlan } from "@/shared/data-access/subscription/get-current-plan";
import { prisma } from "@/shared/lib/prisma";
import { getServiceByName } from "../data-access/get-service-by-name";
import {
  type CreateServiceInput,
  type CreateServiceOutput,
  createServiceSchema,
} from "../schemas/create-service-schema";
import type { ServiceActionResult } from "../types/service-form-state";

const countServices = (establishmentId: string) =>
  prisma.service.count({ where: { establishmentId } });

const createService = (
  establishmentId: string,
  { name, durationMinutes, price }: CreateServiceOutput,
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
  input: CreateServiceInput,
): Promise<ServiceActionResult> => {
  // O estabelecimento vem da sessão, nunca do input
  const establishment = await getCurrentEstablishmentOrThrow();

  const [plan, servicesCount] = await Promise.all([
    getCurrentPlan(),
    countServices(establishment.id),
  ]);

  if (!canCreateService(plan, servicesCount)) {
    return { error: "Você atingiu o limite de serviços do seu plano." };
  }

  // O tipo do input não vale no servidor: qualquer cliente pode chamar a action
  const parsed = createServiceSchema.safeParse(input);

  if (!parsed.success) {
    return { fieldErrors: z.flattenError(parsed.error).fieldErrors };
  }

  const nameTaken = await getServiceByName(parsed.data.name);

  if (nameTaken) {
    return { fieldErrors: { name: ["Já existe um serviço com esse nome."] } };
  }

  try {
    await createService(establishment.id, parsed.data);
  } catch {
    return { error: "Não foi possível criar o serviço. Tente novamente." };
  }

  revalidatePath("/dashboard/services");

  return { success: true };
};
