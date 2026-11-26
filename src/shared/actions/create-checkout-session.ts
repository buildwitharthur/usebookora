"use server";

import type { PlanId, SubscriptionStatus } from "@/generated/prisma/enums";
import { getSessionOrThrow } from "@/shared/guards/session/get-session-or-throw";
import { env } from "@/shared/lib/env";
import { prisma } from "@/shared/lib/prisma";
import { stripe } from "@/shared/lib/stripe";
import type { CheckoutSessionActionResult } from "@/shared/types/checkout-session-action-result";

type CheckoutUser = {
  id: string;
  email?: string | null;
  name?: string | null;
};

/**
 * Status em que a assinatura do Stripe terminou e não volta mais: só um checkout novo reativa o Pro.
 * Nos outros (ex.: `past_due`, `unpaid`), a assinatura ainda existe e se resolve pelo portal;
 * um checkout novo criaria uma segunda cobrança.
 */
const ENDED_STATUSES: SubscriptionStatus[] = ["canceled", "incomplete_expired"];

type CheckoutSubscription = {
  planId: PlanId;
  status: SubscriptionStatus;
};

const hasOngoingSubscription = ({ planId, status }: CheckoutSubscription) =>
  planId === "pro" && !ENDED_STATUSES.includes(status);

const getSubscription = (userId: string) =>
  prisma.subscription.findUniqueOrThrow({
    where: { userId },
    select: { planId: true, status: true, stripeCustomerId: true },
  });

/** Cria o customer no Stripe e o guarda, para o portal e novas assinaturas usarem o mesmo */
const createCustomer = async (user: CheckoutUser) => {
  const customer = await stripe.customers.create({
    email: user.email ?? undefined,
    name: user.name ?? undefined,
    metadata: { userId: user.id },
  });

  await prisma.subscription.update({
    where: { userId: user.id },
    data: { stripeCustomerId: customer.id },
  });

  return customer.id;
};

const createCheckoutSession = (userId: string, customerId: string) => {
  const dashboardUrl = new URL("/dashboard", env.NEXT_PUBLIC_APP_URL).href;

  return stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customerId,
    // O webhook identifica o dono por aqui, sem depender do e-mail do customer
    client_reference_id: userId,
    subscription_data: { metadata: { userId } },
    line_items: [{ price: env.STRIPE_PRICE_PRO, quantity: 1 }],
    success_url: dashboardUrl,
    cancel_url: dashboardUrl,
  });
};

export const createCheckoutSessionAction =
  async (): Promise<CheckoutSessionActionResult> => {
    const { user } = await getSessionOrThrow();
    const subscription = await getSubscription(user.id);

    if (hasOngoingSubscription(subscription)) {
      return { error: "Você já assina o Pro." };
    }

    try {
      const customerId =
        subscription.stripeCustomerId ?? (await createCustomer(user));
      const session = await createCheckoutSession(user.id, customerId);

      if (!session.url) {
        throw new Error("Checkout session without url");
      }

      return { success: true, url: session.url };
    } catch {
      return {
        error: "Não foi possível abrir o pagamento. Tente novamente.",
      };
    }
  };
