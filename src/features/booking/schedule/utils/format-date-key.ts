const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  // A chave já é o dia no fuso do estabelecimento: formatar em UTC não muda o dia
  timeZone: "UTC",
});

/** Dia por extenso (ex.: "2026-11-26" → "quinta-feira, 26 de novembro") */
export const formatDateKey = (dateKey: string) =>
  dateFormatter.format(new Date(`${dateKey}T00:00:00Z`));
