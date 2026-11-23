"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

import {
  magicLinkLoginAction,
  type MagicLinkLoginState,
} from "../actions/magic-link-login";

const initialState: MagicLinkLoginState = {};

export const useMagicLinkLogin = () => {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    magicLinkLoginAction,
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      router.push("/login/verify");
    }
  }, [state, router]);

  return {
    state,
    formAction,
    // Mantém o form bloqueado enquanto navega após o sucesso
    isPending: isPending || !!state.success,
    emailError: state.fieldErrors?.email?.[0],
    formError: state.error,
  };
};
