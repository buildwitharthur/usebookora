"use client";

import { useEffect, useState } from "react";
import { tv } from "tailwind-variants";
import { CalendarCheckIcon } from "@/shared/components/ui/icons";

type ShowcaseService = {
  name: string;
  duration: string;
  price: string;
};

type ShowcaseAgendaItem = {
  time: string;
  client: string;
  service: string;
};

export type HeroShowcaseProps = {
  business: {
    name: string;
    initials: string;
    address: string;
    url: string;
  };
  servicesTitle: string;
  services: ShowcaseService[];
  selectedService: number;
  slotsTitle: string;
  dayLabel: string;
  /** Horários do dia; os que já estão na agenda aparecem como ocupados */
  slots: string[];
  selectedSlot: string;
  confirmLabel: string;
  confirmation: {
    title: string;
    description: string;
  };
  notification: {
    title: string;
    client: string;
  };
  agenda: {
    title: string;
    liveLabel: string;
    items: ShowcaseAgendaItem[];
  };
};

/**
 * Etapas do loop: 0 lista de serviços → 1 serviço selecionado →
 * 2 lista de horários → 3 horário selecionado → 4 confirmado
 */
const STEP_DURATIONS = [1800, 1100, 1500, 1400, 3600];

const serviceOption = tv({
  slots: {
    root: "flex items-center justify-between gap-3 rounded-lg border px-3 py-2.5 transition-colors duration-(--duration-slow)",
    radio:
      "flex size-4 shrink-0 items-center justify-center rounded-full border transition-colors duration-(--duration-slow)",
  },
  variants: {
    selected: {
      true: {
        root: "border-brand bg-brand-subtle",
        radio: "border-brand bg-brand",
      },
      false: {
        root: "border-border bg-surface",
        radio: "border-border-strong",
      },
    },
  },
});

const slotChip = tv({
  base: "rounded-md border py-1.5 text-center text-xs font-medium tabular",
  variants: {
    status: {
      available: "border-border bg-slot-available text-fg",
      unavailable:
        "border-transparent bg-slot-unavailable text-fg-disabled line-through",
      selected:
        "animate-pop border-slot-selected bg-slot-selected text-brand-on",
    },
  },
});

const agendaRow = tv({
  base: "flex items-center gap-3 rounded-md px-2 py-2",
  variants: {
    isNew: {
      true: "animate-slide-down bg-brand-subtle",
    },
  },
});

