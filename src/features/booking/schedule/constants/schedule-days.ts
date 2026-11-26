/** Dias que o cliente enxerga, contados a partir de hoje no fuso do estabelecimento */
export const SCHEDULE_DAYS = [
  { key: "today", title: "Hoje", offset: 0 },
  { key: "tomorrow", title: "Amanhã", offset: 1 },
] as const;
