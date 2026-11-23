"use client";

import { useActionState, useEffect, useEffectEvent } from "react";

import {
  deleteServiceAction,
  type DeleteServiceState,
} from "../actions/delete-service";

const initialState: DeleteServiceState = {};

type UseDeleteServiceParams = {
  onSuccess: () => void;
};

export const useDeleteService = ({ onSuccess }: UseDeleteServiceParams) => {
  const [state, formAction, isPending] = useActionState(
    deleteServiceAction,
    initialState,
  );

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