const HeroShowcase = ({
  business,
  servicesTitle,
  services,
  selectedService,
  slotsTitle,
  dayLabel,
  slots,
  selectedSlot,
  confirmLabel,
  confirmation,
  notification,
  agenda,
}: HeroShowcaseProps) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(
      () => setStep((current) => (current + 1) % STEP_DURATIONS.length),
      STEP_DURATIONS[step],
    );
    return () => clearTimeout(timeout);
  }, [step]);

  const service = services[selectedService];
  const screen = step < 2 ? "services" : step < 4 ? "slots" : "confirmed";
  const isConfirmed = step === 4;
  const summary = `${service.name} · ${dayLabel}, ${selectedSlot}`;
  const bookedTimes = new Set(agenda.items.map((item) => item.time));

  const agendaItems = [
    ...agenda.items.map((item) => ({ ...item, isNew: false })),
    ...(isConfirmed
      ? [
          {
            time: selectedSlot,
            client: notification.client,
            service: service.name,
            isNew: true,
          },
        ]
      : []),
  ].sort((a, b) => a.time.localeCompare(b.time));

  return (
    <div
      aria-hidden="true"
      className="relative mx-auto flex w-full max-w-md justify-center"
    >
      {/* Brilho atrás do celular */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 size-[40rem] -translate-1/2 bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--color-brand)_18%,transparent),transparent)]" />

      {/* Notificação do novo agendamento */}
      <div className="absolute top-24 left-0 z-10 hidden w-64 lg:block">
        {isConfirmed && (
          <div className="flex animate-pop gap-3 rounded-xl border border-border bg-surface p-4 shadow-lg">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-success-bg text-success">
              <CalendarCheckIcon className="size-icon-md" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold">{notification.title}</p>
              <p className="truncate text-sm text-fg-secondary">
                {notification.client}
              </p>
              <p className="mt-0.5 truncate text-xs text-fg-muted">{summary}</p>
            </div>
          </div>
        )}
      </div>

      {/* Celular com a página pública */}
      <div className="relative w-74 shrink-0 rounded-[2.75rem] border border-border-strong bg-surface p-2.5 shadow-lg">
        <div className="flex h-[35rem] flex-col overflow-hidden rounded-[2.25rem] border border-border bg-canvas">
          <div className="bg-surface px-4 pt-2.5 pb-2">
            <div className="mx-auto h-5 w-24 rounded-full bg-inverse" />
            <p className="mt-2.5 truncate rounded-full bg-subtle px-3 py-1 text-center text-xs text-fg-muted">
              {business.url}
            </p>
          </div>

          <div className="h-16 shrink-0 bg-brand bg-[radial-gradient(circle_at_80%_0%,color-mix(in_oklab,white_30%,transparent),transparent_60%)]" />

          <div className="-mt-7 px-4">
            <div className="flex size-avatar-md items-center justify-center rounded-full border-4 border-canvas bg-brand-subtle text-sm font-semibold text-brand">
              {business.initials}
            </div>
            <p className="mt-2 font-semibold">{business.name}</p>
            <p className="truncate text-xs text-fg-muted">{business.address}</p>
          </div>

          <div key={screen} className="flex flex-1 flex-col px-4 pt-5 pb-4">
            {screen === "services" && (
              <div className="animate-fade-in space-y-2">
                <p className="text-xs font-semibold tracking-wide text-fg-muted uppercase">
                  {servicesTitle}
                </p>
                {services.map((item, index) => {
                  const styles = serviceOption({
                    selected: step >= 1 && index === selectedService,
                  });

                  return (
                    <div key={item.name} className={styles.root()}>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">
                          {item.name}
                        </p>
                        <p className="text-xs text-fg-muted">{item.duration}</p>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <span className="text-sm font-medium tabular">
                          {item.price}
                        </span>
                        <span className={styles.radio()}>
                          {step >= 1 && index === selectedService && (
                            <span className="size-1.5 animate-pop rounded-full bg-brand-on" />
                          )}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {screen === "slots" && (
              <div className="flex flex-1 animate-slide-up flex-col">
                <div className="flex items-center justify-between rounded-lg border border-brand bg-brand-subtle px-3 py-2 text-xs">
                  <span className="font-medium">{service.name}</span>
                  <span className="text-fg-muted">{service.duration}</span>
                </div>

                <p className="mt-4 text-xs font-semibold tracking-wide text-fg-muted uppercase">
                  {slotsTitle} · {dayLabel}
                </p>

                <div className="mt-2 grid grid-cols-3 gap-2">
                  {slots.map((time) => (
                    <span
                      key={time}
                      className={slotChip({
                        status:
                          step === 3 && time === selectedSlot
                            ? "selected"
                            : bookedTimes.has(time)
                              ? "unavailable"
                              : "available",
                      })}
                    >
                      {time}
                    </span>
                  ))}
                </div>

                {step === 3 && (
                  <div className="mt-auto animate-slide-up rounded-md bg-brand py-2.5 text-center text-sm font-medium text-brand-on shadow-sm">
                    {confirmLabel}
                  </div>
                )}
              </div>
            )}

            {screen === "confirmed" && (
              <div className="flex flex-1 animate-fade-in flex-col items-center justify-center text-center">
                <span className="flex size-14 animate-pop items-center justify-center rounded-full bg-success-bg text-success">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-7"
                  >
                    <path
                      d="M5 12l5 5L20 7"
                      strokeDasharray={24}
                      className="animate-check-draw"
                    />
                  </svg>
                </span>
                <p className="mt-4 font-semibold">{confirmation.title}</p>
                <p className="mt-1 text-sm text-fg-secondary">{summary}</p>
                <p className="mt-3 text-xs text-fg-muted">
                  {confirmation.description}
                </p>
              </div>
            )}
          </div>

          <div className="mx-auto mb-2 h-1 w-24 shrink-0 rounded-full bg-border-strong" />
        </div>
      </div>

      {/* Agenda do dashboard */}
      <div className="absolute top-52 right-0 z-10 hidden w-64 rounded-xl border border-border bg-surface p-4 shadow-lg lg:block">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">{agenda.title}</p>
          <span className="flex items-center gap-1.5 text-xs font-medium text-success-fg">
            <span className="size-1.5 animate-pulse rounded-full bg-success" />
            {agenda.liveLabel}
          </span>
        </div>

        <ul className="mt-3 space-y-1">
          {agendaItems.map((item) => (
            <li key={item.time} className={agendaRow({ isNew: item.isNew })}>
              <span className="w-10 shrink-0 font-mono text-xs text-fg-muted tabular">
                {item.time}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium">
                  {item.client}
                </span>
                <span className="block truncate text-xs text-fg-muted">
                  {item.service}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HeroShowcase;
