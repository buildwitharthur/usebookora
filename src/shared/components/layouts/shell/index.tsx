import React from "react";
import { TooltipProvider } from "@/shared/components/ui/tooltip";
import type { Plan } from "@/shared/constants/plans";
import MobileNav from "./mobile-nav";
import Sidebar from "./sidebar";
import Topbar from "./topbar";
import type { ShellUser } from "./user-menu";

export type { ShellUser };

type ShellLayoutProps = {
  children: React.ReactNode;
  user: ShellUser;
  /** Slug da página pública, usado nas ações de compartilhar */
  slug: string;
  plan: Plan;
  bookingsCount: number;
};

const ShellLayout = ({
  children,
  user,
  slug,
  plan,
  bookingsCount,
}: ShellLayoutProps) => {
  const sidebar = (
    <Sidebar user={user} plan={plan} bookingsCount={bookingsCount} />
  );

  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex min-h-dvh">
        <aside className="fixed inset-y-0 left-0 z-(--z-sticky) hidden w-56 border-r border-sidebar-border lg:block">
          {sidebar}
        </aside>

        <div className="flex min-w-0 flex-1 flex-col lg:pl-56">
          <Topbar slug={slug} mobileNav={<MobileNav>{sidebar}</MobileNav>} />
          <main className="flex-1 p-4 text-sm lg:p-6">{children}</main>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default ShellLayout;
