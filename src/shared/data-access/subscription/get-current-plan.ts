import "server-only";

import { cache } from "react";

import { plans } from "@/shared/constants/plans";
import { getSessionOrThrow } from "@/shared/guards/session/get-session-or-throw";
import { prisma } from "@/shared/lib/prisma";

/**
 * Plano do usuário logado, deduplicado por requisição.
 * O dono vem sempre da sessão. Todo usuário nasce com assinatura
 * (ver `createUser` no auth), então a falta dela é um erro, não o Basic.
 */
export const getCurrentPlan = cache(async () => {
  const { user } = await getSessionOrThrow();

  const { planId } = await prisma.subscription.findUniqueOrThrow({
    where: { userId: user.id },
    select: { planId: true },
  });

  const plan = plans.find((plan) => plan.id === planId);

  if (!plan) {
    throw new Error(`Plan "${planId}" not found`);
  }

  return plan;
});
