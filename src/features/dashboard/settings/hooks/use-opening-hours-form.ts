"use client";

import { useActionState } from "react";

import { getFormValues } from "@/shared/utils/get-form-values";
import { updateOpeningHoursAction } from "../actions/update-opening-hours";
import { OPENING_HOURS_FORM_FIELDS } from "../constants/opening-hours-form-fields";
import { WEEKDAYS, type WeekdayKey } from "../constants/weekdays";
import type {
  OpeningHoursDayErrors,
  OpeningHoursFormState,
} from "../types/opening-hours-form-state";

const initialState: OpeningHoursFormState = {};

export const useOpeningHoursForm = () => {
  /** Lê o form e repassa o input tipado para a action */
  const onSubmit = async (
    _prevState: OpeningHoursFormState,
    formData: FormData,
  ): Promise<OpeningHoursFormState> => {
    const values = getFormValues(formData, OPENING_HOURS_FORM_FIELDS);

    const result = await updateOpeningHoursAction(values);

    // O React limpa o form depois do submit: guarda o que foi enviado para repreencher
    return result.success ? result : { ...result, values };
  };

  const [state, formAction, isPending] = useActionState(onSubmit, initialState);

  // Sete dias com dois campos cada: os erros saem agrupados por dia
  const dayErrors = Object.fromEntries(
    WEEKDAYS.map(({ key }) => [
      key,
      {
        opensAt: state.fieldErrors?.[`${key}OpensAt`]?.[0],
        closesAt: state.fieldErrors?.[`${key}ClosesAt`]?.[0],
      },
    ]),
  ) as Record<WeekdayKey, OpeningHoursDayErrors>;

  return {
    state,
    formAction,
    isPending,
    isSaved: !!state.success && !isPending,
    dayErrors,
    formError: state.error,
  };
};
