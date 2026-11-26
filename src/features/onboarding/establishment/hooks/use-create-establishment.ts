"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

import { getFormValues } from "@/shared/utils/get-form-values";
import { createEstablishmentAction } from "../actions/create-establishment";
import { ESTABLISHMENT_FORM_FIELDS } from "../constants/establishment-form-fields";
import type { EstablishmentFormState } from "../types/establishment-form-state";

const initialState: EstablishmentFormState = {};

export const useCreateEstablishment = () => {
  const router = useRouter();

  /** Lê o form e repassa o input tipado para a action */
  const onSubmit = async (
    _prevState: EstablishmentFormState,
    formData: FormData,
  ): Promise<EstablishmentFormState> => {
    const values = getFormValues(formData, ESTABLISHMENT_FORM_FIELDS);

    const result = await createEstablishmentAction(values);

    // O React limpa o form depois do submit: guarda o que foi enviado para repreencher
    return result.success ? result : { ...result, values };
  };

  const [state, formAction, isPending] = useActionState(onSubmit, initialState);

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
