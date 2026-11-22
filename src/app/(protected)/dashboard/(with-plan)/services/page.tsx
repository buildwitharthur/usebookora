import type { Metadata } from "next";
import ServicesPage from "@/features/dashboard/services/components/pages";

export const metadata: Metadata = {
  title: "Serviços",
  description:
    "Cadastre e edite os serviços oferecidos na sua página de agendamentos.",
  robots: { index: false, follow: false },
};

export default ServicesPage;
