"use client";

import { useState } from "react";
import { Select } from "@/shared/components/ui/select";
import {
  CLOSES_AT_OPTIONS,
  OPENS_AT_OPTIONS,
} from "../../constants/opening-time-options";
import type { Weekday } from "../../constants/weekdays";
import type {
  OpeningHoursDayDefaults,
  OpeningHoursDayErrors,
} from "../../types/opening-hours-form-state";
import { formatTimeOfDay } from "../../utils/format-time-of-day";

type OpeningHoursDayProps = {
  day: Weekday;
  defaults: OpeningHoursDayDefaults;
  errors: OpeningHoursDayErrors;
  disabled: boolean;
};

const OpeningHoursDay = ({
  day,
  defaults,
  errors,
  disabled,
}: OpeningHoursDayProps) => {
  // Controlado para trocar os selects por "Fechado" assim que o dia é desmarcado
  const [open, setOpen] = useState(defaults.open);

  const opensAtErrorId = `opening-hours-${day.key}-opens-at-error`;
  const closesAtErrorId = `opening-hours-${day.key}-closes-at-error`;
  const error = errors.opensAt ?? errors.closesAt;

  return (
    <li className="flex flex-col gap-1.5 py-2.5 first:pt-0 last:pb-0">
      <div className="flex min-h-control-sm flex-wrap items-center gap-x-4 gap-y-2">
        <label className="flex w-24 cursor-pointer items-center gap-2.5 text-sm font-medium has-disabled:cursor-default">
          <input
            type="checkbox"
            name={`${day.key}Open`}
            checked={open}
            onChange={(event) => setOpen(event.target.checked)}
            disabled={disabled}
            className="size-icon-sm cursor-pointer accent-brand disabled:cursor-default"
          />
          {day.label}
        </label>

        {/* Fechado não envia horários: os selects saem do form */}
        {open ? (
          <div className="flex items-center gap-2">
            <Select
              name={`${day.key}OpensAt`}
              size="sm"
              aria-label={`Abertura de ${day.label.toLowerCase()}`}
              defaultValue={defaults.opensAt}
              disabled={disabled}
              aria-invalid={!!errors.opensAt}
              aria-describedby={errors.opensAt ? opensAtErrorId : undefined}
              className="w-24 tabular"
            >
              {OPENS_AT_OPTIONS.map((minutes) => (
                <option key={minutes} value={minutes}>
                  {formatTimeOfDay(minutes)}
                </option>
              ))}
            </Select>

            <span aria-hidden="true" className="text-sm text-fg-muted">
              até
            </span>

            <Select
              name={`${day.key}ClosesAt`}
              size="sm"
              aria-label={`Fechamento de ${day.label.toLowerCase()}`}
              defaultValue={defaults.closesAt}
              disabled={disabled}
              aria-invalid={!!errors.closesAt}
              aria-describedby={errors.closesAt ? closesAtErrorId : undefined}
              className="w-24 tabular"
            >
              {CLOSES_AT_OPTIONS.map((minutes) => (
                <option key={minutes} value={minutes}>
                  {formatTimeOfDay(minutes)}
                </option>
              ))}
            </Select>
          </div>
        ) : (
          <span className="text-sm text-fg-muted">Fechado</span>
        )}
      </div>

      {open && error && (
        <p
          id={errors.opensAt ? opensAtErrorId : closesAtErrorId}
          className="text-xs text-danger"
        >
          {error}
        </p>
      )}
    </li>
  );
};

export default OpeningHoursDay;
