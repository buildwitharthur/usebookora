import React from "react";

import { redirectIfNoActivePlan } from "@/shared/guards/plan/redirect-if-no-active-plan";

type WithPlanLayoutProps = {
  children: React.ReactNode;
};

/** Agenda, Serviços e Configurações exigem plano ativo; Plano fica de fora */
const WithPlanLayout = async ({ children }: WithPlanLayoutProps) => {
  await redirectIfNoActivePlan();

  return children;
};

export default WithPlanLayout;
