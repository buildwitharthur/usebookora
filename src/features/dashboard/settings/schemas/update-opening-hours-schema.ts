import { z } from "zod";

import { OPENING_HOURS_FORM_FIELDS } from "../constants/opening-hours-form-fields";
import {
  CLOSES_AT_OPTIONS,
  OPENS_AT_OPTIONS,
} from "../constants/opening-time-options";
import { WEEKDAYS } from "../constants/weekdays";

// Vazio vira NaN, e não 0: 0 é um horário válido (00:00)
const toMinutes = (value: string) => (value === "" ? NaN : Number(value));

/**
 * Os campos do form, um trio por dia. Os horários só são validados nos dias
 * abertos: os de um dia fechado são ignorados.
 */
export const updateOpeningHoursSchema = z
  .record(z.enum(OPENING_HOURS_FORM_FIELDS), z.string())
  .superRefine((values, ctx) => {
    for (const { key } of WEEKDAYS) {
      if (values[`${key}Open`] !== "on") continue;

      const opensAt = toMinutes(values[`${key}OpensAt`]);
      const closesAt = toMinutes(values[`${key}ClosesAt`]);

      if (!OPENS_AT_OPTIONS.includes(opensAt)) {
        ctx.addIssue({
          code: "custom",
          path: [`${key}OpensAt`],
          message: "Escolha o horário de abertura.",
        });
      } else if (!CLOSES_AT_OPTIONS.includes(closesAt)) {
        ctx.addIssue({
          code: "custom",
          path: [`${key}ClosesAt`],
          message: "Escolha o horário de fechamento.",
        });
      } else if (closesAt <= opensAt) {
        ctx.addIssue({
          code: "custom",
          path: [`${key}ClosesAt`],
          message: "O fechamento precisa ser depois da abertura.",
        });
      }
    }
  });

export type UpdateOpeningHoursInput = z.input<typeof updateOpeningHoursSchema>;
export type UpdateOpeningHoursOutput = z.output<
  typeof updateOpeningHoursSchema
>;
