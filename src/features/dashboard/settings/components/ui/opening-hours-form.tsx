"use client";

import { LoaderCircle } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { BUSINESS_HOURS } from "@/shared/constants/default-opening-hours";
import { WEEKDAYS, type Weekday } from "../../constants/weekdays";
import type { OpeningHoursItem } from "../../data-access/get-opening-hours";
import { useOpeningHoursForm } from "../../hooks/use-opening-hours-form";
import type {
  OpeningHoursDayDefaults,
  OpeningHoursFormValues,
} from "../../types/opening-hours-form-state";
import OpeningHoursDay from "./opening-hours-day";
import SettingsSection from "./settings-section";

type OpeningHoursFormProps = {
  openingHours: OpeningHoursItem[];
};

/**
 * Valores iniciais de um dia: o que foi enviado (depois de um erro), o que
 * está salvo ou, para um dia fechado, o horário comercial para quando abrir.
 */
const getDayDefaults = (
  { key, weekday }: Weekday,
  openingHours: OpeningHoursItem[],
  values?: OpeningHoursFormValues,
): OpeningHoursDayDefaults => {
  const saved = openingHours.find((hours) => hours.weekday === weekday);
  const fallback = saved ?? BUSINESS_HOURS;

  if (values) {
    return {
      open: values[`${key}Open`] === "on",
      opensAt: values[`${key}OpensAt`] || String(fallback.opensAt),
      closesAt: values[`${key}ClosesAt`] || String(fallback.closesAt),
    };
  }

  return {
    open: !!saved,
    opensAt: String(fallback.opensAt),
    closesAt: String(fallback.closesAt),
  };
};

const OpeningHoursForm = ({ openingHours }: OpeningHoursFormProps) => {
  const { state, formAction, isPending, isSaved, dayErrors, formError } =
    useOpeningHoursForm();

  return (
    <form action={formAction} className="flex flex-col gap-4" noValidate>
      {formError && (
        <p
          role="alert"
          className="rounded-md border border-danger-border bg-danger-bg px-3 py-2 text-sm text-danger-fg"
        >
          {formError}
        </p>
      )}

      <SettingsSection
        title="Horário de funcionamento"
        description="Os dias e horários em que os clientes podem agendar pela sua página."
      >
        <ul className="flex flex-col divide-y divide-border">
          {WEEKDAYS.map((day) => (
            <OpeningHoursDay
              key={day.key}
              day={day}
              defaults={getDayDefaults(day, openingHours, state.values)}
              errors={dayErrors[day.key]}
              disabled={isPending}
            />
          ))}
        </ul>
      </SettingsSection>

      <div className="flex items-center justify-end gap-3">
        <p role="status" className="text-sm text-success-fg">
          {isSaved ? "Horários salvos." : ""}
        </p>

        <Button type="submit" disabled={isPending}>
          {isPending && (
            <LoaderCircle
              aria-hidden="true"
              className="size-icon-sm animate-spin"
            />
          )}
          {isPending ? "Salvando..." : "Salvar horários"}
        </Button>
      </div>
    </form>
  );
};

export default OpeningHoursForm;
