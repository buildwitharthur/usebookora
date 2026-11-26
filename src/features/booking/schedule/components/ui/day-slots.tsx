import { tv } from "tailwind-variants";
import type { ScheduleDay } from "../../data-access/get-service-availability";
import { scheduleShell } from "./schedule-shell";

const styles = scheduleShell();

const slotOption = tv({
  base: "flex cursor-pointer items-center justify-center rounded-md border text-sm font-medium tabular transition-colors has-focus-visible:shadow-focus has-disabled:cursor-default",
  variants: {
    state: {
      available:
        "border-border bg-slot-available text-fg shadow-xs hover:border-brand hover:bg-slot-hover",
      selected: "border-slot-selected bg-slot-selected text-brand-on",
      // Os slots seguintes que o serviço também ocupa
      covered: "border-brand bg-brand-subtle text-brand",
      unavailable: "border-transparent bg-slot-unavailable text-fg-disabled",
    },
  },
});

type DaySlotsProps = {
  day: ScheduleDay;
  /** Índice do horário escolhido neste dia e quantos slots o serviço ocupa a partir dele */
  highlight: { index: number; length: number } | null;
  selected: string | null;
  onSelect: (value: string) => void;
  disabled: boolean;
  /** Id da mensagem de erro do horário, quando houver */
  errorId?: string;
};

const getSlotState = (
  index: number,
  available: boolean,
  highlight: DaySlotsProps["highlight"],
) => {
  if (highlight && index === highlight.index) return "selected";
  if (
    highlight &&
    index > highlight.index &&
    index < highlight.index + highlight.length
  ) {
    return "covered";
  }

  return available ? "available" : "unavailable";
};

const DaySlots = ({
  day,
  highlight,
  selected,
  onSelect,
  disabled,
  errorId,
}: DaySlotsProps) => {
  const headingId = `booking-day-${day.key}`;

  return (
    <fieldset
      aria-labelledby={headingId}
      aria-describedby={errorId}
      className={styles.day()}
    >
      <h3 id={headingId} className={styles.dayHeading()}>
        <span className="font-semibold">{day.title}</span>
        <span className="text-sm text-fg-muted">{day.dateLabel}</span>
      </h3>

      {day.slots ? (
        <div className={styles.slotsGrid()}>
          {day.slots.map((slot, index) => (
            <label
              key={slot.value}
              className={styles.slot({
                class: slotOption({
                  state: getSlotState(index, slot.available, highlight),
                }),
              })}
            >
              {/* Indisponível é radio desabilitado: o leitor de tela anuncia e o teclado pula */}
              <input
                type="radio"
                name="startsAt"
                value={slot.value}
                checked={selected === slot.value}
                onChange={() => onSelect(slot.value)}
                disabled={!slot.available || disabled}
                className="sr-only"
              />
              {slot.label}
            </label>
          ))}
        </div>
      ) : (
        <p className="rounded-lg border border-dashed border-border-strong px-4 py-6 text-center text-sm text-fg-muted">
          Fechado neste dia.
        </p>
      )}
    </fieldset>
  );
};

export default DaySlots;
