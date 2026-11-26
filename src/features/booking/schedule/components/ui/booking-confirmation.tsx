"use client";

import { CheckIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Button } from "@/shared/components/ui/button";
import type { BookingSummary } from "../../types/booking-form-state";

type BookingConfirmationProps = {
  summary: BookingSummary;
  slug: string;
};

/** Agradecimento no lugar do form: sem rota própria, nada do cliente fica exposto num link */
const BookingConfirmation = ({ summary, slug }: BookingConfirmationProps) => {
  const headingRef = useRef<HTMLHeadingElement>(null);

  // O form some da tela: leva o foco (e o leitor de tela) para a confirmação
  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const firstName = summary.clientName.split(" ")[0];

  const rows = [
    { label: "Serviço", value: summary.serviceName },
    { label: "Dia", value: summary.dateLabel },
    { label: "Horário", value: summary.timeLabel },
  ];

  return (
    <section
      aria-labelledby="booking-confirmation-heading"
      className="flex flex-col items-center gap-6 pt-2 text-center"
    >
      <span className="flex size-avatar-md items-center justify-center rounded-full bg-brand text-brand-on shadow-md ring-4 ring-brand-subtle">
        <CheckIcon aria-hidden="true" className="size-icon-lg" />
      </span>

      <div className="flex flex-col gap-1">
        <h2
          id="booking-confirmation-heading"
          ref={headingRef}
          tabIndex={-1}
          className="text-2xl font-semibold tracking-tight outline-none"
        >
          Agendamento confirmado
        </h2>
        <p className="text-pretty text-fg-secondary">
          Obrigado, {firstName}! Seu horário está reservado.
        </p>
      </div>

      <dl className="w-full divide-y divide-border rounded-xl border border-border bg-surface text-left text-sm shadow-xs">
        {rows.map((row) => (
          <div key={row.label} className="flex gap-4 px-4 py-3">
            <dt className="w-16 shrink-0 text-fg-muted">{row.label}</dt>
            <dd className="min-w-0 font-medium first-letter:uppercase tabular">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>

      <Button asChild variant="ghost">
        <Link href={`/${slug}`}>Ver outros serviços</Link>
      </Button>
    </section>
  );
};

export default BookingConfirmation;
