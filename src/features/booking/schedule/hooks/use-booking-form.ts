"use client";

import { useActionState } from "react";

import { getFormValues } from "@/shared/utils/get-form-values";
import { createBookingAction } from "../actions/create-booking";
import { BOOKING_FORM_FIELDS } from "../constants/booking-form-fields";
import type { BookingFormState } from "../types/booking-form-state";

const initialState: BookingFormState = {};

type UseBookingFormParams = {
  slug: string;
  serviceId: string;
};

export const useBookingForm = ({ slug, serviceId }: UseBookingFormParams) => {
  /** Lê o form e repassa o input tipado para a action, com o serviço vindo das props */
  const onSubmit = async (
    _prevState: BookingFormState,
    formData: FormData,
  ): Promise<BookingFormState> => {
    const values = getFormValues(formData, BOOKING_FORM_FIELDS);

    const result = await createBookingAction({ ...values, slug, serviceId });

    // O React limpa o form depois do submit: guarda o que foi enviado para repreencher
    return result.success ? result : { ...result, values };
  };

  const [state, formAction, isPending] = useActionState(onSubmit, initialState);

  return {
    state,
    formAction,
    isPending,
    summary: state.success ? state.summary : undefined,
    startsAtError: state.fieldErrors?.startsAt?.[0],
    clientNameError: state.fieldErrors?.clientName?.[0],
    clientPhoneError: state.fieldErrors?.clientPhone?.[0],
    clientEmailError: state.fieldErrors?.clientEmail?.[0],
    formError: state.error,
  };
};
