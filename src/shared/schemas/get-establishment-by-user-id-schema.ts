import { z } from "zod";

export const getEstablishmentByUserIdSchema = z.object({
  userId: z.cuid("ID de usuário inválido."),
});

export type GetEstablishmentByUserIdInput = z.infer<
  typeof getEstablishmentByUserIdSchema
>;
