import { CheckIcon, XIcon } from "lucide-react";
import { Badge } from "@/shared/components/ui/badge";
import { cn } from "@/shared/utils/cn";
import SectionHeading from "./section-heading";

type ChatMessage = {
  from: "client" | "owner";
  text: string;
  time: string;
};

type Booking = {
  day: string;
  time: string;
  client: string;
  service: string;
};

export type BeforeAfterProps = {
  eyebrow: string;
  title: string;
  description: string;
  before: {
    label: string;
    /** Rótulo acessível da conversa ilustrativa */
    chatLabel: string;
    messages: ChatMessage[];
    points: string[];
  };
  after: {
    label: string;
    /** Rótulo acessível da lista ilustrativa */
    agendaLabel: string;
    statusLabel: string;
    bookings: Booking[];
    points: string[];
  };
};

const BeforeAfter = ({
  eyebrow,
  title,
  description,
  before,
  after,
}: BeforeAfterProps) => {
  return (
    <section>
      <div className="mx-auto max-w-wide px-4 py-20 sm:px-6 sm:py-28">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {/* Antes: a conversa para combinar um horário */}
          <article className="flex flex-col rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
            <Badge>{before.label}</Badge>

            <ol
              aria-label={before.chatLabel}
              className="mt-6 flex flex-col gap-2 rounded-xl bg-subtle p-4"
            >
              {before.messages.map((message) => {
                const isOwner = message.from === "owner";

                return (
                  <li
                    key={`${message.time}-${message.text}`}
                    className={cn(
                      "max-w-4/5 rounded-xl px-3 py-2 text-sm shadow-xs",
                      isOwner
                        ? "self-end rounded-br-sm bg-neutral-200"
                        : "self-start rounded-bl-sm bg-surface",
                    )}
                  >
                    <p>{message.text}</p>
                    <p className="mt-0.5 text-right font-mono text-xs text-fg-muted tabular">
                      {message.time}
                    </p>
                  </li>
                );
              })}
            </ol>

            <ul className="mt-6 space-y-3">
              {before.points.map((point) => (
                <li
                  key={point}
                  className="flex gap-3 text-sm text-fg-secondary"
                >
                  <XIcon
                    aria-hidden="true"
                    className="mt-0.5 size-icon-sm shrink-0 text-danger"
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </article>

          {/* Depois: o cliente marcou sozinho */}
          <article className="flex flex-col rounded-2xl border border-brand bg-surface p-6 shadow-lg ring-1 ring-brand sm:p-8">
            <Badge variant="subtle">{after.label}</Badge>

            <ul
              aria-label={after.agendaLabel}
              className="mt-6 divide-y divide-border rounded-xl border border-border"
            >
              {after.bookings.map((booking) => (
                <li
                  key={`${booking.day}-${booking.time}`}
                  className="flex items-center gap-4 px-4 py-3"
                >
                  <div className="w-16 shrink-0">
                    <p className="text-xs text-fg-muted">{booking.day}</p>
                    <p className="font-mono text-sm font-medium tabular">
                      {booking.time}
                    </p>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {booking.client}
                    </p>
                    <p className="truncate text-xs text-fg-secondary">
                      {booking.service}
                    </p>
                  </div>
                  <Badge variant="success" size="sm">
                    {after.statusLabel}
                  </Badge>
                </li>
              ))}
            </ul>

            <ul className="mt-6 space-y-3">
              {after.points.map((point) => (
                <li key={point} className="flex gap-3 text-sm">
                  <CheckIcon
                    aria-hidden="true"
                    className="mt-0.5 size-icon-sm shrink-0 text-brand"
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;
