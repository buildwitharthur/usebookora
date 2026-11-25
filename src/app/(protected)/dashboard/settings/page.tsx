import type { Metadata } from "next";
import SettingsPage from "@/features/dashboard/settings/components/pages";

export const metadata: Metadata = {
  title: "Configurações",
  description:
    "Dados do estabelecimento, link, cor, imagem e horários de funcionamento.",
  robots: { index: false, follow: false },
};

export default SettingsPage;
