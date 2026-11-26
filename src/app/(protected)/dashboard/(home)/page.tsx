import type { Metadata } from "next";
import AgendaPage from "@/features/dashboard/agenda/components/pages";

export const metadata: Metadata = {
  title: "Agenda",
  description: "Agendamentos de hoje e de amanhã do seu estabelecimento.",
  robots: { index: false, follow: false },
};

export default AgendaPage;
