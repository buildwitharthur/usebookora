import { z } from "zod";

import { generateSlug } from "@/shared/utils/generate-slug";

export const createEstablishmentSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "O nome precisa ter pelo menos 2 caracteres.")
    .max(60, "O nome pode ter no máximo 60 caracteres.")
    .refine((name) => generateSlug(name).length > 0, {
      message: "Use letras ou números no nome.",
    }),
});

export type CreateEstablishmentInput = z.infer<
  typeof createEstablishmentSchema
>;
