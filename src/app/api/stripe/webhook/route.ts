import type Stripe from "stripe";

import { SubscriptionStatus } from "@/generated/prisma/enums";
import { env } from "@/shared/lib/env";
import { prisma } from "@/shared/lib/prisma";
import { stripe } from "@/shared/lib/stripe";

/** Id da assinatura de que o evento trata; `null` para eventos que não mudam a assinatura */
const getSubscriptionId = (event: Stripe.Event) => {
  switch (event.type) {
    case "checkout.session.completed": {
      const { mode, subscription } = event.data.object;

      if (mode !== "subscription" || !subscription) {
        return null;
      }

      return typeof subscription === "string" ? subscription : subscription.id;
    }
    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted":
      return event.data.object.id;
    default:
      return null;
  }
};

/** O SDK aceita status que o Stripe venha a criar; o banco só aceita os do enum */
const isSubscriptionStatus = (status: string): status is SubscriptionStatus =>
  Object.values<string>(SubscriptionStatus).includes(status);

/**
 * Busca a assinatura no Stripe e grava o estado atual. Ler do Stripe em vez do evento
 * faz eventos duplicados ou fora de ordem chegarem sempre no mesmo resultado.
 * O plano é sempre Pro: depois de assinar, a conta não volta para o Basic (spec).
 */
const syncSubscription = async (subscriptionId: string) => {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  if (!isSubscriptionStatus(subscription.status)) {
    throw new Error(`Unknown subscription status "${subscription.status}"`);
  }

  const customerId =
    typeof subscription.customer === "string"
      ? subscription.customer
      : subscription.customer.id;
  // Na API atual, o período fica no item, não na assinatura
  const item = subscription.items.data[0];

  await prisma.subscription.update({
    where: { stripeCustomerId: customerId },
    data: {
      planId: "pro",
      status: subscription.status,
      stripeSubscriptionId: subscription.id,
      stripePriceId: item?.price.id ?? null,
      currentPeriodEnd: item ? new Date(item.current_period_end * 1000) : null,
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    },
  });
};

export const POST = async (request: Request) => {
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return new Response("Assinatura do Stripe ausente.", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    // A assinatura é calculada sobre o corpo cru: ele não pode passar por `json()`
    event = stripe.webhooks.constructEvent(
      await request.text(),
      signature,
      env.STRIPE_WEBHOOK_SECRET,
    );
  } catch {
    return new Response("Assinatura do Stripe inválida.", { status: 400 });
  }

  const subscriptionId = getSubscriptionId(event);

  if (!subscriptionId) {
    return new Response(null, { status: 200 });
  }

  try {
    await syncSubscription(subscriptionId);
  } catch {
    // Erro 500 faz o Stripe reenviar o evento mais tarde
    return new Response("Não foi possível sincronizar a assinatura.", {
      status: 500,
    });
  }

  return new Response(null, { status: 200 });
};
