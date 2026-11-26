import {
  CalendarDaysIcon,
  type LucideIcon,
  SettingsIcon,
  TagIcon,
} from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

/** Fonte única da navegação: alimenta a sidebar e o título da topbar */
export const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "Agenda", icon: CalendarDaysIcon },
  { href: "/dashboard/services", label: "Serviços", icon: TagIcon },
  { href: "/dashboard/settings", label: "Configurações", icon: SettingsIcon },
];
