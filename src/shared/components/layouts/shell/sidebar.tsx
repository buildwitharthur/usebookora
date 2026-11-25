import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/shared/components/ui/separator";
import type { Plan } from "@/shared/constants/plans";
import PlanUsage from "./plan-usage";
import SidebarNav from "./sidebar-nav";
import UserMenu, { type ShellUser } from "./user-menu";

type SidebarProps = {
  user: ShellUser;
  plan: Plan;
  bookingsCount: number;
};

const Sidebar = ({ user, plan, bookingsCount }: SidebarProps) => {
  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-fg">
      <div className="flex h-12 shrink-0 items-center px-4">
        <Link
          href="/dashboard"
          aria-label="Bookora, ir para a agenda"
          className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
        >
          <Image
            src="/brand/logo-inverse.svg"
            alt=""
            width={103}
            height={20}
            priority
            unoptimized
          />
        </Link>
      </div>

      <nav aria-label="Dashboard" className="flex-1 overflow-y-auto px-2 py-2">
        <SidebarNav />
      </nav>

      <div className="px-2 pb-2">
        <PlanUsage plan={plan} bookingsCount={bookingsCount} />
      </div>

      <Separator className="bg-sidebar-border" />

      <div className="p-2">
        <UserMenu {...user} planId={plan.id} />
      </div>
    </div>
  );
};

export default Sidebar;
