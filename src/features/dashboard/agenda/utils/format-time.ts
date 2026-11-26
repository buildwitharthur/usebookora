/** Horário do instante no fuso do estabelecimento (ex.: "09:30") */
export const formatTime = (date: Date, timeZone: string) =>
  new Intl.DateTimeFormat("pt-BR", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
