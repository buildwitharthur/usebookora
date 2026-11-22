import type { Metadata } from "next";
import HomePage from "@/features/landing/home/components/pages";

export const metadata: Metadata = {
  title: { absolute: "Bookora — Agendamentos simples para o seu negócio" },
  description:
    "Crie a página de agendamentos do seu salão, barbearia ou clínica em minutos. Seus clientes agendam sem criar conta e você acompanha tudo no dashboard.",
  alternates: { canonical: "/" },
};

export default HomePage;
