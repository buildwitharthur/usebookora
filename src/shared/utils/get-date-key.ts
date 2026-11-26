/** Dia do instante no fuso, como "AAAA-MM-DD", para comparar dias sem depender do fuso do servidor */
export const getDateKey = (date: Date, timeZone: string) =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
