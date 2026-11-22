import type { Metadata } from "next";
import EstablishmentPage from "@/features/onboarding/establishment/components/pages";

export const metadata: Metadata = {
  title: "Cadastrar estabelecimento",
  description:
    "Cadastre os dados do seu estabelecimento para montar sua página de agendamentos.",
  robots: { index: false, follow: false },
};

export default EstablishmentPage;
