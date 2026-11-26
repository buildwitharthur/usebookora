import { z } from "zod";

import { BrandColor } from "@/generated/prisma/enums";
import { RESERVED_SLUGS } from "@/shared/constants/reserved-slugs";
import { generateSlug } from "@/shared/utils/generate-slug";
import { TIME_ZONE_OPTIONS } from "../constants/time-zone-options";

/** Campo opcional: espaços repetidos viram um e vazio vira null */
const optionalText = (max: number, message: string) =>
  z
    .string()
    .trim()
    .transform((value) => value.replace(/[^\S\n]+/g, " "))
    .pipe(z.string().max(max, message))
    .transform((value) => value || null);

export const updateEstablishmentSchema = z.object({
  name: z
    .string()
    .trim()
    .transform((name) => name.replace(/\s+/g, " "))
    .pipe(
      z
        .string()
        .min(2, "O nome precisa ter pelo menos 2 caracteres.")
        .max(60, "O nome pode ter no máximo 60 caracteres.")
        .refine((name) => generateSlug(name).length > 0, {
          message: "Use letras ou números no nome.",
        }),
    ),
  description: optionalText(
    300,
    "A descrição pode ter no máximo 300 caracteres.",
  ),
  address: optionalText(160, "O endereço pode ter no máximo 160 caracteres."),
  // Aceita com ou sem máscara e guarda só os dígitos
  phone: z
    .string()
    .transform((phone) => phone.replace(/\D/g, ""))
    .refine((phone) => phone === "" || /^\d{10,11}$/.test(phone), {
      message: "Informe o telefone com DDD, ex.: (11) 91234-5678.",
    })
    .transform((phone) => phone || null),
  // Aceita "@usuario" ou "usuario" e guarda sem o @
  instagram: z
    .string()
    .trim()
    .toLowerCase()
    .transform((instagram) => instagram.replace(/^@/, ""))
    .refine(
      (instagram) => instagram === "" || /^[a-z0-9._]{1,30}$/.test(instagram),
      { message: "Use só letras, números, ponto e _, com até 30 caracteres." },
    )
    .transform((instagram) => instagram || null),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .min(2, "O link precisa ter pelo menos 2 caracteres.")
    .max(60, "O link pode ter no máximo 60 caracteres.")
    .regex(
      /^[a-z0-9]+(-[a-z0-9]+)*$/,
      "Use só letras sem acento, números e hífens, ex.: barbearia-central.",
    )
    .refine((slug) => !RESERVED_SLUGS.includes(slug), {
      message: "Esse link é reservado pelo Bookora. Escolha outro.",
    }),
  // Entra como texto (vem do form) e só sai se for uma das cores da paleta
  brandColor: z.string().pipe(z.enum(BrandColor, "Escolha uma cor.")),
  // Só aceita um dos fusos oferecidos no select
  timeZone: z
    .string()
    .refine(
      (timeZone) =>
        TIME_ZONE_OPTIONS.some((option) => option.value === timeZone),
      { message: "Escolha um fuso horário." },
    ),
});

export type UpdateEstablishmentInput = z.input<
  typeof updateEstablishmentSchema
>;
export type UpdateEstablishmentOutput = z.output<
  typeof updateEstablishmentSchema
>;
