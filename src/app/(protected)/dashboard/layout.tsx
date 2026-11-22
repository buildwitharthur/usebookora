import React from "react";

import ShellLayout from "@/shared/components/layouts/shell";
import { plans } from "@/shared/constants/plans";
import { auth } from "@/shared/lib/auth";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  const session = await auth();

  const user = {
    name: session?.user?.name ?? "Minha conta",
    email: session?.user?.email ?? "",
    image: session?.user?.image ?? null,
  };

  // TODO: quando os models existirem, buscar o estabelecimento (slug) e a
  // assinatura do usuário (plano + agendamentos do mês) no banco
  const establishment = { slug: "meu-estabelecimento" };
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
