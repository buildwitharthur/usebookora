"use server";

import { AuthError } from "next-auth";

import { signIn } from "@/shared/lib/auth";
import type { GoogleLoginActionResult } from "../types/google-login-state";

export const googleLoginAction = async (): Promise<GoogleLoginActionResult> => {
  try {
    // `redirect: false`: devolve a URL de autorização do Google e a navegação fica no client
    const url: string = await signIn("google", {
      redirect: false,
      redirectTo: "/dashboard",
    });

    return { success: true, url };
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        error: "Não foi possível entrar com o Google. Tente novamente.",
      };
    }

    throw error;
  }
};
