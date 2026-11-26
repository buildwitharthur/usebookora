"use client";

import { useActionState, useEffect } from "react";

import { createCheckoutSessionAction } from "@/shared/actions/create-checkout-session";
import type { CheckoutSessionActionResult } from "@/shared/types/checkout-session-action-result";

const initialState: CheckoutSessionActionResult = {};

export const useCheckoutSession = () => {
  /** O form só confirma: o dono vem da sessão, não de um campo */
  const onSubmit = () => createCheckoutSessionAction();

  const [state, formAction, isPending] = useActionState(onSubmit, initialState);

  useEffect(() => {
    if (state.success && state.url) {
      // O checkout é uma página do Stripe, fora do app
      window.location.assign(state.url);
    }
  }, [state]);

  return {
    formAction,
    // Bloqueado até a página do Stripe carregar
    isPending: isPending || !!state.success,
    formError: state.error,
  };
};
