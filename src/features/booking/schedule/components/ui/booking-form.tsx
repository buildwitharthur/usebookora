"use client";

import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { InputField } from "@/shared/components/ui/field/input-field";
import { SLOT_MINUTES } from "@/shared/constants/slots";
import type { ScheduleDay } from "../../data-access/get-service-availability";
import { useBookingForm } from "../../hooks/use-booking-form";
import BookingConfirmation from "./booking-confirmation";
import DaySlots from "./day-slots";

type BookingFormProps = {
  slug: string;
  serviceId: string;
  serviceName: string;
  durationMinutes: number;
  days: ScheduleDay[];
};

/** O horário escolhido, enquanto ele estiver disponível na grade atual */
const findSelection = (days: ScheduleDay[], value: string | null) => {
  for (const day of days) {
    const index = day.slots?.findIndex(
      (slot) => slot.value === value && slot.available,
    );

    if (day.slots && index !== undefined && index >= 0) {
      return { day, index, slot: day.slots[index] };
    }
  }

  return null;
};

const BookingForm = ({
  slug,
  serviceId,
  serviceName,
  durationMinutes,
  days,
}: BookingFormProps) => {
  const {
    state,
    formAction,
    isPending,
    summary,
    startsAtError,
    clientNameError,
    clientPhoneError,
    clientEmailError,
    formError,
  } = useBookingForm({ slug, serviceId });

  // Controlado: o horário escolhido acende os slots ocupados e libera os dados
  const [selected, setSelected] = useState<string | null>(null);

  if (summary) {
    return <BookingConfirmation summary={summary} slug={slug} />;
  }

  // Se a grade foi atualizada e o horário deixou de estar livre, a escolha cai
  const selection = findSelection(days, selected);
  const slotsLength = durationMinutes / SLOT_MINUTES;

  const defaults = state.values ?? {
    clientName: "",
    clientPhone: "",
    clientEmail: "",
  };

  return (
    <form action={formAction} className="flex flex-col gap-6" noValidate>
      {formError && (
        <p
          role="alert"
          className="rounded-md border border-danger-border bg-danger-bg px-3 py-2 text-sm text-danger-fg"
        >
          {formError}
        </p>
      )}

      <section
        aria-labelledby="booking-time-heading"
        className="flex flex-col gap-5"
      >
        <h2 id="booking-time-heading" className="sr-only">
          Horário
        </h2>

        {days.map((day) => (
          <DaySlots
            key={day.key}
            day={day}
            highlight={
              selection?.day.key === day.key
                ? { index: selection.index, length: slotsLength }
                : null
            }
            selected={selected}
            onSelect={setSelected}
            disabled={isPending}
            errorId={startsAtError ? "booking-starts-at-error" : undefined}
          />
        ))}

        {startsAtError && (
          <p id="booking-starts-at-error" className="text-xs text-danger">
            {startsAtError}
          </p>
        )}
      </section>

      {/* Os dados só fazem sentido com um horário escolhido */}
      <fieldset
        aria-labelledby="booking-client-heading"
        disabled={!selection || isPending}
        className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-4 shadow-xs"
      >
        <h2 id="booking-client-heading" className="font-semibold">
          Seus dados
        </h2>

        <InputField
          id="booking-client-name"
          label="Nome"
          error={clientNameError}
          name="clientName"
          autoComplete="name"
          maxLength={80}
          defaultValue={defaults.clientName}
        />

        <InputField
          id="booking-client-phone"
          label="Telefone"
          error={clientPhoneError}
          name="clientPhone"
          type="tel"
          inputMode="tel"
          placeholder="(11) 91234-5678"
          autoComplete="tel"
          defaultValue={defaults.clientPhone}
          className="tabular"
        />

        <InputField
          id="booking-client-email"
          label={
            <>
              E-mail{" "}
              <span className="font-regular text-fg-muted">(opcional)</span>
            </>
          }
          error={clientEmailError}
          name="clientEmail"
          type="email"
          inputMode="email"
          autoComplete="email"
          autoCapitalize="none"
          spellCheck={false}
          defaultValue={defaults.clientEmail}
        />

        <div className="flex flex-col gap-3 border-t border-border pt-4">
          <p aria-live="polite" className="text-sm text-fg-secondary">
            {selection ? (
              <>
                <span className="font-medium text-fg tabular">
                  {selection.slot.label} – {selection.slot.endLabel}
                </span>
                {` · ${selection.day.title} · ${serviceName}`}
              </>
            ) : (
              "Escolha um horário para continuar."
            )}
          </p>

          <Button type="submit" size="lg" className="w-full">
            {isPending && (
              <LoaderCircle
                aria-hidden="true"
                className="size-icon-sm animate-spin"
              />
            )}
            {isPending ? "Confirmando..." : "Confirmar agendamento"}
          </Button>
        </div>
      </fieldset>
    </form>
  );
};

export default BookingForm;
