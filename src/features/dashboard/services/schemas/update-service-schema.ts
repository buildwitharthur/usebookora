import { z } from "zod";

import { createServiceSchema } from "./create-service-schema";

export const updateServiceSchema = createServiceSchema.extend({
  id: z.cuid("Serviço inválido."),
});

export type UpdateServiceInput = z.input<typeof updateServiceSchema>;
export type UpdateServiceOutput = z.output<typeof updateServiceSchema>;
