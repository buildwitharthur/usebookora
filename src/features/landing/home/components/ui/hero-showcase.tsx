"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { tv } from "tailwind-variants";
import { cn } from "@/shared/utils/cn";

type ShowcaseAgendaItem = {
  time: string;
  client: string;
  service: string;
};

export type HeroShowcaseProps = {
  agenda: {
    title: string;
    liveLabel: string;
    items: ShowcaseAgendaItem[];
  };
  booking: {
    title: string;
    dayLabel: string;
    /** Horários do dia; os que já estão na agenda aparecem como ocupados */
    times: string[];
    selectedTime: string;
    client: string;
    service: string;
    confirmLabel: string;
    confirmedLabel: string;
  };
  usage: {
    title: string;
    planLabel: string;
    count: number;
    limit: number;
  };
  share: {
    title: string;
    url: string;
    copyLabel: string;
  };
};

/** Etapas do loop: 0 escolhendo horário → 1 horário selecionado → 2 confirmado */
const STEP_DURATIONS = [1600, 1300, 3800];

const card = "absolute w-64 rounded-2xl p-4 surface-floating";

const cardTitle = "text-sm font-semibold";

/** Livre fica em relevo, ocupado fica rebaixado, selecionado acende na cor da marca */
const slotChip = tv({
  base: "rounded-md py-1.5 text-center text-xs font-medium tabular",
  variants: {
    status: {
      available: "text-fg surface-raised emboss",
      unavailable: "text-fg-disabled line-through surface-inset",
      selected: "text-brand-on surface-brand",
    },
  },
});

const agendaRow = tv({
  base: "flex items-center gap-3 rounded-md px-2 py-1.5",
  variants: {
    isNew: {
      true: "bg-brand-subtle",
    },
  },
});

const HeroShowcase = ({ agenda, booking, usage, share }: HeroShowcaseProps) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(
      () => setStep((current) => (current + 1) % STEP_DURATIONS.length),
      STEP_DURATIONS[step],
    );
    return () => clearTimeout(timeout);
  }, [step]);

  const isSelected = step >= 1;
  const isConfirmed = step === 2;
  const bookedTimes = new Set(agenda.items.map((item) => item.time));
  const usageCount = usage.count + (isConfirmed ? 1 : 0);

  const agendaItems = [
    ...agenda.items.map((item) => ({ ...item, isNew: false })),
    ...(isConfirmed
      ? [
          {
            time: booking.selectedTime,
            client: booking.client,
            service: booking.service,
            isNew: true,
          },
        ]
      : []),
  ].sort((a, b) => a.time.localeCompare(b.time));

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden select-none xl:block"
    >
      {/* Esquerda, em cima: agenda do dashboard */}
      <div className={cn(card, "top-16 -left-6")}>
        <div className="flex items-center justify-between">
          <p className={cardTitle}>{agenda.title}</p>
          <span className="flex items-center gap-1.5 text-xs font-medium text-success-fg">
            <span className="size-1.5 rounded-full bg-success" />
            {agenda.liveLabel}
          </span>
        </div>
        <ul className="mt-3 space-y-0.5 border-t border-border pt-2">
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

      {/* Esquerda, embaixo: link da página */}
      <div className={cn(card, "top-96 left-10")}>
        <p className={cardTitle}>{share.title}</p>
        <p className="mt-3 truncate rounded-md px-3 py-2 font-mono text-xs text-fg-secondary surface-inset">
          {share.url}
        </p>
        <span className="mt-3 flex h-control-sm items-center justify-center gap-2 rounded-md text-sm font-medium text-fg surface-raised emboss">
          <CopyIcon className="size-icon-sm" />
          {share.copyLabel}
        </span>
      </div>

      {/* Direita, em cima: uso do limite de agendamentos do plano */}
      <div className={cn(card, "top-12 -right-6")}>
        <p className={cardTitle}>{usage.title}</p>
        <p className="mt-3 flex items-baseline gap-1">
          <span className="inline-block text-3xl font-bold tracking-tight tabular">
            {usageCount}
          </span>
          <span className="text-sm text-fg-muted tabular">/ {usage.limit}</span>
        </p>
        <div className="mt-3 h-2 overflow-hidden rounded-full surface-inset">
          <div
            className="h-full rounded-full bg-brand transition-width duration-(--duration-slower)"
            style={{ width: `${(usageCount / usage.limit) * 100}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-fg-muted">{usage.planLabel}</p>
      </div>

      {/* Direita, embaixo: cliente escolhendo o horário */}
      <div className={cn(card, "top-72 right-10")}>
        <div className="flex items-center justify-between">
          <p className={cardTitle}>{booking.title}</p>
          <span className="text-xs text-fg-muted">{booking.dayLabel}</span>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2">
          {booking.times.map((time) => (
            <span
              key={time}
              className={slotChip({
                status:
                  isSelected && time === booking.selectedTime
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

        <div className="mt-3 h-control-sm">
          {isConfirmed ? (
            <span className="flex h-full items-center justify-center gap-2 rounded-md border border-success-border bg-success-bg text-sm font-medium text-success-fg">
              <CheckIcon className="size-icon-sm" />
              {booking.confirmedLabel}
            </span>
          ) : (
            <span
              className={cn(
                "flex h-full items-center justify-center rounded-md text-sm font-medium",
                isSelected
                  ? "text-brand-on surface-brand"
                  : "text-fg-disabled surface-inset",
              )}
            >
              {booking.confirmLabel}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroShowcase;
