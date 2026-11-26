"use client";

import { useActionState, useEffect } from "react";

import { googleLoginAction } from "../actions/google-login";
import type { GoogleLoginActionResult } from "../types/google-login-state";

const initialState: GoogleLoginActionResult = {};

export const useGoogleLogin = () => {
  /** O form só tem o botão: não há campos para ler */
  const onSubmit = () => googleLoginAction();

  const [state, formAction, isPending] = useActionState(onSubmit, initialState);

  useEffect(() => {
    // URL externa (Google): navegação completa, não `router.push`
    if (state.success && state.url) {
      window.location.assign(state.url);
    }
  }, [state]);

  return {
    formAction,
    // Mantém o botão bloqueado enquanto navega para o Google
    isPending: isPending || !!state.success,
    error: state.error,
  };
};
