import React from "react";

import ShellLayout from "@/shared/components/layouts/shell";
import { plans } from "@/shared/constants/plans";
import { getEstablishmentOrRedirect } from "@/shared/guards/establishment";
import { getSessionOrRedirect } from "@/shared/guards/session";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  const [{ user: sessionUser }, establishment] = await Promise.all([
    getSessionOrRedirect(),
    getEstablishmentOrRedirect(),
  ]);

  const user = {
    name: sessionUser.name ?? "Minha conta",
    email: sessionUser.email ?? "",
    image: sessionUser.image ?? null,
  };

  // TODO: quando o model de assinatura existir, buscar o plano e os
  // agendamentos do mês no banco
  const subscription = { planId: "basic", monthlyBookings: 0 };
  const plan =
    plans.find((item) => item.id === subscription.planId) ?? plans[0];

  return (
    <ShellLayout
      user={user}
      slug={establishment.slug}
      plan={plan}
      monthlyBookings={subscription.monthlyBookings}
    >
      {children}
    </ShellLayout>
  );
};

export default DashboardLayout;
