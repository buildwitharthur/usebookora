import { isNavItemActive } from "./is-nav-item-active";
import { NAV_ITEMS } from "./nav-items";

/** Item da navegação da rota atual, usado no título da topbar */
export const getNavItem = (pathname: string) =>
  NAV_ITEMS.find((item) => isNavItemActive(pathname, item.href));
