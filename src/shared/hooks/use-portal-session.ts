"use client";

import { useActionState, useEffect } from "react";

import { createPortalSessionAction } from "@/shared/actions/create-portal-session";
import type { PortalSessionActionResult } from "@/shared/types/portal-session-action-result";

const initialState: PortalSessionActionResult = {};

export const usePortalSession = () => {
  /** O form só confirma: o dono vem da sessão, não de um campo */
  const onSubmit = () => createPortalSessionAction();

  const [state, formAction, isPending] = useActionState(onSubmit, initialState);

  useEffect(() => {
    if (state.success && state.url) {
      // O portal é uma página do Stripe, fora do app
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
