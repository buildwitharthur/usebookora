import { z } from "zod";

export const deleteServiceSchema = z.object({
  id: z.cuid("Serviço inválido."),
});

export type DeleteServiceInput = z.input<typeof deleteServiceSchema>;
export type DeleteServiceOutput = z.output<typeof deleteServiceSchema>;
