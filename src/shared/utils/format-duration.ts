/** Formata minutos de forma curta (ex.: 30 → "30min", 60 → "1h", 90 → "1h30") */
export const formatDuration = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;

  if (hours === 0) return `${rest}min`;
  if (rest === 0) return `${hours}h`;

  return `${hours}h${String(rest).padStart(2, "0")}`;
};
