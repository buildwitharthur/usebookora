"use client";

import { useActionState, useEffect, useEffectEvent } from "react";

import { deleteServiceAction } from "../actions/delete-service";
import type { DeleteServiceActionResult } from "../types/delete-service-state";

const initialState: DeleteServiceActionResult = {};

type UseDeleteServiceParams = {
  serviceId: string;
  onSuccess: () => void;
};

export const useDeleteService = ({
  serviceId,
  onSuccess,
}: UseDeleteServiceParams) => {
  /** O form só confirma: o id vem da prop, não de um campo */
  const onSubmit = () => deleteServiceAction({ id: serviceId });

  const [state, formAction, isPending] = useActionState(onSubmit, initialState);

  const handleSuccess = useEffectEvent(onSuccess);

  useEffect(() => {
    if (state.success) {
      handleSuccess();
    }
  }, [state]);

  return {
    formAction,
    // Mantém os botões bloqueados até a linha sair da tabela
    isPending: isPending || !!state.success,
    formError: state.error,
  };
};
