import "server-only";

import { cache } from "react";

import { auth } from "@/shared/lib/auth";

/** Sessão do usuário, deduplicada por requisição (uma consulta ao banco por render) */
export const getSession = cache(async () => auth());
