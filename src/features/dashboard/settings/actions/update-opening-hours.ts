"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { getCurrentEstablishmentOrThrow } from "@/shared/data-access/establishment/get-current-establishment-or-throw";
import { prisma } from "@/shared/lib/prisma";
import { WEEKDAYS } from "../constants/weekdays";
import {
  type UpdateOpeningHoursInput,
  type UpdateOpeningHoursOutput,
  updateOpeningHoursSchema,
} from "../schemas/update-opening-hours-schema";
import type { OpeningHoursActionResult } from "../types/opening-hours-form-state";

/** Os dias abertos, prontos para gravar; dia fechado não tem registro */
const getOpenDays = (values: UpdateOpeningHoursOutput) =>
  WEEKDAYS.filter(({ key }) => values[`${key}Open`] === "on").map(
    ({ key, weekday }) => ({
      weekday,
      opensAt: Number(values[`${key}OpensAt`]),
      closesAt: Number(values[`${key}ClosesAt`]),
    }),
  );

// Troca a semana inteira de uma vez, para não sobrar dia que foi fechado
const replaceOpeningHours = (
  establishmentId: string,
  values: UpdateOpeningHoursOutput,
) =>
  prisma.$transaction([
    prisma.openingHours.deleteMany({ where: { establishmentId } }),
    prisma.openingHours.createMany({
      data: getOpenDays(values).map((day) => ({ ...day, establishmentId })),
    }),
  ]);

export const updateOpeningHoursAction = async (
  input: UpdateOpeningHoursInput,
): Promise<OpeningHoursActionResult> => {
  const establishment = await getCurrentEstablishmentOrThrow();

  // O tipo do input não vale no servidor: qualquer cliente pode chamar a action
  const parsed = updateOpeningHoursSchema.safeParse(input);

  if (!parsed.success) {
    return { fieldErrors: z.flattenError(parsed.error).fieldErrors };
  }

  try {
    await replaceOpeningHours(establishment.id, parsed.data);
  } catch {
    return { error: "Não foi possível salvar os horários. Tente novamente." };
  }

  // O horário define os slots da página pública
  revalidatePath("/", "layout");

  return { success: true };
};
