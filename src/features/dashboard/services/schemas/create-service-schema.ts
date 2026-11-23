import { z } from "zod";

import { SLOT_MINUTES } from "@/shared/constants/slots";
import { MAX_SERVICE_DURATION_MINUTES } from "../constants/service-duration";

export const createServiceSchema = z.object({
  name: z
    .string()
    .trim()
    .transform((name) => name.replace(/\s+/g, " "))
    .pipe(
      z
        .string()
        .min(2, "O nome precisa ter pelo menos 2 caracteres.")
        .max(60, "O nome pode ter no máximo 60 caracteres."),
    ),
  durationMinutes: z.coerce
    .number("Escolha a duração.")
    .int("Escolha a duração.")
    .min(SLOT_MINUTES, "Escolha a duração.")
    .max(MAX_SERVICE_DURATION_MINUTES, "A duração pode ser de no máximo 8h.")
    .multipleOf(SLOT_MINUTES, "A duração precisa ser em blocos de 30 minutos."),
  // Recebe o valor digitado em reais ("45", "45,9", "45,90") e devolve centavos
  price: z
    .string()
    .trim()
    .min(1, "Informe o preço.")
    .regex(/^\d{1,5}([.,]\d{1,2})?$/, "Informe um preço válido, ex.: 45,00.")
    .transform((price) => Math.round(Number(price.replace(",", ".")) * 100)),
});

export type CreateServiceInput = z.input<typeof createServiceSchema>;
export type CreateServiceOutput = z.output<typeof createServiceSchema>;
