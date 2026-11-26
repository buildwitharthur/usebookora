import React from "react";

import ShellLayout from "@/shared/components/layouts/shell";
import { getBookingsCount } from "@/shared/data-access/booking/get-bookings-count";
import { getCurrentPlan } from "@/shared/data-access/subscription/get-current-plan";
import { getEstablishmentOrRedirect } from "@/shared/guards/establishment/get-establishment-or-redirect";
import { getSessionOrRedirect } from "@/shared/guards/session/get-session-or-redirect";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  const { user: sessionUser } = await getSessionOrRedirect();
  const [establishment, plan] = await Promise.all([
    getEstablishmentOrRedirect(),
    getCurrentPlan(),
  ]);

  const user = {
    name: sessionUser.name ?? "Minha conta",
    email: sessionUser.email ?? "",
    image: sessionUser.image ?? null,
  };

  // Depois do guard: sem estabelecimento ele já redirecionou, e a contagem lançaria erro
  const bookingsCount = await getBookingsCount();

  return (
    <ShellLayout
      user={user}
      slug={establishment.slug}
      plan={plan}
      bookingsCount={bookingsCount}
    >
      {children}
    </ShellLayout>
  );
};

export default DashboardLayout;
