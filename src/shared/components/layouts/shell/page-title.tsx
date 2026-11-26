"use client";

import { usePathname } from "next/navigation";
import { getNavItem } from "./get-nav-item";

const PageTitle = () => {
  const pathname = usePathname();

  return (
    <h1 className="truncate text-sm font-semibold">
      {getNavItem(pathname)?.label ?? "Dashboard"}
    </h1>
  );
};

export default PageTitle;
