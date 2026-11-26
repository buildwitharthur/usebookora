"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

import { getFormValues } from "@/shared/utils/get-form-values";
import { magicLinkLoginAction } from "../actions/magic-link-login";
import { MAGIC_LINK_LOGIN_FORM_FIELDS } from "../constants/magic-link-login-form-fields";
import type { MagicLinkLoginFormState } from "../types/magic-link-login-state";

const initialState: MagicLinkLoginFormState = {};

export const useMagicLinkLogin = () => {
  const router = useRouter();

  /** Lê o form e repassa o input tipado para a action */
  const onSubmit = async (
    _prevState: MagicLinkLoginFormState,
    formData: FormData,
  ): Promise<MagicLinkLoginFormState> => {
    const values = getFormValues(formData, MAGIC_LINK_LOGIN_FORM_FIELDS);

    const result = await magicLinkLoginAction(values);

    // O React limpa o form depois do submit: guarda o que foi enviado para repreencher
    return result.success ? result : { ...result, values };
  };

  const [state, formAction, isPending] = useActionState(onSubmit, initialState);

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
