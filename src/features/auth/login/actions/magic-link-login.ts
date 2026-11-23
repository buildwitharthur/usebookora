"use server";

import { AuthError } from "next-auth";
import { z } from "zod";

import { signIn } from "@/shared/lib/auth";
import { magicLinkLoginSchema } from "../schemas/magic-link-login-schema";

export type MagicLinkLoginState = {
  error?: string;
  fieldErrors?: {
    email?: string[];
  };
  email?: string;
};

export const magicLinkLoginAction = async (
  _prevState: MagicLinkLoginState,
  formData: FormData,
): Promise<MagicLinkLoginState> => {
  const rawEmail = formData.get("email");
  const email = typeof rawEmail === "string" ? rawEmail : "";

  const parsed = magicLinkLoginSchema.safeParse({ email });

  if (!parsed.success) {
    return {
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
      email,
    };
  }

  try {
    // Em caso de sucesso, o Auth.js redireciona para /login/verify
    await signIn("resend", {
      email: parsed.data.email,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        error: "Não foi possível enviar o link de acesso. Tente novamente.",
        email,
      };
    }

    // Repassa o NEXT_REDIRECT (e erros inesperados)
    throw error;
  }

  return {};
};
