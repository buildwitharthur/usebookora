import type { Metadata } from "next";
import LoginPage from "@/features/auth/login/components/pages";

export const metadata: Metadata = {
  title: "Entrar",
  description:
    "Entre ou crie sua conta no Bookora para gerenciar a agenda do seu estabelecimento.",
  alternates: { canonical: "/login" },
};

export default LoginPage;
