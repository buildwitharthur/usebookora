/** Minutos desde 00:00 como horário (ex.: 540 → "09:00", 1440 → "24:00") */
export const formatTimeOfDay = (minutes: number) => {
  const hours = String(Math.floor(minutes / 60)).padStart(2, "0");
  const rest = String(minutes % 60).padStart(2, "0");

  return `${hours}:${rest}`;
};
