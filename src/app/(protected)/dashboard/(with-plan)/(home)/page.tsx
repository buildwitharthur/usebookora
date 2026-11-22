import type { Metadata } from "next";
import DashboardHomePage from "@/features/dashboard/home/components/pages";

export const metadata: Metadata = {
  title: "Agenda",
  description: "Agendamentos de hoje e de amanhã do seu estabelecimento.",
  robots: { index: false, follow: false },
};

export default DashboardHomePage;
