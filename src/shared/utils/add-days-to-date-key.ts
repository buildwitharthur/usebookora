import { dayjs } from "@/shared/lib/dayjs";

/** Soma dias a um "AAAA-MM-DD" (ex.: "2026-11-30" + 1 → "2026-12-01") */
export const addDaysToDateKey = (dateKey: string, days: number) =>
  // Em UTC a conta é só de calendário: não há fuso nem horário de verão no meio
  dayjs.utc(dateKey).add(days, "day").format("YYYY-MM-DD");
