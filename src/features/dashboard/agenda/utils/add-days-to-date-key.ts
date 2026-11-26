/** Soma dias a um "AAAA-MM-DD" (ex.: "2026-11-30" + 1 → "2026-12-01") */
export const addDaysToDateKey = (dateKey: string, days: number) => {
  const [year, month, day] = dateKey.split("-").map(Number);

  // Em UTC a conta é só de calendário: não há fuso nem horário de verão no meio
  return new Date(Date.UTC(year, month - 1, day + days))
    .toISOString()
    .slice(0, 10);
};
