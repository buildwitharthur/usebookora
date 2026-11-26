/** `/dashboard` só fica ativo na própria rota; os outros itens também nas sub-rotas */
export const isNavItemActive = (pathname: string, href: string) =>
  href === "/dashboard"
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);
