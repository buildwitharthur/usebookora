"use server";

import { AuthError } from "next-auth";
import { z } from "zod";

import { signIn } from "@/shared/lib/auth";
import {
  type MagicLinkLoginInput,
  magicLinkLoginSchema,
} from "../schemas/magic-link-login-schema";
import type { MagicLinkLoginActionResult } from "../types/magic-link-login-state";

export const magicLinkLoginAction = async (
  input: MagicLinkLoginInput,
): Promise<MagicLinkLoginActionResult> => {
  // O tipo do input não vale no servidor: qualquer cliente pode chamar a action
  const parsed = magicLinkLoginSchema.safeParse(input);

  if (!parsed.success) {
    return { fieldErrors: z.flattenError(parsed.error).fieldErrors };
  }

  try {
    // `redirect: false`: a navegação para /login/verify fica no client
    await signIn("resend", {
      email: parsed.data.email,
      redirect: false,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        error: "Não foi possível enviar o link de acesso. Tente novamente.",
      };
    }

    throw error;
  }

  return { success: true };
};
