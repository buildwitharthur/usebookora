"use server";

import { AuthError } from "next-auth";
import { z } from "zod";

import { signIn } from "@/shared/lib/auth";
import { magicLinkLoginSchema } from "../schemas/magic-link-login-schema";

export type MagicLinkLoginState = {
  success?: boolean;
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
        email,
      };
    }

    throw error;
  }

  return { success: true };
};
