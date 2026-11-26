"use client";

import { useActionState, useEffect } from "react";

import {
  googleLoginAction,
  type GoogleLoginState,
} from "../actions/google-login";

const initialState: GoogleLoginState = {};

export const useGoogleLogin = () => {
  const [state, formAction, isPending] = useActionState(
    googleLoginAction,
    initialState,
  );

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
