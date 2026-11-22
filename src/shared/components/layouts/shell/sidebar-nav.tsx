"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isNavItemActive, navItems } from "./nav-items";

const SidebarNav = () => {
  const pathname = usePathname();

  return (
    <ul className="flex flex-col gap-0.5">
      {navItems.map(({ href, label, icon: Icon }) => {
        const active = isNavItemActive(pathname, href);

        return (
          <li key={href}>
            <Link
              href={href}
              aria-current={active ? "page" : undefined}
              className="group relative flex h-8 items-center gap-2.5 rounded-md px-2.5 text-sm font-medium text-sidebar-fg transition-colors hover:bg-sidebar-item-hover hover:text-sidebar-fg-active focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus aria-[current=page]:bg-sidebar-item-active aria-[current=page]:text-sidebar-fg-active"
            >
              <span
                aria-hidden="true"
                className="absolute inset-y-2 left-0 w-0.5 rounded-full bg-brand opacity-0 transition-opacity group-aria-[current=page]:opacity-100"
              />
              <Icon className="size-icon-sm shrink-0" />
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default SidebarNav;
