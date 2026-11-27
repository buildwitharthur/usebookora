import type { Metadata } from "next";
import HomePage from "@/features/landing/home/components/pages";
import { OG_IMAGE } from "@/shared/constants/og-image";

const title =
  "Sistema de agendamento online para salão, barbearia e clínica | Bookora";
const description =
  "Teste grátis o sistema de agendamento online do Bookora: crie a página de agendamento do seu salão, barbearia ou clínica em minutos. O cliente marca sozinho, sem criar conta e sem horário duplicado.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/" },
  openGraph: { title, description, url: "/", images: [OG_IMAGE] },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [OG_IMAGE],
  },
};

export default HomePage;
