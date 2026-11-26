"use client";

import { useActionState } from "react";

import { getFormValues } from "@/shared/utils/get-form-values";
import { updateEstablishmentAction } from "../actions/update-establishment";
import { ESTABLISHMENT_FORM_FIELDS } from "../constants/establishment-form-fields";
import type { EstablishmentFormState } from "../types/establishment-form-state";

const initialState: EstablishmentFormState = {};

export const useEstablishmentForm = () => {
  /** Lê o form e repassa o input tipado para a action */
  const onSubmit = async (
    _prevState: EstablishmentFormState,
    formData: FormData,
  ): Promise<EstablishmentFormState> => {
    const values = getFormValues(formData, ESTABLISHMENT_FORM_FIELDS);

    const result = await updateEstablishmentAction(values);

    // O React limpa o form depois do submit: guarda o que foi enviado para repreencher
    return result.success ? result : { ...result, values };
  };

  const [state, formAction, isPending] = useActionState(onSubmit, initialState);

  return {
    state,
    formAction,
    isPending,
    isSaved: !!state.success && !isPending,
    nameError: state.fieldErrors?.name?.[0],
    descriptionError: state.fieldErrors?.description?.[0],
    addressError: state.fieldErrors?.address?.[0],
    phoneError: state.fieldErrors?.phone?.[0],
    instagramError: state.fieldErrors?.instagram?.[0],
    slugError: state.fieldErrors?.slug?.[0],
    brandColorError: state.fieldErrors?.brandColor?.[0],
    timeZoneError: state.fieldErrors?.timeZone?.[0],
    formError: state.error,
  };
};
