import { z } from "zod";

export const createBookingSchema = z.object({
  slug: z.string().min(1, "Estabelecimento inválido."),
  serviceId: z.cuid("Serviço inválido."),
  // Só confere que veio um horário: se ele está livre, a action confere no servidor
  startsAt: z.string().min(1, "Escolha um horário."),
  clientName: z
    .string()
    .trim()
    .transform((name) => name.replace(/\s+/g, " "))
    .pipe(
      z
        .string()
        .min(2, "Informe seu nome.")
        .max(80, "O nome pode ter no máximo 80 caracteres."),
    ),
  // Aceita com ou sem máscara e guarda só os dígitos
  clientPhone: z
    .string()
    .transform((phone) => phone.replace(/\D/g, ""))
    .pipe(
      z
        .string()
        .regex(
          /^\d{10,11}$/,
          "Informe o telefone com DDD, ex.: (11) 91234-5678.",
        ),
    ),
  // Opcional: vazio vira null
  clientEmail: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.union([z.literal(""), z.email("Informe um e-mail válido.")]))
    .transform((email) => email || null),
});

export type CreateBookingInput = z.input<typeof createBookingSchema>;
export type CreateBookingOutput = z.output<typeof createBookingSchema>;
