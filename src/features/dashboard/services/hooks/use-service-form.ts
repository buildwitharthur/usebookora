"use client";

import { useActionState, useEffect, useEffectEvent } from "react";

import { getFormValues } from "@/shared/utils/get-form-values";
import { createServiceAction } from "../actions/create-service";
import { updateServiceAction } from "../actions/update-service";
import { SERVICE_FORM_FIELDS } from "../constants/service-form-fields";
import type { ServiceListItem } from "../data-access/get-services";
import type { ServiceFormState } from "../types/service-form-state";

const initialState: ServiceFormState = {};

type UseServiceFormParams = {
  /** Com serviço, edita; sem serviço, cria */
  service?: ServiceListItem;
  onSuccess: () => void;
};

export const useServiceForm = ({
  service,
  onSuccess,
}: UseServiceFormParams) => {
  /** Lê o form e repassa o input tipado para a action de criar ou editar */
  const onSubmit = async (
    _prevState: ServiceFormState,
    formData: FormData,
  ): Promise<ServiceFormState> => {
    const values = getFormValues(formData, SERVICE_FORM_FIELDS);

    const result = service
      ? await updateServiceAction({ ...values, id: service.id })
      : await createServiceAction(values);

    // O React limpa o form depois do submit: guarda o que foi enviado para repreencher
    return result.success ? result : { ...result, values };
  };

  const [state, formAction, isPending] = useActionState(onSubmit, initialState);

  const handleSuccess = useEffectEvent(onSuccess);

  useEffect(() => {
    if (state.success) {
      handleSuccess();
    }
  }, [state]);

  return {
    state,
    formAction,
    isPending,
    isEditing: !!service,
    nameError: state.fieldErrors?.name?.[0],
    durationError: state.fieldErrors?.durationMinutes?.[0],
    priceError: state.fieldErrors?.price?.[0],
    formError: state.error,
  };
};
