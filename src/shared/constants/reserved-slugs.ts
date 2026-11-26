/**
 * Slugs que um estabelecimento não pode usar: coincidem com rotas do sistema,
 * e a página pública fica em `/{slug}` no mesmo nível delas
 */
export const RESERVED_SLUGS: readonly string[] = [
  "api",
  "dashboard",
  "login",
  "onboarding",
];
