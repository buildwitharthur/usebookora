import "server-only";

import { getCurrentEstablishment } from "./get-current-establishment";

/** Para DALs que dependem do estabelecimento: sem ele, lança erro */
export const getCurrentEstablishmentOrThrow = async () => {
  const establishment = await getCurrentEstablishment();

  if (!establishment) {
    throw new Error("Establishment not found");
  }

  return establishment;
};
