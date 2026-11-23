import { z } from "zod";

export const deleteServiceSchema = z.object({
  id: z.cuid("Serviço inválido."),
});

export type DeleteServiceInput = z.infer<typeof deleteServiceSchema>;
