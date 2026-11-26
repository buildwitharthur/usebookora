"use server";

import { getSessionOrThrow } from "@/shared/guards/session/get-session-or-throw";
import { env } from "@/shared/lib/env";
import { prisma } from "@/shared/lib/prisma";
import { stripe } from "@/shared/lib/stripe";
import type { PortalSessionActionResult } from "@/shared/types/portal-session-action-result";

const getStripeCustomerId = async (userId: string) => {
  const { stripeCustomerId } = await prisma.subscription.findUniqueOrThrow({
    where: { userId },
    select: { stripeCustomerId: true },
  });

  return stripeCustomerId;
};

/** O que o portal permite (cartão, faturas, cancelar no fim do período) é configurado no Dashboard do Stripe */
const createPortalSession = (customerId: string) =>
  stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: new URL("/dashboard", env.NEXT_PUBLIC_APP_URL).href,
  });

export const createPortalSessionAction =
  async (): Promise<PortalSessionActionResult> => {
    const { user } = await getSessionOrThrow();
    const customerId = await getStripeCustomerId(user.id);

    // O customer só existe depois do primeiro checkout
    if (!customerId) {
      return { error: "Você ainda não tem uma assinatura para gerenciar." };
    }

    try {
      const session = await createPortalSession(customerId);

      return { success: true, url: session.url };
    } catch {
      return {
        error: "Não foi possível abrir a assinatura. Tente novamente.",
      };
    }
  };
