import type { Metadata } from "next";
import PlanPage from "@/features/dashboard/plan/components/pages";

export const metadata: Metadata = {
  title: "Plano",
  description: "Seu plano atual, uso do mês e opções de upgrade.",
  robots: { index: false, follow: false },
};

export default PlanPage;
