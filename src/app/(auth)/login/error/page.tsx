import type { Metadata } from "next";
import AuthErrorPage from "@/features/auth/error/components/pages";

export const metadata: Metadata = {
  title: "Erro ao entrar",
  robots: { index: false },
};

export default AuthErrorPage;
