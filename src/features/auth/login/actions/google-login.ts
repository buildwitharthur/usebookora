"use server";

import { AuthError } from "next-auth";

import { signIn } from "@/shared/lib/auth";

export type GoogleLoginState = {
  success?: boolean;
  url?: string;
  error?: string;
};

export const googleLoginAction = async (): Promise<GoogleLoginState> => {
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
