"use client";

import { useActionState, useEffect, useEffectEvent } from "react";

import { createServiceAction } from "../actions/create-service";
import { updateServiceAction } from "../actions/update-service";
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
  // O form é montado de novo a cada abertura do dialog, então a action
  // escolhida aqui não muda durante a vida do hook
  const action = service ? updateServiceAction : createServiceAction;
  const [state, formAction, isPending] = useActionState(action, initialState);

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
