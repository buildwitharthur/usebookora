import React from "react";

import { verifyPlan } from "@/shared/utils/verify-plan";

type WithPlanLayoutProps = {
  children: React.ReactNode;
};

/** Agenda, Serviços e Configurações exigem plano ativo; Plano fica de fora */
const WithPlanLayout = async ({ children }: WithPlanLayoutProps) => {
  await verifyPlan();

  return children;
};

export default WithPlanLayout;
