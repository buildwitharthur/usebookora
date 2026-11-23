"use client";

import { useActionState } from "react";

import {
  magicLinkLoginAction,
  type MagicLinkLoginState,
} from "../actions/magic-link-login";

const initialState: MagicLinkLoginState = {};

export const useMagicLinkLogin = () => {
  const [state, formAction, isPending] = useActionState(
    magicLinkLoginAction,
    initialState,
  );

  return {
    state,
    formAction,
    isPending,
    emailError: state.fieldErrors?.email?.[0],
    formError: state.error,
  };
};
