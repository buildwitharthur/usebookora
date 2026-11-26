import { z } from "zod";

export const magicLinkLoginSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Informe seu e-mail.")
    .pipe(z.email("Informe um e-mail válido.")),
});

export type MagicLinkLoginInput = z.input<typeof magicLinkLoginSchema>;
export type MagicLinkLoginOutput = z.output<typeof magicLinkLoginSchema>;
