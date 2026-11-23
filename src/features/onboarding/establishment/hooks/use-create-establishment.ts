"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

import {
  createEstablishmentAction,
  type CreateEstablishmentState,
} from "../actions/create-establishment";

const initialState: CreateEstablishmentState = {};

export const useCreateEstablishment = () => {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    createEstablishmentAction,
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      router.replace("/dashboard");
    }
  }, [state, router]);

  return {
    state,
    formAction,
    // Mantém o form bloqueado enquanto navega após o sucesso
    isPending: isPending || !!state.success,
    nameError: state.fieldErrors?.name?.[0],
    formError: state.error,
  };
};
